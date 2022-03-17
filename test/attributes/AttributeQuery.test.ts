import { AttributeQuery, AttributeQueryContainer } from "@nmshd/content"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"

export class AttributeQueryTest extends AbstractTest {
    public run(): void {
        describe("AttributeQuery", function () {
            it("should allow to create a new query", function () {
                const attributeQuery = AttributeQuery.from({
                    attributeType: "StreetAddress",
                    tags: ["Delivery"]
                })
                expect(attributeQuery).to.be.instanceOf(AttributeQuery)

                const attributeQueryType = AttributeQuery.from({
                    attributeType: "StreetAddress"
                })
                expect(attributeQueryType).to.be.instanceOf(AttributeQuery)

                const attributeQueryTags = AttributeQuery.from({
                    tags: ["Delivery"]
                })
                expect(attributeQueryTags).to.be.instanceOf(AttributeQuery)
            })

            it("should validate that attributeType might not be an empty string", function () {
                expect(() =>
                    AttributeQuery.from({
                        attributeType: ""
                    })
                ).to.throw("AttributeQuery.attributeType:String :: must not be an empty string")
            })

            it("should allow to create a query container", function () {
                const attributeQueryContainer = AttributeQueryContainer.from({
                    query: {
                        attributeType: "StreetAddress",
                        tags: ["Delivery"]
                    },
                    filterValid: true,
                    userText: "I require your delivery address."
                })
                expect(attributeQueryContainer).to.be.instanceOf(AttributeQueryContainer)
            })
        })
    }
}
