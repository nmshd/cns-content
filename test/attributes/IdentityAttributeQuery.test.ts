import { IdentityAttributeQuery } from "@nmshd/content"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"

export class IdentityAttributeQueryTest extends AbstractTest {
    public run(): void {
        describe("IdentityAttributeQuery", function () {
            it("should allow to create a new query", function () {
                const attributeQuery = IdentityAttributeQuery.from({
                    valueType: "StreetAddress",
                    tags: ["Delivery"]
                })
                expect(attributeQuery).to.be.instanceOf(IdentityAttributeQuery)

                const attributeQueryType = IdentityAttributeQuery.from({
                    valueType: "StreetAddress"
                })
                expect(attributeQueryType).to.be.instanceOf(IdentityAttributeQuery)

                const attributeQueryTags = IdentityAttributeQuery.from({
                    valueType: "StreetAddress",
                    tags: ["Delivery"]
                })
                expect(attributeQueryTags).to.be.instanceOf(IdentityAttributeQuery)
            })

            it("should validate that valueType might not be an empty string", function () {
                expect(() =>
                    IdentityAttributeQuery.from({
                        valueType: ""
                    })
                ).to.throw("IdentityAttributeQuery.valueType:String :: must not be an empty string")
            })
        })
    }
}
