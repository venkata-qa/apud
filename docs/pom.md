P0 — fix immediately (critical/actively exploited)

log4j:log4j — 1.2.17 → REMOVE
CVEs: 2019-17571, 2021-4104, 2022-23302/23305/23307. Your report lists it as a Top-5 vulnerable package. 

SCA_ScanReport_ccec9a33-20c0-45…

net.snowflake:snowflake-jdbc — 3.13.28 → upgrade (pin a post-2025 release)
CVEs: 2023-30535, 2024-43382, 2025-24789/24790/27496. Top-5 vulnerable package. 

SCA_ScanReport_ccec9a33-20c0-45…

ch.qos.logback:logback-core / logback-classic — 1.4.11 → upgrade
CVEs: 2023-6378, 2023-6481, 2024-12798/12801. In Top-5 list via logback-core 1.4.11. 

SCA_ScanReport_ccec9a33-20c0-45…

Spring Framework (transitive via Spring Boot 2.0.5)
spring-beans/context/core/expression — 5.0.9.RELEASE → upgrade Spring line via newer Boot BOM
CVEs include: 2022-22965 (“Spring4Shell”), 2022-22950/22968/22970, 2023-20861/20863, 2024-38808/38820, 2025-22233. Top-5 includes spring-expression 5.0.9.RELEASE. 

SCA_ScanReport_ccec9a33-20c0-45…

org.bouncycastle:bcprov-jdk18on / bcpkix-jdk18on — 1.75 → upgrade both together
CVEs: 2024-29857/30171/30172 and 2025-8885/8916 (Aug-2025). Top-5 includes bcprov-jdk18on 1.75. 

SCA_ScanReport_ccec9a33-20c0-45…

P1 — high severity / widely used

commons-io:commons-io — 2.11.0 → upgrade
CVE-2024-47554. 

SCA_ScanReport_ccec9a33-20c0-45…

org.apache.tika:tika-core — 2.8.0 → upgrade
CVE-2025-54988. 

SCA_ScanReport_ccec9a33-20c0-45…

mysql:mysql-connector-java — 8.0.26 (also 8.0.33 via property) → standardize on a safe 8.x
CVEs: 2021-2471, 2022-21363, 2023-22102; license GPL-2.0 flagged. Prefer one entry only. 

SCA_ScanReport_ccec9a33-20c0-45…

Apache POI
poi-ooxml — 5.2.3 → upgrade (CVE-2025-31672) and ensure poi matches the same line. 

SCA_ScanReport_ccec9a33-20c0-45…

commons-compress — 1.21 (transitive) → upgrade
CVE-2024-25710/26308. 

SCA_ScanReport_ccec9a33-20c0-45…

pdfbox — 2.0.20 (transitive) → upgrade (and fontbox/tools accordingly)
CVEs: 2021-27807/27906/31811/31812. 

SCA_ScanReport_ccec9a33-20c0-45…

P2 — medium severity / still important

org.jsoup:jsoup — 1.11.3 → upgrade
CVEs: 2021-37714, 2022-36033. 

SCA_ScanReport_ccec9a33-20c0-45…

net.minidev:json-smart — 2.4.7 (transitive) → upgrade
CVE-2023-1370. 

SCA_ScanReport_ccec9a33-20c0-45…

org.xmlunit:xmlunit-core — 2.9.1 → upgrade
CVE-2024-31573. (You use 2.9.1 for both core and assertj.) 

SCA_ScanReport_ccec9a33-20c0-45…

Apache Ant — 1.10.3 (transitive) → upgrade or ensure build-time-only
CVEs: 2020-1945, 2021-36373/36374. 

SCA_ScanReport_ccec9a33-20c0-45…

commons-lang3 — 3.13.0 → upgrade
Flagged in report (CVE-2025-48924). 

SCA_ScanReport_ccec9a33-20c0-45…

com.jayway.jsonpath:json-path — 2.7.0 → upgrade
CVE-2023-51074. (You also include json-path-assert.) 

SCA_ScanReport_ccec9a33-20c0-45…

org.apache.httpcomponents:httpclient — 4.5.6 (transitive) → upgrade or drop
CVE-2020-13956. If you standardize on httpclient5, exclude 4.x. 

SCA_ScanReport_ccec9a33-20c0-45…

Velocity — 2.1 (transitive) → upgrade
CVE-2020-13936. 

SCA_ScanReport_ccec9a33-20c0-45…

commons-beanutils — 1.9.4 (transitive) → upgrade
CVE-2025-48734. 

SCA_ScanReport_ccec9a33-20c0-45…

xmlgraphics-commons — 1.4 (transitive) → upgrade
CVE-2020-11988. 

SCA_ScanReport_ccec9a33-20c0-45…

commons-configuration — 1.10 (transitive) → upgrade
CVE-2025-46392. 

SCA_ScanReport_ccec9a33-20c0-45…

commons-codec — 1.11 (transitive) → upgrade
(Historical issues; report flags ancient 1.11.) 

SCA_ScanReport_ccec9a33-20c0-45…

P3 — platform alignment & test/build

Spring Boot 2.0.5 → upgrade Boot line (e.g., 2.7.x)
Addresses Boot CVEs (2022-27772, 2023-20883) and updates Spring 5.0.9 transitive set. 

SCA_ScanReport_ccec9a33-20c0-45…

JUnit 4 — 4.12 → 4.13.2 (scope test)
CVE-2020-15250. 

SCA_ScanReport_ccec9a33-20c0-45…

TestNG — 7.3.0 → upgrade
Flagged CVE-2022-4065 in report. (Your POM also defines 7.9.0 — keep only one.) 

SCA_ScanReport_ccec9a33-20c0-45…

javax.mail 1.6.2 (CDDL/GPL CE) → consider Jakarta Mail replacement
License risks noted; swap if distribution policies require. 

SCA_ScanReport_ccec9a33-20c0-45…

Quick “do this” summary (from the report)

Delete log4j:log4j 1.x anywhere it appears (direct or transitive). 

SCA_ScanReport_ccec9a33-20c0-45…

Bump & pin: Snowflake JDBC, Logback (core+classic), BouncyCastle (prov+pkix), commons-io, Tika core, MySQL JDBC, POI(+OOXML), XMLUnit, jsoup. 

SCA_ScanReport_ccec9a33-20c0-45…

Lift the platform: move Spring Boot off 2.0.5 to update the Spring 5.0.9 family automatically. 

SCA_ScanReport_ccec9a33-20c0-45…

Transitives to exclude/upgrade: commons-compress, pdfbox (2.0.20 lineage), Apache Ant, httpclient 4.x, velocity, beanutils, xmlgraphics-commons, commons-codec, json-smart. 

SCA_ScanReport_ccec9a33-20c0-45…

If you want, I can turn this into a ready-to-paste <dependencyManagement> block (pins for each) and an Enforcer rule that bans the exact vulnerable ranges your report flagged.
