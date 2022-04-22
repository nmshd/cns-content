import { serialize, type, validate } from "@js-soft/ts-serval"
import { IResponseItem, ResponseItem, ResponseItemJSON } from "./ResponseItem"
import { ResponseItemResult } from "./ResponseItemResult"

export interface ErrorResponseItemJSON extends ResponseItemJSON {
    result: ResponseItemResult.Failed
    code: string
    message: string
}

export interface IErrorResponseItem extends IResponseItem {
    result: ResponseItemResult.Failed
    code: string
    message: string
}

@type("ErrorResponseItem")
export class ErrorResponseItem extends ResponseItem implements IErrorResponseItem {
    public result: ResponseItemResult.Failed

    @serialize()
    @validate()
    public code: string

    @serialize()
    @validate()
    public message: string

    public static from(value: IErrorResponseItem | ErrorResponseItemJSON): ErrorResponseItem {
        return this.fromAny(value)
    }
}
