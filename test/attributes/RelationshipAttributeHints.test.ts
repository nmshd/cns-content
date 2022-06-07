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
        describe.only("RelationshipAttributeHints", function () {
            it("create from interface", function () {
                const relationshipAttributeHintInterface: IRelationshipAttributeCreationHints = {
                    title: "ATitle",
                    confidentiality: RelationshipAttributeConfidentiality.Public
                }
                const relationshipAttributeHint = RelationshipAttributeCreationHints.from(
                    relationshipAttributeHintInterface
                )
                expect(relationshipAttributeHint).to.equal(relationshipAttributeHintInterface)
            })
            it("create from JSON", function () {
                const relationshipAttributeHintJSON: RelationshipAttributeCreationHintsJSON = {
                    title: "ATitle",
                    confidentiality: RelationshipAttributeConfidentiality.Public
                }
                const relationshipAttributeHint = RelationshipAttributeCreationHints.from(relationshipAttributeHintJSON)
                expect(relationshipAttributeHint).to.equal(relationshipAttributeHintJSON)
            })
        })
    }
}
