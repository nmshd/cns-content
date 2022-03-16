import { SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreId } from "@nmshd/transport"
import { IResponse } from "./IResponse"
import { ResponseItemStatus } from "./ResponseItemStatus"
import { ResponseJSON } from "./ResponseJSON"

@type("Response")
export class Response extends SerializableAsync {
    @serialize()
    @validate()
    public requestId: CoreId

    @serialize()
    @validate({ customValidator: (v) => (v.length < 1 ? "may not be empty" : undefined) })
    public items: (ResponseItemGroup | ResponseItem)[]

    public static async from(value: IResponse | ResponseJSON): Promise<Response> {
        return await SerializableAsync.fromT<Response>(value, Response)
    }
}

@type("AcceptContent")
export class AcceptContent extends SerializableAsync {}

@type("RejectContent")
export class RejectContent extends SerializableAsync {
    @serialize()
    @validate()
    public code?: string

    @serialize()
    @validate()
    public message?: string
}

@type("ErrorContent")
export class ErrorContent extends SerializableAsync {
    @serialize()
    @validate()
    public code: string

    @serialize()
    @validate()
    public message: string
}

@type("ResponseItem")
export class ResponseItem extends SerializableAsync {
    @serialize()
    @validate()
    public status: ResponseItemStatus

    @serialize({ unionTypes: [AcceptContent, RejectContent, ErrorContent] })
    @validate({ nullable: true })
    public content?: AcceptContent | RejectContent | ErrorContent

    @serialize()
    @validate({ nullable: true })
    public metadata?: object
}

@type("ResponseItemGroup")
export class ResponseItemGroup extends SerializableAsync {
    @serialize()
    @validate({ customValidator: (v) => (v.length < 1 ? "may not be empty" : undefined) })
    public items: ResponseItem[]

    @serialize()
    @validate({ nullable: true })
    public metadata?: object
}
