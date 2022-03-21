import {
    Attribute,
    BirthDate,
    BirthDay,
    BirthMonth,
    BirthYear,
    GivenName,
    LengthUnit,
    PersonHeight
} from "@nmshd/content"
import { CoreDate } from "@nmshd/transport"
import { expect } from "chai"
import { DateTime } from "luxon"
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
                    createdAt: { date: DateTime.utc().toString() }
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
                    createdAt: { date: DateTime.utc().toString() }
                })
                expect(personHeight).to.be.instanceOf(Attribute)
                expect(personHeight.content).to.be.instanceOf(PersonHeight)

                personHeight = Attribute.from({
                    content: {
                        "@type": "PersonHeight",
                        unit: "cm",
                        value: 172
                    },
                    createdAt: { date: DateTime.utc().toString() }
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
                        createdAt: { date: DateTime.utc().toString() }
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
                const birthDate = Attribute.fromJSON({
                    "@type": "Attribute",
                    content: birthDateContent,
                    validFrom: DateTime.utc().minus({ years: 1 }).toString(),
                    validTo: DateTime.utc().plus({ years: 1 }).toString(),
                    createdAt: DateTime.utc().toString()
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

                expect(attribute.content.value).to.equal("John")

                expect(attribute).to.be.instanceOf(Attribute)
                expect(attribute.content).to.be.instanceOf(GivenName)
            })

            it("should validate attribute values from JSON", function () {
                expect(
                    Attribute.fromJSON.bind(Attribute, {
                        "@type": "Attribute",
                        content: {
                            "@type": "BirthDate",
                            day: { value: 22 },
                            month: { value: 13 },
                            year: { value: 2022 }
                        },
                        validFrom: DateTime.utc().minus({ years: 1 }).toString(),
                        validTo: DateTime.utc().plus({ years: 1 }).toString(),
                        createdAt: DateTime.utc().toString()
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
                        validFrom: { date: DateTime.utc().minus({ years: 1 }).toString() },
                        validTo: { date: DateTime.utc().plus({ years: 1 }).toString() },
                        createdAt: { date: DateTime.utc().toString() }
                    })
                ).to.throw("BirthMonth.value:Number :: has invalid value")
            })
        })
    }
}
