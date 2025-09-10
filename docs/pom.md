📌 Dependency Update List (from SCA Scan)
🚨 P0 — Critical (fix immediately)

log4j:log4j
1.2.17 → REMOVE
CVE-2019-17571, CVE-2021-4104, CVE-2022-23302/23305/23307

net.snowflake:snowflake-jdbc
3.13.28 → 3.15.2+
CVE-2023-30535, CVE-2024-43382, CVE-2025-24789/24790/27496

ch.qos.logback:logback-core / logback-classic
1.4.11 → 1.4.14+
CVE-2023-6378, CVE-2023-6481, CVE-2024-12798/12801

Spring Framework (via Spring Boot 2.0.5)
5.0.9.RELEASE → managed by Boot 2.7.x+
CVE-2022-22965 (“Spring4Shell”), CVE-2022-22950/22968/22970, CVE-2023-20861/20863, CVE-2024-38808/38820, CVE-2025-22233

org.bouncycastle:bcprov-jdk18on / bcpkix-jdk18on
1.75 → upgrade both to 1.78+
CVE-2024-29857/30171/30172, CVE-2025-8885/8916

⚠️ P1 — High Severity

commons-io:commons-io
2.11.0 → 2.16.1+
CVE-2024-47554

org.apache.tika:tika-core
2.8.0 → 2.9.2+
CVE-2025-54988

mysql:mysql-connector-java
8.0.26 / 8.0.33 → 8.4.0 LTS
CVE-2021-2471, CVE-2022-21363, CVE-2023-22102 — License: GPL-2.0

org.apache.poi:poi / poi-ooxml
3.17 / 5.2.3 → 5.2.5
CVE-2025-31672

org.apache.pdfbox:pdfbox
2.0.20 → 3.0.2
CVE-2021-27807/27906/31811/31812

org.apache.commons:commons-compress
1.21 → 1.26+
CVE-2024-25710/26308

🔧 P2 — Medium Severity

org.jsoup:jsoup
1.11.3 → 1.17.2
CVE-2021-37714, CVE-2022-36033

net.minidev:json-smart
2.4.7 → 2.5.x
CVE-2023-1370

org.xmlunit:xmlunit-core / xmlunit-assertj
2.9.1 → 2.10.0
CVE-2024-31573

org.apache.ant:ant
1.10.3 → 1.10.14+
CVE-2020-1945, CVE-2021-36373/36374

org.apache.commons:commons-lang3
3.13.0 → 3.14.0
CVE-2025-48924

com.jayway.jsonpath:json-path / json-path-assert
2.7.0 → 2.9.x
CVE-2023-51074

org.apache.httpcomponents:httpclient
4.5.6 → remove or replace with httpclient5
CVE-2020-13956

org.apache.velocity:velocity-engine-core
2.1 → 2.3
CVE-2020-13936

commons-beanutils:commons-beanutils
1.9.4 → 1.10.0+
CVE-2025-48734

org.apache.xmlgraphics:xmlgraphics-commons
1.4 → 2.9
CVE-2020-11988

commons-configuration:commons-configuration
1.10 → 2.10+
CVE-2025-46392

commons-codec:commons-codec
1.11 → 1.16.1
Flagged as outdated

🧪 P3 — Platform & Test

Spring Boot parent
2.0.5.RELEASE → 2.7.18 (or 3.x if on Java 17+)
Fixes Boot CVEs: CVE-2022-27772, CVE-2023-20883

junit:junit
4.12 → 4.13.2
CVE-2020-15250

org.testng:testng
7.3.0 → 7.9.0+
CVE-2022-4065

com.sun.mail:javax.mail
1.6.2 → switch to Jakarta Mail (2.0.1+)
License: CDDL-1.0 / GPL-2.0 CE
