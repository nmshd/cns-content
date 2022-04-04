import {
    Attribute,
    BirthDate,
    BirthDay,
    BirthMonth,
    BirthYear,
    DeprecatedAttribute,
    GivenName,
    LengthUnit,
    PersonHeight
} from "@nmshd/content"
import { CoreDate } from "@nmshd/transport"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"

export class AttributeTest extends AbstractTest {
    public run(): void {
        describe("Attribute", function () {
            it("should allow to create new attributes from objects", function () {
                const birthDateContent = {
                    "@type": "BirthDate",
                    day: { value: 22 },
                    month: { value: 2 },
                    year: { value: 2022 }
                }
                const birthDate = Attribute.from({
                    content: birthDateContent,
                    createdAt: CoreDate.utc()
                })
                expect(birthDate).to.be.instanceOf(Attribute)
                expect(birthDate.content).to.be.instanceOf(BirthDate)
                if (birthDate.content instanceof BirthDate) {
                    expect(birthDate.content.toJSON()).to.deep.equal(birthDateContent)
                    expect(birthDate.content.day).to.be.instanceOf(BirthDay)
                    expect(birthDate.content.month).to.be.instanceOf(BirthMonth)
                    expect(birthDate.content.year).to.be.instanceOf(BirthYear)
                }
            })

            it("should allow to validate string values", function () {
                let personHeight = Attribute.from({
                    content: {
                        "@type": "PersonHeight",
                        unit: LengthUnit.CM,
                        value: 172
                    },
                    createdAt: CoreDate.utc()
                })
                expect(personHeight).to.be.instanceOf(Attribute)
                expect(personHeight.content).to.be.instanceOf(PersonHeight)

                personHeight = Attribute.from({
                    content: {
                        "@type": "PersonHeight",
                        unit: "cm",
                        value: 172
                    },
                    createdAt: CoreDate.utc()
                })
                expect(personHeight).to.be.instanceOf(Attribute)
                expect(personHeight.content).to.be.instanceOf(PersonHeight)

                expect(() =>
                    Attribute.from({
                        content: {
                            "@type": "PersonHeight",
                            unit: "mm",
                            value: 1720
                        },
                        createdAt: CoreDate.utc()
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
                const birthDate = Attribute.from({
                    content: birthDateContent,
                    validFrom: CoreDate.utc().subtract({ years: 1 }),
                    validTo: CoreDate.utc().add({ years: 1 }),
                    createdAt: CoreDate.utc()
                })
                expect(birthDate).to.be.instanceOf(Attribute)
                expect(birthDate.content).to.be.instanceOf(BirthDate)
                if (birthDate.content instanceof BirthDate) {
                    expect(birthDate.content.toJSON()).to.deep.equal(birthDateContent)
                    expect(birthDate.content.day).to.be.instanceOf(BirthDay)
                    expect(birthDate.content.month).to.be.instanceOf(BirthMonth)
                    expect(birthDate.content.year).to.be.instanceOf(BirthYear)
                }
            })

            it("should deserialize content", function () {
                const attribute = Attribute.from({
                    createdAt: CoreDate.utc(),
                    content: {
                        "@type": "GivenName",
                        value: "John"
                    }
                })

                expect(attribute.content).to.exist
                expect(attribute).to.be.instanceOf(Attribute)
                expect(attribute.content).to.be.instanceOf(GivenName)
                expect(attribute.content.value).to.equal("John")
            })

            it("should validate attribute values from JSON", function () {
                expect(
                    Attribute.from.bind(Attribute, {
                        content: {
                            "@type": "BirthDate",
                            day: { value: 22 },
                            month: { value: 13 },
                            year: { value: 2022 }
                        },
                        validFrom: CoreDate.utc().subtract({ years: 1 }),
                        validTo: CoreDate.utc().add({ years: 1 }),
                        createdAt: CoreDate.utc()
                    })
                ).to.throw("BirthMonth.value:Number :: has invalid value")
            })

            it("should validate attribute values from objects", function () {
                expect(
                    Attribute.from.bind(Attribute, {
                        content: {
                            "@type": "BirthMonth",
                            value: 13
                        },
                        validFrom: CoreDate.utc().subtract({ years: 1 }),
                        validTo: CoreDate.utc().add({ years: 1 }),
                        createdAt: CoreDate.utc()
                    })
                ).to.throw("BirthMonth.value:Number :: has invalid value")
            })

            it("should allow to convert deprecated attribute values", function () {
                const attribute: any = {
                    name: "Person.givenName",
                    value: "Martina",
                    createdAt: CoreDate.utc()
                }

                const deprecatedAttribute = Attribute.from(attribute)
                expect(deprecatedAttribute.content).instanceOf(DeprecatedAttribute)
            })
        })
    }
}
