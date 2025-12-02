// Example Pact JVM provider test for GET /services/categories.
// This is a template showing how you can wire Pact to your existing Spring Boot
// integration setup. You will need Pact JVM dependencies on the classpath
// (e.g. au.com.dius:pact-jvm-provider-junit5 and pact-jvm-provider-spring).

import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.junit5.PactVerificationInvocationContextProvider;
import au.com.dius.pact.provider.junit5.HttpTestTarget;
import au.com.dius.pact.provider.junit5.Provider;
import au.com.dius.pact.provider.junit5.loader.PactFolder;
import au.com.dius.pact.provider.junit5.State;
import org.hl7.fhir.r4.model.CodeSystem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Provider("BookingService")    // Must match the provider name used in the consumer pact
@PactFolder("pacts")          // Folder (on test classpath) where pact files are stored
public class BookingServiceCategoriesPactProviderTest extends AbstractIT {

  // Reuse the same CodeSystem URL used in BookingTest.Java so the stubbed
  // downstream FHIR call returns data for the correct service category system.
  private static final String SERVICE_CATEGORY_CODE_SYSTEM_URL =
      "https://bupa.co.uk/CodeSystem/service-category";

  @LocalServerPort
  private int port;

  @BeforeEach
  void before(PactVerificationContext context) {
    // Point Pact at the running Spring Boot app
    context.setTarget(new HttpTestTarget("localhost", port));
  }

  /**
   * Provider state method that matches the consumer's state
   * "service categories exist".
   *
   * Here you should stub external dependencies (like the FHIR CodeSystem
   * endpoint) so that /services/categories returns deterministic data
   * matching the consumer contract.
   */
  @State("service categories exist")
  public void serviceCategoriesExist() {
    // Set up the same stubbed downstream call you use in BookingTest.Java
    // so that /services/categories returns deterministic data that matches
    // the Pact contract.
    Map<String, String> fhirQueryParams = new HashMap<>();
    fhirQueryParams.put(CodeSystem.SP_SYSTEM, SERVICE_CATEGORY_CODE_SYSTEM_URL);

    stubProviderServiceListServiceCategoriesCallSuccessful(fhirQueryParams);
  }

  @TestTemplate
  @ExtendWith(PactVerificationInvocationContextProvider.class)
  void verifyPactInteractions(PactVerificationContext context) {
    // Pact will:
    // 1. Call the appropriate @State method.
    // 2. Issue the HTTP request (GET /services/categories) as defined in the pact.
    // 3. Assert that status and body match the contract expectations.
    context.verifyInteraction();
  }
}


