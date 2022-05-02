import { DisplayName, GivenName, HonorificPrefix, LegalNameDE, Pseudonym, Salutation, Surname } from "@nmshd/content"
import { AbstractTest } from "../AbstractTest"
import { GenericValueTest } from "./GenericValueTest"

export class NameValueTests extends AbstractTest {
    public run(): void {
        this.runPerson()
    }

    public runPerson(): void {
        new GenericValueTest(this.loggerFactory).runParametrized({
            testName: "Salutation Test (empty Titles)",
            typeName: "Salutation",
            typeClass: Salutation,
            expectedJSON: {
                "@type": "Salutation",
                displayName: "Test DisplayName",
                givenNames: [],
                surname: "Test Surname"
            },
            valueJSON: {
                "@type": "Salutation",
                displayName: "Test DisplayName",
                givenNames: [],
                surname: "Test Surname"
            },
            valueVerboseJSON: {
                "@type": "Salutation",
                displayName: {
                    "@type": "DisplayName",
                    value: "Test DisplayName"
                },
                givenNames: [],
                surname: {
                    "@type": "Surname",
                    value: "Test Surname"
                }
            },
            valueInterface: {
                displayName: DisplayName.fromAny("Test DisplayName"),
                givenNames: [],
                surname: Surname.fromAny("Test Surname")
            },
            valueString: "Test DisplayName"
        })

        new GenericValueTest(this.loggerFactory).runParametrized({
            testName: "Salutation Test (no Titles)",
            typeName: "Salutation",
            typeClass: Salutation,
            expectedJSON: {
                "@type": "Salutation",
                displayName: "Test DisplayName",
                givenNames: [],
                surname: "TestSurname"
            },
            valueJSON: {
                "@type": "Salutation",
                displayName: "Test DisplayName",
                givenNames: [],
                surname: "TestSurname"
            },
            valueVerboseJSON: {
                "@type": "Salutation",
                displayName: {
                    "@type": "DisplayName",
                    value: "Test DisplayName"
                },
                givenNames: [],
                surname: {
                    "@type": "Surname",
                    value: "TestSurname"
                }
            },
            valueInterface: {
                displayName: DisplayName.fromAny("Test DisplayName"),
                givenNames: [],
                surname: Surname.fromAny("TestSurname")
            },
            valueString: "Test DisplayName"
        })

        new GenericValueTest(this.loggerFactory).runParametrized({
            testName: "LegalNameDE Test",
            typeName: "LegalNameDE",
            typeClass: LegalNameDE,
            expectedJSON: {
                "@type": "LegalNameDE",
                givenNames: ["TestGivenName"],
                surname: "TestSurname"
            },
            valueJSON: {
                "@type": "LegalNameDE",
                givenNames: ["TestGivenName"],
                surname: "TestSurname"
            },
            valueVerboseJSON: {
                "@type": "LegalNameDE",
                givenNames: [
                    {
                        "@type": "GivenName",
                        value: "TestGivenName"
                    }
                ],
                surname: {
                    "@type": "Surname",
                    value: "TestSurname"
                }
            },
            valueInterface: {
                givenNames: [GivenName.fromAny("TestGivenName")],
                surname: Surname.fromAny("TestSurname")
            },
            valueString: "TestGivenName TestSurname"
        })

        new GenericValueTest(this.loggerFactory).runParametrized({
            testName: "LegalNameDE Test (two GivenNames)",
            typeName: "LegalNameDE",
            typeClass: LegalNameDE,
            expectedJSON: {
                "@type": "LegalNameDE",
                givenNames: ["TestGivenName1", "TestGivenName2"],
                surname: "TestSurname"
            },
            valueJSON: {
                "@type": "LegalNameDE",
                givenNames: ["TestGivenName1", "TestGivenName2"],
                surname: "TestSurname"
            },
            valueVerboseJSON: {
                "@type": "LegalNameDE",
                givenNames: [
                    {
                        "@type": "GivenName",
                        value: "TestGivenName1"
                    },
                    {
                        "@type": "GivenName",
                        value: "TestGivenName2"
                    }
                ],
                surname: {
                    "@type": "Surname",
                    value: "TestSurname"
                }
            },
            valueInterface: {
                givenNames: [GivenName.fromAny("TestGivenName1"), GivenName.fromAny("TestGivenName2")],
                surname: Surname.fromAny("TestSurname")
            },
            valueString: "TestGivenName1 TestGivenName2 TestSurname"
        })

        new GenericValueTest(this.loggerFactory).runParametrized({
            testName: "LegalNameDE Test (with Prefix)",
            typeName: "LegalNameDE",
            typeClass: LegalNameDE,
            expectedJSON: {
                "@type": "LegalNameDE",
                givenNames: ["TestGivenName1", "TestGivenName2"],
                surname: "TestSurname",
                honorificPrefix: "Dr. Dr. rer. nat."
            },
            valueJSON: {
                "@type": "LegalNameDE",
                givenNames: ["TestGivenName1", "TestGivenName2"],
                surname: "TestSurname",
                honorificPrefix: "Dr. Dr. rer. nat."
            },
            valueVerboseJSON: {
                "@type": "LegalNameDE",
                givenNames: [
                    {
                        "@type": "GivenName",
                        value: "TestGivenName1"
                    },
                    {
                        "@type": "GivenName",
                        value: "TestGivenName2"
                    }
                ],
                surname: {
                    "@type": "Surname",
                    value: "TestSurname"
                },
                honorificPrefix: {
                    "@type": "HonorificPrefix",
                    value: "Dr. Dr. rer. nat."
                }
            },
            valueInterface: {
                givenNames: [GivenName.fromAny("TestGivenName1"), GivenName.fromAny("TestGivenName2")],
                surname: Surname.fromAny("TestSurname"),
                honorificPrefix: HonorificPrefix.fromAny("Dr. Dr. rer. nat.")
            },
            valueString: "Dr. Dr. rer. nat. TestGivenName1 TestGivenName2 TestSurname"
        })

        new GenericValueTest(this.loggerFactory).runParametrized({
            testName: "LegalNameDE Test (with Pseudonym)",
            typeName: "LegalNameDE",
            typeClass: LegalNameDE,
            expectedJSON: {
                "@type": "LegalNameDE",
                givenNames: ["TestGivenName1", "TestGivenName2"],
                surname: "TestSurname",
                honorificPrefix: "Dr. Dr. rer. nat.",
                pseudonym: "Blubber"
            },
            valueJSON: {
                "@type": "LegalNameDE",
                givenNames: ["TestGivenName1", "TestGivenName2"],
                surname: "TestSurname",
                honorificPrefix: "Dr. Dr. rer. nat.",
                pseudonym: "Blubber"
            },
            valueVerboseJSON: {
                "@type": "LegalNameDE",
                givenNames: [
                    {
                        "@type": "GivenName",
                        value: "TestGivenName1"
                    },
                    {
                        "@type": "GivenName",
                        value: "TestGivenName2"
                    }
                ],
                surname: {
                    "@type": "Surname",
                    value: "TestSurname"
                },
                honorificPrefix: {
                    "@type": "HonorificPrefix",
                    value: "Dr. Dr. rer. nat."
                },
                pseudonym: {
                    "@type": "Pseudonym",
                    value: "Blubber"
                }
            },
            valueInterface: {
                givenNames: [GivenName.fromAny("TestGivenName1"), GivenName.fromAny("TestGivenName2")],
                surname: Surname.fromAny("TestSurname"),
                honorificPrefix: HonorificPrefix.fromAny("Dr. Dr. rer. nat."),
                pseudonym: Pseudonym.fromAny("Blubber")
            },
            valueString: 'Dr. Dr. rer. nat. TestGivenName1 TestGivenName2 TestSurname aka "Blubber"'
        })
    }
}
