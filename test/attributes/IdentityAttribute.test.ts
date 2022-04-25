import {
    Attribute,
    BirthDate,
    BirthDateJSON,
    BirthDay,
    BirthMonth,
    BirthPlace,
    BirthYear,
    GivenName,
    IBirthDate,
    IDCardDE,
    IDCardIssuingDate,
    IdentityAttribute,
    LegalNameDE,
    LengthUnit,
    PersonHeight,
    StreetAddress
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
                let personHeight = IdentityAttribute.from<PersonHeight>({
                    value: {
                        "@type": "PersonHeight",
                        unit: LengthUnit.CM,
                        value: 172
                    },
                    owner: CoreAddress.from("address")
                })
                expect(personHeight).to.be.instanceOf(IdentityAttribute)
                expect(personHeight.value).to.be.instanceOf(PersonHeight)

                personHeight = IdentityAttribute.from({
                    value: {
                        "@type": "PersonHeight",
                        unit: "cm",
                        value: 172
                    },
                    owner: CoreAddress.from("address")
                })
                expect(personHeight).to.be.instanceOf(IdentityAttribute)
                expect(personHeight.value).to.be.instanceOf(PersonHeight)

                expect(() =>
                    IdentityAttribute.from({
                        value: {
                            "@type": "PersonHeight",
                            unit: "mm",
                            value: 1720
                        },
                        owner: CoreAddress.from("address")
                    })
                ).to.throw("PersonHeight.unit:String :: must be one of")
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
                const legalNameValue = {
                    "@type": "LegalNameDE",
                    surname: { value: "Mustermann" },
                    givenNames: [{ value: "Max" }]
                }
                const birthDateValue = {
                    "@type": "BirthDate",
                    day: { value: 11 },
                    month: { value: 1 },
                    year: { value: 1999 }
                }
                const birthPlaceValue = {
                    "@type": "BirthPlace",
                    city: { value: "Hauptstadt" },
                    country: { value: "Deutschland" }
                }
                const addressValue = {
                    "@type": "StreetAddress",
                    recipient: "Max Mustermann",
                    street: { value: "Hauptstraße" },
                    houseNo: { value: "1" },
                    zipCode: { value: "123456" },
                    city: { value: "Hauptstadt" },
                    country: { value: "Atlantis" },
                    state: { value: "Westatlantis" }
                }
                const issuingDateValue = {
                    "@type": "IDCardIssuingDate",
                    value: "2022-02-22"
                }
                const idCardValue = {
                    "@type": "IDCardDE",
                    legalName: legalNameValue,
                    birthDate: birthDateValue,
                    birthPlace: birthPlaceValue,
                    address: addressValue,
                    issuingDate: issuingDateValue
                }
                const idCard = IdentityAttribute.from<IDCardDE>({
                    value: idCardValue,
                    validFrom: CoreDate.utc().subtract({ years: 1 }),
                    validTo: CoreDate.utc().add({ years: 1 }),
                    owner: CoreAddress.from("address")
                })
                expect(idCard.value).to.be.instanceOf(IDCardDE)
                expect(idCard.value.legalName).to.be.instanceOf(LegalNameDE)
                expect(idCard.value.birthDate).to.be.instanceOf(BirthDate)
                expect(idCard.value.birthPlace).to.be.instanceOf(BirthPlace)
                expect(idCard.value.address).to.be.instanceOf(StreetAddress)
                expect(idCard.value.issuingDate).to.be.instanceOf(IDCardIssuingDate)
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
