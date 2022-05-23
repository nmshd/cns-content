import { ValueHints, ValueHintsJSON, ValueHintsValue } from "@nmshd/content"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"
import { expectThrows } from "../testUtils"

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

            it("deserializing a ValueHint with a defaultValue with the wrong type (object) fails", function () {
                expectThrows(
                    () =>
                        ValueHints.fromAny({
                            defaultValue: {}
                        }),
                    ".*Value is not an allowed type"
                )
            })

            it("deserializing a ValueHint with a defaultValue with the wrong type (array) fails", function () {
                expectThrows(
                    () =>
                        ValueHints.fromAny({
                            defaultValue: []
                        }),
                    ".*Value is not an allowed type"
                )
            })

            it("deserializing a ValueHintValue with a key with the wrong type (object) fails", function () {
                expectThrows(
                    () =>
                        ValueHintsValue.fromAny({
                            key: {},
                            displayName: "aDisplayName"
                        }),
                    ".*Value is not an allowed type"
                )
            })

            it("deserializing a ValueHintValue with a key with the wrong type (array) fails", function () {
                expectThrows(
                    () =>
                        ValueHintsValue.fromAny({
                            key: [],
                            displayName: "aDisplayName"
                        }),
                    ".*Value is not an allowed type"
                )
            })
        })
    }
}
