// ams.api.ts

import { processSlotsApiData } from '../utils/processSlotsApiData.utils';
import { CancelAppointmentResponse } from '../types/cancelAppointment.types';
import { FormResponse, SingleResponseItem } from 'types/common.types';
import { CreateAppointmentResponse } from './types/createAppointment.types';
import { GetAppointmentDetailsResponse } from './types/getAppointmentDetails.types';
import {
  GetAppointmentsParams,
  GetAppointmentsResponse,
} from './types/getAppointments.types';
import { GetLocationsResponse } from './types/getLocations.types';
import {
  GetSlotsParams,
  GetSlotsResponseType,
} from './types/getSlots.types';
import {
  SearchAddressRequest,
  SearchAddressResponse,
  SearchPlaceDetailsRequest,
  SearchPlaceDetailsResponse,
} from './types/searchClinic.types';
import {
  UpdateAppointmentRequest,
  UpdateAppointmentResponse,
} from './types/updateAppointment.types';
import {
  cancelAppointment,
  createAppointment,
  getAppointment,
  getAppointmentLocations,
  getAppointments,
  getAppointmentsFormat,
  getDetailsNhs,
  getPlaceDetails,
  getPractitionerGender,
  getServiceCategories,
  getSlots,
  searchAddress,
  updateAppointment,
} from './ams.endpoints';
import { ApiTags } from './ams.tags';
import {
  buildCreateAppointmentRequest,
  buildGetBookingSlotsRequest,
  buildGetLocationsRequest,
} from './ams.utils';

import { api } from '@blua-platform/foundation';

// -------------------------------------------------------------------------------------------------
// Base API
// -------------------------------------------------------------------------------------------------

export const amsBaseApi = api
  .enhanceEndpoints({
    addTagTypes: [ApiTags.BookingSlots, ApiTags.RescheduleSlots],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
      // -------------------------------------------------------------------------------------------
      // Simple queries
      // -------------------------------------------------------------------------------------------
      getServiceCategories: builder.query<FormResponse<SingleResponseItem>, void>({
        query: getServiceCategories,
      }),

      getAppointmentFormats: builder.query<FormResponse<SingleResponseItem>, void>({
        query: getAppointmentsFormat,
      }),

      getClinicianGender: builder.query<FormResponse<SingleResponseItem>, void>({
        query: getPractitionerGender,
      }),

      getGPOptions: builder.query<FormResponse<SingleResponseItem>, void>({
        query: getDetailsNhs,
      }),

      // -------------------------------------------------------------------------------------------
      // Locations (infinite query)
      // -------------------------------------------------------------------------------------------
      getInfiniteLocations: builder.infiniteQuery<
        GetLocationsResponse,
        void,
        number
      >({
        initialPageParam: 1,
        getNextPageParam: (firstPage) => {
          const currentPage = firstPage.data?.metadata?.current_page;
          const lastPage = firstPage.data?.metadata?.last_page;

          if (!currentPage || !lastPage || currentPage >= lastPage) {
            return undefined;
          }

          return currentPage + 1;
        },
        queryFn: async ({ pageParam }, { getState }, baseQuery) => {
          const queryParams = buildGetLocationsRequest(pageParam, getState());
          const response = await baseQuery(
            getAppointmentLocations(queryParams),
          );

          if (response.error) {
            return { error: response.error as unknown as Error };
          }

          const data = response.data as GetLocationsResponse;
          return { data };
        },
      }),

      // -------------------------------------------------------------------------------------------
      // Booking slots (standard + reschedule)
      // -------------------------------------------------------------------------------------------
      getBookingSlots: builder.query<
        GetSlotsResponseType['data'],
        { fromDate: string; toDate: string }
      >({
        providesTags: [ApiTags.BookingSlots],
        keepUnusedDataFor: 5,
        queryFn: async ({ fromDate, toDate }, { getState }, baseQuery) => {
          const queryParams = buildGetBookingSlotsRequest({
            getState,
            fromDate,
            toDate,
          });

          const response = await baseQuery(getSlots(queryParams));

          if (response.error) {
            return { error: response.error as unknown as Error };
          }

          const data = (response.data as GetSlotsResponseType).data;

          return processSlotsApiData(data, fromDate, toDate);
        },
      }),

      getRescheduleSlots: builder.query<
        GetSlotsResponseType['data'],
        GetSlotsParams
      >({
        providesTags: [ApiTags.RescheduleSlots],
        queryFn: async (queryParams, _, baseQuery) => {
          const fromDate = (queryParams as any)['from-date'];
          const toDate = (queryParams as any)['to-date'];

          const response = await baseQuery(getSlots(queryParams));

          if (response.error) {
            return { error: response.error as unknown as Error };
          }

          const data = (response.data as GetSlotsResponseType).data;
          return processSlotsApiData(data, fromDate, toDate);
        },
      }),

      // -------------------------------------------------------------------------------------------
      // Appointments (create / list / details / cancel / reschedule)
      // -------------------------------------------------------------------------------------------
      createAppointment: builder.mutation<CreateAppointmentResponse, void>({
        queryFn: async (_, { getState }, baseQuery) => {
          const requestBody = buildCreateAppointmentRequest({ getState });
          const response = await baseQuery(createAppointment(requestBody));

          if (response.error) {
            return { error: response.error as unknown as Error };
          }

          const data = response.data as CreateAppointmentResponse;
          return { data };
        },
      }),

      getAppointments: builder.query<
        GetAppointmentsResponse,
        GetAppointmentsParams
      >({
        query: getAppointments,
      }),

      getAppointment: builder.query<
        GetAppointmentDetailsResponse,
        string
      >({
        query: getAppointment,
      }),

      cancelAppointment: builder.mutation<
        CancelAppointmentResponse,
        string
      >({
        query: cancelAppointment,
        async onQueryStarted(appointmentId, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;

            dispatch(
              amsBaseApi.util.updateQueryData(
                'getAppointment',
                appointmentId,
                (draftAppointmentDetails) => {
                  Object.assign(draftAppointmentDetails, {
                    ...draftAppointmentDetails,
                    ...data,
                  });
                },
              ),
            );
          } catch {
            throw new Error('booking.api/cancelAppointment:onQueryStarted');
          }
        },
      }),

      rescheduleAppointment: builder.mutation<
        UpdateAppointmentResponse,
        UpdateAppointmentRequest
      >({
        query: updateAppointment,
        async onQueryStarted(
          { appointmentId },
          { dispatch, queryFulfilled },
        ) {
          try {
            const { data } = await queryFulfilled;

            dispatch(
              amsBaseApi.util.updateQueryData(
                'getAppointment',
                appointmentId,
                (draftAppointmentDetails) => {
                  Object.assign(draftAppointmentDetails, {
                    ...draftAppointmentDetails,
                    ...data,
                  });
                },
              ),
            );
          } catch {
            throw new Error(
              'booking.api/rescheduleAppointment:onQueryStarted',
            );
          }
        },
      }),

      // -------------------------------------------------------------------------------------------
      // Address / place search
      // -------------------------------------------------------------------------------------------
      searchAddress: builder.mutation<
        SearchAddressResponse,
        SearchAddressRequest
      >({
        query: searchAddress,
      }),

      searchPlaceDetails: builder.query<
        SearchPlaceDetailsResponse,
        SearchPlaceDetailsRequest
      >({
        query: getPlaceDetails,
      }),
    }),
  });

// -------------------------------------------------------------------------------------------------
// Endpoint re-exports (for direct endpoint access)
// -------------------------------------------------------------------------------------------------

export const getServiceCategoriesEndpoint =
  amsBaseApi.endpoints.getServiceCategories;
export const getAppointmentFormatsEndpoint =
  amsBaseApi.endpoints.getAppointmentFormats;
export const getClinicianGenderEndpoint =
  amsBaseApi.endpoints.getClinicianGender;
export const getGPOptionsEndpoint =
  amsBaseApi.endpoints.getGPOptions;
export const getInfiniteLocationsEndpoint =
  amsBaseApi.endpoints.getInfiniteLocations;
export const getBookingSlotsEndpoint =
  amsBaseApi.endpoints.getBookingSlots;
export const createAppointmentEndpoint =
  amsBaseApi.endpoints.createAppointment;
export const getAppointmentsEndpoint =
  amsBaseApi.endpoints.getAppointments;
export const getAppointmentEndpoint =
  amsBaseApi.endpoints.getAppointment;
export const cancelAppointmentEndpoint =
  amsBaseApi.endpoints.cancelAppointment;
export const getRescheduleSlotsEndpoint =
  amsBaseApi.endpoints.getRescheduleSlots;
export const rescheduleAppointmentEndpoint =
  amsBaseApi.endpoints.rescheduleAppointment;
export const searchAddressEndpoint =
  amsBaseApi.endpoints.searchAddress;
export const searchPlaceDetailsEndpoint =
  amsBaseApi.endpoints.searchPlaceDetails;

// -------------------------------------------------------------------------------------------------
// Generated hook aliases (as in your files)
// -------------------------------------------------------------------------------------------------

export const useGetServiceCategoriesQuery =
  amsBaseApi.useGetServiceCategoriesQuery;

export const useGetAppointmentFormatsQuery =
  amsBaseApi.useGetAppointmentFormatsQuery;

export const useGetClinicianGenderQuery =
  amsBaseApi.useGetClinicianGenderQuery;

export const useGetGPOptionsQuery =
  amsBaseApi.useGetGPOptionsQuery;

// "Infinite" locations hooks – based on your custom infiniteQuery helpers
export const useGetLocationsInfiniteQuery =
  amsBaseApi.useGetInfiniteLocationsInfiniteQuery as unknown;

export const useGetLocationsInfiniteQueryStateResult =
  (amsBaseApi.endpoints.getInfiniteLocations as any)
    .useInfiniteQueryState;

// Booking slots
export const useGetBookingSlotsQuery =
  amsBaseApi.useGetBookingSlotsQuery;

// Appointment mutations / queries
export const useCreateAppointmentMutation =
  amsBaseApi.useCreateAppointmentMutation;

export const useGetAppointmentsQuery =
  amsBaseApi.useGetAppointmentsQuery;

export const useGetAppointmentQuery =
  amsBaseApi.useGetAppointmentQuery;

export const useCancelAppointmentMutation =
  amsBaseApi.useCancelAppointmentMutation;

export const useGetRescheduleSlotsQuery =
  amsBaseApi.useGetRescheduleSlotsQuery;

export const useRescheduleAppointmentMutation =
  amsBaseApi.useRescheduleAppointmentMutation;

// Address / place
export const useSearchAddressMutation =
  amsBaseApi.useSearchAddressMutation;

export const useLazySearchPlaceDetailsQuery =
  amsBaseApi.useLazySearchPlaceDetailsQuery;
