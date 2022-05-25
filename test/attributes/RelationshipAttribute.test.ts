import {
    BirthDate,
    BirthDay,
    BirthMonth,
    BirthYear,
    RelationshipAttribute,
    RelationshipAttributeConfidentiality
} from "@nmshd/content"
import { CoreAddress } from "@nmshd/transport"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"

export class RelationshipAttributeTest extends AbstractTest {
    public run(): void {
        describe("RelationshipAttribute", function () {
            const birthDate = BirthDate.from({
                day: { value: 22 },
                month: { value: 2 },
                year: { value: 2022 }
            })

            const birthDateContentSerialized = {
                "@type": "BirthDate",
                day: 22,
                month: 2,
                year: 2022
            }

            function expectValidRelationshipAttribute(value: any): void {
                expect(value).to.be.instanceOf(RelationshipAttribute)
                expect(value.value).to.be.instanceOf(BirthDate)

                if (value.value instanceof BirthDate) {
                    expect(value.value.toJSON()).to.deep.equal(birthDateContentSerialized)
                    expect(value.value.day).to.be.instanceOf(BirthDay)
                    expect(value.value.month).to.be.instanceOf(BirthMonth)
                    expect(value.value.year).to.be.instanceOf(BirthYear)
                }
            }

            it("should create a RelationshipAttribute (isTechnical: true)", function () {
                const attribute = RelationshipAttribute.from({
                    key: "aKey",
                    value: birthDate,
                    owner: CoreAddress.from("address"),
                    isTechnical: true,
                    confidentiality: RelationshipAttributeConfidentiality.Public
                })

                expectValidRelationshipAttribute(attribute)
            })

            it("should create a RelationshipAttribute (isTechnical: false)", function () {
                const attribute = RelationshipAttribute.from({
                    key: "aKey",
                    value: birthDate,
                    owner: CoreAddress.from("address"),
                    isTechnical: false,
                    confidentiality: RelationshipAttributeConfidentiality.Public
                })

                expectValidRelationshipAttribute(attribute)
            })

            it("should create a RelationshipAttribute (isTechnical: undefined)", function () {
                const attribute = RelationshipAttribute.from({
                    key: "aKey",
                    value: birthDate,
                    owner: CoreAddress.from("address"),
                    confidentiality: RelationshipAttributeConfidentiality.Public
                })

                expectValidRelationshipAttribute(attribute)
            })
        })
    }
}
