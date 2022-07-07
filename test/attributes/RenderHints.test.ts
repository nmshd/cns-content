import { RenderHints, StreetAddress } from "@nmshd/content"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"

export class RenderHintsTest extends AbstractTest {
    public run(): void {
        describe("RenderHints", function () {
            it("returns subHints in case of complex attributes", function () {
                const renderHints = StreetAddress.renderHints

                expect(Object.keys(renderHints.subHints)).to.have.lengthOf(6)
            })

            it("correctly serializes complex renderHints", function () {
                const renderHintsJson = StreetAddress.renderHints.toJSON()
                const renderHints = RenderHints.from(renderHintsJson)

                expect(Object.keys(renderHints.subHints)).to.have.lengthOf(6)
                expect(renderHints.subHints.street).to.be.instanceOf(RenderHints)
            })
        })
    }
}
