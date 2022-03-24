import { serialize, type, validate } from "@js-soft/ts-serval"
import {
    AcceptResponseItem,
    AcceptResponseItemJSON,
    ErrorResponseItemJSON,
    IResponse,
    IResponseItem,
    IResponseItemGroup,
    RejectResponseItemJSON,
    Response,
    ResponseItem,
    ResponseItemGroup,
    ResponseItemGroupJSON,
    ResponseItemJSON,
    ResponseItemResult,
    ResponseJSON
} from "@nmshd/content"
import { CoreId } from "@nmshd/transport"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"
import { expectThrowsAsync } from "../testUtils"

@type("TestAcceptResponseItem")
class TestAcceptResponseItem extends AcceptResponseItem {
    @serialize()
    @validate()
    public test: string
}

export class ResponseTest extends AbstractTest {
    public run(): void {
        describe("Response", function () {
            it("creates a Response and items from JSON", async function () {
                const responseJSON = {
                    "@type": "Response",
                    requestId: "CNSREQ1",
                    items: [
                        {
                            "@type": "AcceptResponseItem",
                            result: ResponseItemResult.Accepted
                        } as ResponseItemJSON,
                        {
                            "@type": "ResponseItemGroup",
                            items: [
                                {
                                    "@type": "AcceptResponseItem",
                                    result: ResponseItemResult.Accepted
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
                expect(outerResponseItem).to.be.instanceOf(AcceptResponseItem)
                expect(responseItemGroup).to.be.instanceOf(ResponseItemGroup)

                expect(responseItemGroup.items).to.have.lengthOf(1)
            })

            it("creates a Response and items from interface object", async function () {
                const responseInterface = {
                    "@type": "Response",
                    requestId: await CoreId.generate(),
                    items: [
                        {
                            "@type": "AcceptResponseItem",
                            result: ResponseItemResult.Accepted
                        } as IResponseItem,
                        {
                            "@type": "ResponseItemGroup",
                            items: [
                                {
                                    "@type": "AcceptResponseItem",
                                    result: ResponseItemResult.Accepted
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
                expect(outerResponseItem).to.be.instanceOf(AcceptResponseItem)
                expect(responseItemGroup).to.be.instanceOf(ResponseItemGroup)

                expect(responseItemGroup.items).to.have.lengthOf(1)
            })

            it("keeps all properties during serialization and deserialization", async function () {
                const responseJSON = {
                    "@type": "Response",
                    requestId: "CNSREQ1",
                    items: [
                        {
                            "@type": "RejectResponseItem",
                            result: ResponseItemResult.Rejected,
                            code: "SOME_REJECTION_CODE",
                            message: "Some rejection message",
                            metadata: {
                                aMetadataKey: "outer item - metadata value"
                            }
                        } as RejectResponseItemJSON,
                        {
                            "@type": "ResponseItemGroup",
                            metadata: {
                                aMetadataKey: "item group - metadata value"
                            },
                            items: [
                                {
                                    "@type": "ErrorResponseItem",
                                    result: ResponseItemResult.Failed,
                                    code: "SOME_ERROR_CODE",
                                    message: "Some error message",
                                    metadata: {
                                        aMetadataKey: "inner item - metadata value"
                                    }
                                } as ErrorResponseItemJSON
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

            it("allows an inherited AcceptResponseItem in the items", async function () {
                const responseJSON = {
                    "@type": "Response",
                    requestId: "CNSREQ1",
                    items: [
                        {
                            "@type": "TestAcceptResponseItem",
                            result: ResponseItemResult.Accepted,
                            test: "test"
                        } as ResponseItemJSON
                    ]
                } as ResponseJSON

                const response = await Response.from(responseJSON)

                expect(response).to.be.instanceOf(Response)
                expect(response.items).to.have.lengthOf(1)

                const responseItem = response.items[0] as ResponseItem
                expect(responseItem).to.be.instanceOf(ResponseItem)
                expect(responseItem).to.be.instanceOf(AcceptResponseItem)
                expect(responseItem).to.be.instanceOf(TestAcceptResponseItem)

                expect((responseItem as any).test).to.equal("test")
            })

            describe("Throws an error when a mandatory property is missing", function () {
                it("throws on missing requestId", async function () {
                    const responseJSON = {
                        "@type": "Response",
                        items: [
                            {
                                "@type": "AcceptResponseItem",
                                result: ResponseItemResult.Accepted
                            } as AcceptResponseItemJSON
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
                                "@type": "AcceptResponseItem"
                            } as ResponseItemJSON
                        ]
                    } as ResponseJSON

                    await expectThrowsAsync(
                        async () => await Response.from(responseJSON),
                        "*ResponseItem.result*Value is not defined*"
                    )
                })

                it("throws on missing error response content properties", async function () {
                    const jsonWithMissingErrorCode = {
                        "@type": "Response",
                        requestId: "CNSREQ1",
                        items: [
                            {
                                "@type": "ErrorResponseItem",
                                result: ResponseItemResult.Failed,
                                message: "Some error message"
                            } as ErrorResponseItemJSON
                        ]
                    } as ResponseJSON

                    await expectThrowsAsync(
                        async () => await Response.from(jsonWithMissingErrorCode),
                        "*ErrorResponseItem.code*Value is not defined*"
                    )
                })

                it("error response content message is mandatory", async function () {
                    const jsonWithMissingErrorCode: ResponseJSON = {
                        "@type": "Response",
                        requestId: "CNSREQ1",
                        items: [
                            {
                                "@type": "ErrorResponseItem",
                                result: ResponseItemResult.Failed,
                                code: "SOME_ERROR_CODE"
                            } as ErrorResponseItemJSON
                        ]
                    }

                    await expectThrowsAsync(
                        async () => await Response.from(jsonWithMissingErrorCode),
                        "*ErrorResponseItem.message*Value is not defined*"
                    )
                })
            })
        })
    }
}
