import { ISerializable, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreId, ICoreId } from "@nmshd/transport"
import { ContentJSON } from "../../ContentJSON"

export enum ResponseItemStatus {
    Accepted = "Accepted",
    Rejected = "Rejected",
    Failed = "Error"
}

export interface ResponseJSON extends ContentJSON {
    requestId: string
    items: (ResponseItemGroupJSON | ResponseItemJSON)[]
}

export interface ResponseItemJSON extends ContentJSON {
    status: ResponseItemStatus
    content?: AcceptContentJSON | RejectContentJSON | ErrorContentJSON
    metadata?: object
}

export interface ResponseItemGroupJSON extends ContentJSON {
    items: ResponseItemJSON[]
    metadata?: object
}

export interface AcceptContentJSON extends ContentJSON {}

export interface RejectContentJSON extends ContentJSON {
    code?: string
    message?: string
}

export interface ErrorContentJSON extends ContentJSON {
    code: string
    message: string
}

export interface IResponse extends ISerializable {
    requestId: ICoreId
    items: (IResponseItemGroup | IResponseItem)[]
}

export interface IResponseItem extends ISerializable {
    status: ResponseItemStatus
    content?: IAcceptContent | IRejectContent | IErrorContent
    metadata?: object
}

export interface IAcceptContent extends ISerializable {}

export interface IRejectContent extends ISerializable {
    code?: string
    message?: string
}

export interface IErrorContent extends ISerializable {
    code: string
    message: string
}

export interface IResponseItemGroup extends ISerializable {
    items: IResponseItem[]
    metadata?: object
}

// **********************************************Classes********************************************************* //
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
