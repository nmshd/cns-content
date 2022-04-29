import {
    Age,
    Attribute,
    BirthDate,
    BirthDateJSON,
    BirthDay,
    BirthMonth,
    BirthYear,
    GivenName,
    HonorificPrefix,
    IBirthDate,
    IdentityAttribute,
    LegalNameDE,
    Nationality,
    Surname
} from "@nmshd/content"
import { CoreAddress, CoreDate } from "@nmshd/transport"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"

export class IdentityAttributeTest extends AbstractTest {
    public run(): void {
        describe("IdentityAttribute", function () {
            it("should allow to create new attributes from objects (nested values)", function () {
                const birthDateContent = {
                    "@type": "BirthDate",
                    day: { value: 22 },
                    month: { value: 2 },
                    year: { value: 2022 }
                }
                const birthDateContentSerialized = {
                    "@type": "BirthDate",
                    day: 22,
                    month: 2,
                    year: 2022
                }
                const birthDate = IdentityAttribute.from({
                    value: birthDateContent,
                    owner: CoreAddress.from("address")
                })
                expect(birthDate).to.be.instanceOf(IdentityAttribute)
                expect(birthDate.value).to.be.instanceOf(BirthDate)

                if (birthDate.value instanceof BirthDate) {
                    expect(birthDate.value.toJSON()).to.deep.equal(birthDateContentSerialized)
                    expect(birthDate.value.day).to.be.instanceOf(BirthDay)
                    expect(birthDate.value.month).to.be.instanceOf(BirthMonth)
                    expect(birthDate.value.year).to.be.instanceOf(BirthYear)
                }
            })

            it("should allow to create new attributes from objects (only values)", function () {
                const birthDateContent = {
                    "@type": "BirthDate",
                    day: 22,
                    month: 2,
                    year: 2022
                }
                const birthDate = IdentityAttribute.from({
                    value: birthDateContent,
                    owner: CoreAddress.from("address")
                })
                expect(birthDate).to.be.instanceOf(IdentityAttribute)
                expect(birthDate.value).to.be.instanceOf(BirthDate)

                if (birthDate.value instanceof BirthDate) {
                    expect(birthDate.value.toJSON()).to.deep.equal(birthDateContent)
                    expect(birthDate.value.day).to.be.instanceOf(BirthDay)
                    expect(birthDate.value.month).to.be.instanceOf(BirthMonth)
                    expect(birthDate.value.year).to.be.instanceOf(BirthYear)
                }
            })

            it("should allow to validate string values", function () {
                let nationality = IdentityAttribute.from<Nationality>({
                    value: {
                        "@type": "Nationality",
                        value: "DE"
                    },
                    owner: CoreAddress.from("address")
                })
                expect(nationality).to.be.instanceOf(IdentityAttribute)
                expect(nationality.value).to.be.instanceOf(Nationality)

                nationality = IdentityAttribute.from({
                    value: {
                        "@type": "Nationality",
                        value: "DE"
                    },
                    owner: CoreAddress.from("address")
                })
                expect(nationality).to.be.instanceOf(IdentityAttribute)
                expect(nationality.value).to.be.instanceOf(Nationality)

                expect(() =>
                    IdentityAttribute.from({
                        value: {
                            "@type": "Nationality",
                            value: "xx"
                        },
                        owner: CoreAddress.from("address")
                    })
                ).to.throw("Nationality.value:String :: must be one of")

                expect(() =>
                    IdentityAttribute.from({
                        value: {
                            "@type": "Nationality",
                            value: 27
                        },
                        owner: CoreAddress.from("address")
                    })
                ).to.throw("Nationality.value :: Value is not a string")

                expect(() =>
                    IdentityAttribute.from({
                        value: {
                            "@type": "Nationality",
                            value: undefined
                        },
                        owner: CoreAddress.from("address")
                    })
                ).to.throw("Nationality.value :: Value is not defined")
            })

            it("should allow to validate integer values", function () {
                let age = IdentityAttribute.from<Age>({
                    value: {
                        "@type": "Age",
                        value: 122
                    },
                    owner: CoreAddress.from("address")
                })
                expect(age).to.be.instanceOf(IdentityAttribute)
                expect(age.value).to.be.instanceOf(Age)

                age = IdentityAttribute.from({
                    value: {
                        "@type": "Age",
                        value: 122
                    },
                    owner: CoreAddress.from("address")
                })
                expect(age).to.be.instanceOf(IdentityAttribute)
                expect(age.value).to.be.instanceOf(Age)

                expect(() =>
                    IdentityAttribute.from({
                        value: {
                            "@type": "Age",
                            value: "172"
                        },
                        owner: CoreAddress.from("address")
                    })
                ).to.throw("Age.value :: Value is not a number")
            })

            it("should allow to create new attributes from JSON", function () {
                const birthDateContent = {
                    "@type": "BirthDate",
                    day: { value: 22 },
                    month: { value: 2 },
                    year: { value: 2022 }
                }
                const birthDateContentSerialized = {
                    "@type": "BirthDate",
                    day: 22,
                    month: 2,
                    year: 2022
                }
                const birthDate = IdentityAttribute.from<BirthDate, IBirthDate, BirthDateJSON>({
                    value: birthDateContent,
                    validFrom: CoreDate.utc().subtract({ years: 1 }),
                    validTo: CoreDate.utc().add({ years: 1 }),
                    owner: CoreAddress.from("address")
                })
                expect(birthDate).to.be.instanceOf(IdentityAttribute)
                expect(birthDate.value).to.be.instanceOf(BirthDate)
                expect(birthDate.value.toJSON()).to.deep.equal(birthDateContentSerialized)
                expect(birthDate.value.day).to.be.instanceOf(BirthDay)
                expect(birthDate.value.month).to.be.instanceOf(BirthMonth)
                expect(birthDate.value.year).to.be.instanceOf(BirthYear)
            })

            it("should deserialize content", function () {
                const attribute = IdentityAttribute.from<GivenName>({
                    owner: CoreAddress.from("address"),
                    value: {
                        "@type": "GivenName",
                        value: "John"
                    }
                })

                expect(attribute.value).to.exist
                expect(attribute).to.be.instanceOf(IdentityAttribute)
                expect(attribute.value).to.be.instanceOf(GivenName)
                expect(attribute.value.value).to.equal("John")
            })

            it("should validate attribute values from JSON", function () {
                expect(
                    IdentityAttribute.from.bind(IdentityAttribute, {
                        value: {
                            "@type": "BirthDate",
                            day: { value: 22 },
                            month: { value: 13 },
                            year: { value: 2022 }
                        },
                        validFrom: CoreDate.utc().subtract({ years: 1 }),
                        validTo: CoreDate.utc().add({ years: 1 }),
                        owner: CoreAddress.from("address")
                    })
                ).to.throw("BirthMonth.value:Number :: must be an integer value between 1 and 12")
            })

            it("should validate attribute values from objects", function () {
                expect(
                    IdentityAttribute.from.bind(IdentityAttribute, {
                        value: {
                            "@type": "BirthMonth",
                            value: "13"
                        },
                        validFrom: CoreDate.utc().subtract({ years: 1 }),
                        validTo: CoreDate.utc().add({ years: 1 }),
                        owner: CoreAddress.from("address")
                    })
                ).to.throw("BirthMonth.value :: Value is not a number.")

                expect(
                    IdentityAttribute.from.bind(IdentityAttribute, {
                        value: {
                            "@type": "BirthMonth",
                            value: 13
                        },
                        validFrom: CoreDate.utc().subtract({ years: 1 }),
                        validTo: CoreDate.utc().add({ years: 1 }),
                        owner: CoreAddress.from("address")
                    })
                ).to.throw("BirthMonth.value:Number :: must be an integer value between 1 and 12")
            })

            it("should allow the creation of nested attributes", function () {
                const surname = { value: "Mustermann" }
                const givenName1 = { value: "Max" }
                const givenName2 = { value: "Milian" }
                const prefix = { value: "Dr. Dr." }
                const legalNameValue = {
                    "@type": "LegalNameDE",
                    surname: surname,
                    givenNames: [givenName1, givenName2],
                    honorificPrefix: prefix
                }
                const legalName = LegalNameDE.fromAny(legalNameValue)
                expect(legalName).to.be.instanceOf(LegalNameDE)

                const legalNameAttribute = IdentityAttribute.from<LegalNameDE>({
                    value: legalNameValue,
                    validFrom: CoreDate.utc().subtract({ years: 1 }),
                    validTo: CoreDate.utc().add({ years: 1 }),
                    owner: CoreAddress.from("address")
                })

                expect(legalNameAttribute.value).to.be.instanceOf(LegalNameDE)
                expect(legalNameAttribute.value.surname).to.be.instanceOf(Surname)

                expect(legalNameAttribute.value.givenNames[0]).to.be.instanceOf(GivenName)
                expect(legalNameAttribute.value.givenNames[1]).to.be.instanceOf(GivenName)
                expect(legalNameAttribute.value.honorificPrefix).to.be.instanceOf(HonorificPrefix)
                expect(legalNameAttribute.value.pseudonym).to.be.undefined
            })

            it("should be able to deal with deprecated attributes", function () {
                const attribute = Attribute.from({
                    name: "deprecatedAttributeName",
                    value: "someStringValue"
                })

                expect(attribute).to.be.instanceOf(Attribute)
            })
        })
    }
}
