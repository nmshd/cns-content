import { AttributeQuery } from "@nmshd/content"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"

export class AttributeQueryTest extends AbstractTest {
    public run(): void {
        describe("AttributeQuery", function () {
            it("should allow to create a new query", function () {
                const attributeQuery = AttributeQuery.from({
                    attributeType: "StreetAddress",
                    tags: ["Delivery"],
                    onlyValid: true
                })
                expect(attributeQuery).to.be.instanceOf(AttributeQuery)

                const attributeQueryType = AttributeQuery.from({
                    attributeType: "StreetAddress",
                    onlyValid: true
                })
                expect(attributeQueryType).to.be.instanceOf(AttributeQuery)

                const attributeQueryTags = AttributeQuery.from({
                    tags: ["Delivery"],
                    onlyValid: false
                })
                expect(attributeQueryTags).to.be.instanceOf(AttributeQuery)
            })

            it("should validate that attributeType might not be an empty string", function () {
                expect(() =>
                    AttributeQuery.from({
                        attributeType: "",
                        onlyValid: false
                    })
                ).to.throw("AttributeQuery.attributeType:String :: must not be an empty string")
            })
        })
    }
}
