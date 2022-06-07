import { expect } from "chai"
import {
    IRelationshipAttributeCreationHints,
    RelationshipAttributeConfidentiality,
    RelationshipAttributeCreationHints,
    RelationshipAttributeCreationHintsJSON
} from "src/attributes"
import { AbstractTest } from "../AbstractTest"

export class RelationshipAttributeHintsTest extends AbstractTest {
    public run(): void {
        describe("RelationshipAttributeHints", function () {
            it("create from interface", function () {
                const relationshipAttributeHintInterface: IRelationshipAttributeCreationHints = {
                    title: "ATitle",
                    confidentiality: RelationshipAttributeConfidentiality.Public
                }
                const relationshipAttributeHint = RelationshipAttributeCreationHints.from(
                    relationshipAttributeHintInterface
                )
                expect(relationshipAttributeHint.toJSON()).to.contain({ isTechnical: false })
            })
            it("create from JSON", function () {
                const relationshipAttributeHintJSON: RelationshipAttributeCreationHintsJSON = {
                    title: "ATitle",
                    confidentiality: RelationshipAttributeConfidentiality.Public
                }
                const relationshipAttributeHint = RelationshipAttributeCreationHints.from(relationshipAttributeHintJSON)
                expect(relationshipAttributeHint.toJSON()).to.contain({ isTechnical: false })
            })
        })
    }
}
