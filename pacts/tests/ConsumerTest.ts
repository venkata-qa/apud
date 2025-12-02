import path from 'path';
import { PactV3, MatchersV3, SpecificationVersion } from '@pact-foundation/pact';

// This is a placeholder import – in a real FE app this would be the client
// that calls the booking service /services/categories endpoint.
// Replace with the actual module used by your booking frontend.
// import * as BookingAPI from '../src/api/bookingServiceClient';

const { eachLike, like } = MatchersV3;

const provider = new PactV3({
  consumer: 'BookingFEService',
  provider: 'BookingService',
  logLevel: 'debug',
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: SpecificationVersion.SPECIFICATION_VERSION_V2,
  host: '127.0.0.1',
  port: 5001,
});

describe('Pact with BookingService for /services/categories', () => {
  it('returns the list of service categories', async () => {
    provider.addInteraction({
      states: [{ description: 'service categories exist' }],
      uponReceiving: 'a request to get service categories',
      withRequest: {
        method: 'GET',
        path: '/services/categories',
        headers: {
          // Include only the headers the frontend really sends in your real app.
          Authorization: like('Bearer some-token'),
          'X-BUPA-GOLDEN-ID': like('123456789'),
        },
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: eachLike(
          {
            code: like('PHYSIOTHERAPY'),
            display: like('Physiotherapy'),
            system: like('https://bupa.co.uk/CodeSystem/service-category'),
          },
          { min: 1 },
        ),
      },
    });

    await provider.executeTest(async (mockService) => {
      // In a real test, you would:
      //  1. Configure your booking frontend API client to use mockService.url as base URL
      //  2. Call the function that fetches service categories
      //  3. Assert on the data the FE receives
      //
      // Example (pseudo‑code):
      //
      // const result = await BookingAPI.getServiceCategories({
      //   baseUrl: mockService.url,
      //   token: 'some-token',
      //   goldenId: '123456789',
      // });
      //
      // expect(Array.isArray(result)).toBe(true);
      // expect(result[0].code).toBeDefined();
      // expect(result[0].display).toBeDefined();

      // For now, this placeholder just performs a no‑op so the example compiles.
      // Replace with real FE client calls when integrating into your frontend repo.

    });
  });
});


