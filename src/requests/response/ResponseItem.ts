import { ISerializable, Serializable, serialize, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"
import { ResponseItemResult } from "./ResponseItemResult"

export interface ResponseItemJSON extends ContentJSON {
    result: ResponseItemResult
}

export interface IResponseItem extends ISerializable {
    result: ResponseItemResult
}

export abstract class ResponseItem extends Serializable {
    @serialize()
    @validate()
    public result: ResponseItemResult
}
