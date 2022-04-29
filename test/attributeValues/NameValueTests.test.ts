import { DisplayName, GivenName, LegalNameDE, Salutation, Surname } from "@nmshd/content"
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
            }
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
            }
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
            }
        })
    }
}
