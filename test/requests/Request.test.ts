import { SerializableAsync } from "@js-soft/ts-serval"
import {
    IRequest,
    IRequestItem,
    IRequestItemGroup,
    Request,
    RequestItem,
    RequestItemGroup,
    RequestItemGroupJSON,
    RequestItemJSON,
    RequestJSON
} from "@nmshd/content"
import { CoreDate, CoreId } from "@nmshd/transport"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"
import { expectThrowsAsync } from "../testUtils"

export class RequestTest extends AbstractTest {
    public run(): void {
        describe("Request", function () {
            it("creates a Request and items from JSON", async function () {
                const requestJSON = {
                    "@type": "Request",
                    "@version": "2",
                    items: [
                        {
                            "@type": "RequestItem",
                            mustBeAccepted: true
                        } as RequestItemJSON,
                        {
                            "@type": "RequestItemGroup",
                            mustBeAccepted: true,
                            items: [
                                {
                                    "@type": "RequestItem",
                                    mustBeAccepted: true
                                } as RequestItemJSON
                            ]
                        } as RequestItemGroupJSON
                    ]
                } as RequestJSON

                const request = await Request.from(requestJSON)

                expect(request).to.be.instanceOf(Request)
                expect(request.items).to.have.lengthOf(2)

                const outerRequestItem = request.items[0] as RequestItem
                const requestItemGroup = request.items[1] as RequestItemGroup
                expect(outerRequestItem).to.be.instanceOf(RequestItem)
                expect(requestItemGroup).to.be.instanceOf(RequestItemGroup)

                expect(requestItemGroup.items).to.have.lengthOf(1)
            })

            it("creates a Request and items from serval interface", async function () {
                const requestInterface = {
                    "@type": "Request",
                    id: await CoreId.generate(),
                    items: [
                        {
                            "@type": "RequestItem",
                            expiresAt: CoreDate.utc(),
                            mustBeAccepted: true
                        } as IRequestItem,
                        {
                            "@type": "RequestItemGroup",
                            mustBeAccepted: true,
                            items: [
                                {
                                    "@type": "RequestItem",
                                    mustBeAccepted: true
                                } as IRequestItem
                            ]
                        } as IRequestItemGroup
                    ]
                } as IRequest

                // const request = (await SerializableAsync.fromUnknown(requestInterface)) as Request
                const request = await Request.from(requestInterface)

                expect(request).to.be.instanceOf(Request)
                expect(request.items).to.have.lengthOf(2)

                const outerRequestItem = request.items[0] as RequestItem
                const requestItemGroup = request.items[1] as RequestItemGroup
                expect(outerRequestItem).to.be.instanceOf(RequestItem)
                expect(requestItemGroup).to.be.instanceOf(RequestItemGroup)

                expect(requestItemGroup.items).to.have.lengthOf(1)
            })

            it("keeps all properties during serialization and deserialization", async function () {
                const requestJSON = {
                    "@type": "Request",
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
                        } as RequestItemJSON,
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
                                } as RequestItemJSON
                            ]
                        } as RequestItemGroupJSON
                    ]
                } as RequestJSON

                const request = await Request.from(requestJSON)

                const serializedRequest = request.toJSON()

                expect(serializedRequest).to.deep.equal(requestJSON)
            })

            it("must have at least one item", async function () {
                const requestJSON = {
                    "@type": "Request",
                    items: []
                } as RequestJSON

                await expectThrowsAsync(async () => await Request.from(requestJSON), "*Request.items*may not be empty")
            })

            it("groups must have at least one item", async function () {
                const requestJSON = {
                    "@type": "Request",
                    id: "CNSREQ1",
                    expiresAt: "2020-01-01T00:00:00.000Z",
                    items: [
                        {
                            "@type": "RequestItem",
                            mustBeAccepted: true
                        } as RequestItemJSON,
                        {
                            "@type": "RequestItemGroup",
                            mustBeAccepted: true,
                            items: []
                        } as RequestItemGroupJSON
                    ]
                } as RequestJSON

                await expectThrowsAsync(
                    async () => await Request.from(requestJSON),
                    "*RequestItemGroup.items*may not be empty*"
                )
            })

            it("mustBeAccepted is mandatory", async function () {
                const requestJSON = {
                    "@type": "Request",
                    items: [
                        {
                            "@type": "RequestItem"
                        }
                    ]
                } as RequestJSON

                await expectThrowsAsync(
                    async () => await SerializableAsync.from(requestJSON),
                    "RequestItem.mustBeAccepted*Value is not defined"
                )
            })
        })
    }
}
