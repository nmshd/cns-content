import {
    ErrorContentJSON,
    IResponse,
    IResponseItem,
    IResponseItemGroup,
    RejectContentJSON,
    Response,
    ResponseItem,
    ResponseItemGroup,
    ResponseItemGroupJSON,
    ResponseItemJSON,
    ResponseItemStatus,
    ResponseJSON
} from "@nmshd/content"
import { CoreId } from "@nmshd/transport"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"
import { expectThrowsAsync } from "../testUtils"

export class ResponseTest extends AbstractTest {
    public run(): void {
        describe("Response", function () {
            it("creates a Response and items from JSON", async function () {
                const responseJSON = {
                    "@type": "Response",
                    requestId: "CNSREQ1",
                    items: [
                        {
                            "@type": "ResponseItem",
                            status: ResponseItemStatus.Accepted
                        } as ResponseItemJSON,
                        {
                            "@type": "ResponseItemGroup",
                            items: [
                                {
                                    "@type": "ResponseItem",
                                    status: ResponseItemStatus.Accepted
                                } as ResponseItemJSON
                            ]
                        } as ResponseItemGroupJSON
                    ]
                } as ResponseJSON

                const response = await Response.from(responseJSON)

                expect(response).to.be.instanceOf(Response)
                expect(response.items).to.have.lengthOf(2)

                const outerResponseItem = response.items[0] as ResponseItem
                const responseItemGroup = response.items[1] as ResponseItemGroup
                expect(outerResponseItem).to.be.instanceOf(ResponseItem)
                expect(responseItemGroup).to.be.instanceOf(ResponseItemGroup)

                expect(responseItemGroup.items).to.have.lengthOf(1)
            })

            it("creates a Response and items from interface object", async function () {
                const responseInterface = {
                    "@type": "Response",
                    requestId: await CoreId.generate(),
                    items: [
                        {
                            "@type": "ResponseItem",
                            status: ResponseItemStatus.Accepted
                        } as IResponseItem,
                        {
                            "@type": "ResponseItemGroup",
                            items: [
                                {
                                    "@type": "ResponseItem",
                                    status: ResponseItemStatus.Accepted
                                } as IResponseItem
                            ]
                        } as IResponseItemGroup
                    ]
                } as IResponse

                const response = await Response.from(responseInterface)

                expect(response).to.be.instanceOf(Response)
                expect(response.items).to.have.lengthOf(2)

                const outerResponseItem = response.items[0] as ResponseItem
                const responseItemGroup = response.items[1] as ResponseItemGroup
                expect(outerResponseItem).to.be.instanceOf(ResponseItem)
                expect(responseItemGroup).to.be.instanceOf(ResponseItemGroup)

                expect(responseItemGroup.items).to.have.lengthOf(1)
            })

            it("keeps all properties during serialization and deserialization", async function () {
                const responseJSON = {
                    "@type": "Response",
                    requestId: "CNSREQ1",
                    items: [
                        {
                            "@type": "ResponseItem",
                            status: ResponseItemStatus.Rejected,
                            content: {
                                "@type": "RejectContent",
                                code: "SOME_REJECTION_CODE",
                                message: "Some rejection message"
                            } as RejectContentJSON,
                            metadata: {
                                aMetadataKey: "outer item - metadata value"
                            }
                        } as ResponseItemJSON,
                        {
                            "@type": "ResponseItemGroup",
                            metadata: {
                                aMetadataKey: "item group - metadata value"
                            },
                            items: [
                                {
                                    "@type": "ResponseItem",
                                    status: ResponseItemStatus.Failed,
                                    content: {
                                        "@type": "ErrorContent",
                                        code: "SOME_ERROR_CODE",
                                        message: "Some error message"
                                    } as ErrorContentJSON,
                                    metadata: {
                                        aMetadataKey: "inner item - metadata value"
                                    }
                                } as ResponseItemJSON
                            ]
                        } as ResponseItemGroupJSON
                    ]
                } as ResponseJSON

                const response = await Response.from(responseJSON)

                const serializedRequest = response.toJSON()

                expect(serializedRequest).to.deep.equal(responseJSON)
            })

            it("must have at least one item", async function () {
                const responseJSON = {
                    "@type": "Response",
                    requestId: "CNSREQ1",
                    items: []
                } as ResponseJSON

                await expectThrowsAsync(
                    async () => await Response.from(responseJSON),
                    "*Response.items*may not be empty*"
                )
            })

            it("groups must have at least one item", async function () {
                const responseJSON = {
                    "@type": "Response",
                    requestId: "CNSREQ1",
                    items: [
                        {
                            "@type": "ResponseItemGroup",
                            items: []
                        } as ResponseItemGroupJSON
                    ]
                } as ResponseJSON

                await expectThrowsAsync(
                    async () => await Response.from(responseJSON),
                    "*ResponseItemGroup.items*may not be empty*"
                )
            })

            describe("Throws an error when a mandatory property is missing", function () {
                it("throws on missing requestId", async function () {
                    const responseJSON = {
                        "@type": "Response",
                        items: [
                            {
                                "@type": "ResponseItem",
                                status: ResponseItemStatus.Accepted
                            } as ResponseItemJSON
                        ]
                    } as ResponseJSON

                    await expectThrowsAsync(
                        async () => await Response.from(responseJSON),
                        "*Response.requestId*Value is not defined*"
                    )
                })

                it("throws on missing response item status", async function () {
                    const responseJSON = {
                        "@type": "Response",
                        requestId: "CNSREQ1",
                        items: [
                            {
                                "@type": "ResponseItem"
                            } as ResponseItemJSON
                        ]
                    } as ResponseJSON

                    await expectThrowsAsync(
                        async () => await Response.from(responseJSON),
                        "*ResponseItem.status*Value is not defined*"
                    )
                })

                it("throws on missing error response content properties", async function () {
                    const jsonWithMissingErrorCode = {
                        "@type": "Response",
                        requestId: "CNSREQ1",
                        items: [
                            {
                                "@type": "ResponseItem",
                                status: ResponseItemStatus.Failed,
                                content: {
                                    "@type": "ErrorContent",
                                    message: "Some error message"
                                } as ErrorContentJSON
                            } as ResponseItemJSON
                        ]
                    } as ResponseJSON

                    await expectThrowsAsync(
                        async () => await Response.from(jsonWithMissingErrorCode),
                        "*ErrorContent.code*Value is not defined*"
                    )
                })

                it("error response content message is mandatory", async function () {
                    const jsonWithMissingErrorCode = {
                        "@type": "Response",
                        requestId: "CNSREQ1",
                        items: [
                            {
                                "@type": "ResponseItem",
                                status: ResponseItemStatus.Failed,
                                content: {
                                    "@type": "ErrorContent",
                                    code: "SOME_ERROR_CODE"
                                } as ErrorContentJSON
                            } as ResponseItemJSON
                        ]
                    } as ResponseJSON

                    await expectThrowsAsync(
                        async () => await Response.from(jsonWithMissingErrorCode),
                        "*ErrorContent.message*Value is not defined*"
                    )
                })
            })
        })
    }
}
