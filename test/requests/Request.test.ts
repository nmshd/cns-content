import { SerializableAsync } from "@js-soft/ts-serval"
import {
    IRequestItemGroupV2,
    IRequestItemV2,
    IRequestV2,
    RequestItemGroupV2,
    RequestItemGroupV2JSON,
    RequestItemV2,
    RequestItemV2JSON,
    RequestV2,
    RequestV2JSON
} from "@nmshd/content"
import { CoreDate, CoreId } from "@nmshd/transport"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"
import { expectThrowsAsync } from "../testUtils"

export class RequestTest extends AbstractTest {
    public run(): void {
        describe("RequestV2", function () {
            it("creates a Request and items from JSON", async function () {
                const requestJSON = {
                    "@type": "RequestV2",
                    "@version": "2",
                    items: [
                        {
                            "@type": "RequestItem",
                            mustBeAccepted: true
                        } as RequestItemV2JSON,
                        {
                            "@type": "RequestItemGroup",
                            mustBeAccepted: true,
                            items: [
                                {
                                    "@type": "RequestItem",
                                    mustBeAccepted: true
                                } as RequestItemV2JSON
                            ]
                        } as RequestItemGroupV2JSON
                    ]
                } as RequestV2JSON

                const request = await RequestV2.from(requestJSON)

                expect(request).to.be.instanceOf(RequestV2)
                expect(request.items).to.have.lengthOf(2)

                const outerRequestItem = request.items[0] as RequestItemV2
                const requestItemGroup = request.items[1] as RequestItemGroupV2
                expect(outerRequestItem).to.be.instanceOf(RequestItemV2)
                expect(requestItemGroup).to.be.instanceOf(RequestItemGroupV2)

                expect(requestItemGroup.items).to.have.lengthOf(1)
            })

            it("creates a Request and items from serval interface", async function () {
                const requestInterface = {
                    "@type": "RequestV2",
                    id: await CoreId.generate(),
                    items: [
                        {
                            "@type": "RequestItem",
                            expiresAt: CoreDate.utc(),
                            mustBeAccepted: true
                        } as IRequestItemV2,
                        {
                            "@type": "RequestItemGroup",
                            mustBeAccepted: true,
                            items: [
                                {
                                    "@type": "RequestItem",
                                    mustBeAccepted: true
                                } as IRequestItemV2
                            ]
                        } as IRequestItemGroupV2
                    ]
                } as IRequestV2

                // const requestv2 = (await SerializableAsync.fromUnknown(requestInterface)) as RequestV2
                const request = await RequestV2.from(requestInterface)

                expect(request).to.be.instanceOf(RequestV2)
                expect(request.items).to.have.lengthOf(2)

                const outerRequestItem = request.items[0] as RequestItemV2
                const requestItemGroup = request.items[1] as RequestItemGroupV2
                expect(outerRequestItem).to.be.instanceOf(RequestItemV2)
                expect(requestItemGroup).to.be.instanceOf(RequestItemGroupV2)

                expect(requestItemGroup.items).to.have.lengthOf(1)
            })

            it("keeps all properties during serialization and deserialization", async function () {
                const requestJSON = {
                    "@type": "RequestV2",
                    id: "CNSREQ1",
                    expiresAt: "2020-01-01T00:00:00.000Z",
                    items: [
                        {
                            "@type": "RequestItem",
                            mustBeAccepted: true,
                            title: "outer item - title",
                            description: "outer item - description",
                            responseMetadata: {
                                aMetadataKey: "outer item - metadata value"
                            }
                        } as RequestItemV2JSON,
                        {
                            "@type": "RequestItemGroup",
                            mustBeAccepted: true,
                            title: "item group - title",
                            description: "item group - description",
                            responseMetadata: {
                                aMetadataKey: "item group - metadata value"
                            },
                            items: [
                                {
                                    "@type": "RequestItem",
                                    mustBeAccepted: true,
                                    title: "inner item - title",
                                    description: "inner item - description",
                                    responseMetadata: {
                                        aMetadataKey: "inner item - metadata value"
                                    }
                                } as RequestItemV2JSON
                            ]
                        } as RequestItemGroupV2JSON
                    ]
                } as RequestV2JSON

                const request = await RequestV2.from(requestJSON)

                const serializedRequest = request.toJSON()

                expect(serializedRequest).to.deep.equal(requestJSON)
            })

            it("must have at least one item", async function () {
                const requestJSON = {
                    "@type": "RequestV2",
                    items: []
                } as RequestV2JSON

                await expectThrowsAsync(
                    async () => await RequestV2.from(requestJSON),
                    "*RequestV2.items*may not be empty"
                )
            })

            it("groups must have at least one item", async function () {
                const requestJSON = {
                    "@type": "RequestV2",
                    id: "CNSREQ1",
                    expiresAt: "2020-01-01T00:00:00.000Z",
                    items: [
                        {
                            "@type": "RequestItem",
                            mustBeAccepted: true
                        } as RequestItemV2JSON,
                        {
                            "@type": "RequestItemGroup",
                            mustBeAccepted: true,
                            items: []
                        } as RequestItemGroupV2JSON
                    ]
                } as RequestV2JSON

                await expectThrowsAsync(
                    async () => await RequestV2.from(requestJSON),
                    "*RequestItemGroupV2.items*may not be empty*"
                )
            })

            it("mustBeAccepted is mandatory", async function () {
                const requestJSON = {
                    "@type": "RequestV2",
                    items: [
                        {
                            "@type": "RequestItem"
                        }
                    ]
                } as RequestV2JSON

                await expectThrowsAsync(
                    async () => await SerializableAsync.from(requestJSON),
                    "RequestItemV2.mustBeAccepted*Value is not defined"
                )
            })
        })
    }
}
