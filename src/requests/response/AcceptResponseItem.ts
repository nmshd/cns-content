import { SerializableAsync, type } from "@js-soft/ts-serval"
import { IResponseItem, ResponseItemJSON } from "./ResponseItem"
import { ResponseItemResult } from "./ResponseItemResult"

export interface AcceptResponseItemJSON extends ResponseItemJSON {
    result: ResponseItemResult.Accepted
}

export interface IAcceptResponseItem extends IResponseItem {
    result: ResponseItemResult.Accepted
}

@type("AcceptResponseItem")
export abstract class AcceptResponseItem extends SerializableAsync implements IAcceptResponseItem {
    public result: ResponseItemResult.Accepted
}
