import { StreetAddress } from "@nmshd/content"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"

export class RenderHintsTest extends AbstractTest {
    public run(): void {
        describe("RenderHints", function () {
            it("returns subHints in case of complex attributes", function () {
                const renderHints = StreetAddress.renderHints

                expect(renderHints.subHints).to.have.lengthOf(6)
            })
        })
    }
}
