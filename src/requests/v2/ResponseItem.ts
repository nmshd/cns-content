import { ISerializable, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"
import { ResponseItemResult } from "./ResponseItemResult"

export interface AcceptContentJSON extends ContentJSON {}

export interface RejectContentJSON extends ContentJSON {
    code?: string
    message?: string
}

export interface ErrorContentJSON extends ContentJSON {
    code: string
    message: string
}

export interface ResponseItemJSON extends ContentJSON {
    result: ResponseItemResult
    content?: AcceptContentJSON | RejectContentJSON | ErrorContentJSON
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

export interface IResponseItem extends ISerializable {
    result: ResponseItemResult
    content?: IAcceptContent | IRejectContent | IErrorContent
    metadata?: object
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
    public result: ResponseItemResult

    @serialize({ unionTypes: [AcceptContent, RejectContent, ErrorContent] })
    @validate({ nullable: true })
    public content?: AcceptContent | RejectContent | ErrorContent

    @serialize()
    @validate({ nullable: true })
    public metadata?: object
}
