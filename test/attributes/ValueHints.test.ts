import { ValueHints, ValueHintsJSON } from "@nmshd/content"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"

export class ValueHintsTest extends AbstractTest {
    public run(): void {
        describe("ValueHints", function () {
            it("serialize and deserialize filled ValueHints", function () {
                const valueHintsJSON: ValueHintsJSON = {
                    "@type": "ValueHints",
                    editHelp: "This is a help",
                    min: 0,
                    max: 1000,
                    pattern: "/abc/i",
                    values: [
                        {
                            key: 0,
                            displayName: "Min"
                        },
                        {
                            key: 1000,
                            displayName: "Max"
                        }
                    ],
                    defaultValue: 5
                }
                const valueHints = ValueHints.from(valueHintsJSON)
                expect(valueHints).instanceOf(ValueHints)
                expect(valueHints.toJSON()).to.deep.equal(valueHintsJSON)
            })

            it("serialize and deserialize filled ValueHints (int)", function () {
                const valueHintsJSON: ValueHintsJSON = {
                    "@type": "ValueHints",
                    editHelp: "This is a help",
                    min: 0,
                    max: 1000,
                    pattern: "/abc/i",
                    values: [
                        {
                            key: 0,
                            displayName: "Min"
                        },
                        {
                            key: 1000,
                            displayName: "Max"
                        }
                    ],
                    defaultValue: 5
                }
                const valueHints = ValueHints.from(valueHintsJSON)
                expect(valueHints).instanceOf(ValueHints)
                expect(valueHints.toJSON()).to.deep.equal(valueHintsJSON)
            })
        })
    }
}
