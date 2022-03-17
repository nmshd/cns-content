import { ISerializable, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"
import { ResponseItemResult } from "./ResponseItemResult"

export interface ResponseItemAcceptContentJSON extends ContentJSON {}

export interface ResponseItemRejectContentJSON extends ContentJSON {
    code?: string
    message?: string
}

export interface ResponseItemErrorContentJSON extends ContentJSON {
    code: string
    message: string
}

export interface ResponseItemJSON extends ContentJSON {
    result: ResponseItemResult
    content?: ResponseItemAcceptContentJSON | ResponseItemRejectContentJSON | ResponseItemErrorContentJSON
    metadata?: object
}

export interface IResponseItemAcceptContent extends ISerializable {}

export interface IResponseItemRejectContent extends ISerializable {
    code?: string
    message?: string
}

export interface IResponseItemErrorContent extends ISerializable {
    code: string
    message: string
}

export interface IResponseItem extends ISerializable {
    result: ResponseItemResult
    content?: IResponseItemAcceptContent | IResponseItemRejectContent | IResponseItemErrorContent
    metadata?: object
}

@type("ResponseItemAcceptContent")
export abstract class ResponseItemAcceptContent extends SerializableAsync {}

@type("ResponseItemRejectContent")
export class ResponseItemRejectContent extends SerializableAsync {
    @serialize()
    @validate()
    public code?: string

    @serialize()
    @validate()
    public message?: string
}

@type("ResponseItemErrorContent")
export class ResponseItemErrorContent extends SerializableAsync {
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
    public result: ResponseItemResult

    @serialize({ unionTypes: [ResponseItemAcceptContent, ResponseItemRejectContent, ResponseItemErrorContent] })
    @validate({ nullable: true })
    public content?: ResponseItemAcceptContent | ResponseItemRejectContent | ResponseItemErrorContent

    @serialize()
    @validate({ nullable: true })
    public metadata?: object
}
