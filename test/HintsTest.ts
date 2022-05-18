import { BirthMonth, ProprietaryInteger, RenderHintsEditType, RenderHintsTechnicalType } from "@nmshd/content"
import { expect } from "chai"
import { AbstractTest } from "./AbstractTest"

export class HintsTest extends AbstractTest {
    public run(): void {
        describe("ValueHints", function () {
            describe("Identity Attributes", function () {
                it("read from instance", function () {
                    const month = BirthMonth.fromAny({ value: 5 })

                    expect(month.valueHints.min).to.equal(1)
                    expect(month.valueHints.max).to.equal(12)

                    expect(month.valueHints.editHelp).to.match(/i18n.*/)
                })

                it("read static", function () {
                    expect(BirthMonth.valueHints.min).to.equal(1)
                    expect(BirthMonth.valueHints.max).to.equal(12)

                    expect(BirthMonth.valueHints.editHelp).to.match(/i18n.*/)
                })
            })

            describe("Proprietary Attrtibutes", function () {
                it("read from instance", function () {
                    const integer = ProprietaryInteger.from({ value: 5 })
                })

                it("override", function () {
                    const integer = ProprietaryInteger.from({ value: 5, valueHintsOverride: { min: 1, max: 2 } })

                    expect(integer.valueHints.min).to.equal(1)
                    expect(integer.valueHints.max).to.equal(2)
                })
            })
        })
    }
}
