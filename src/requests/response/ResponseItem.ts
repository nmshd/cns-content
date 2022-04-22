import { ISerializable, Serializable, serialize, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"
import { ResponseItemResult } from "./ResponseItemResult"

export interface ResponseItemJSON extends ContentJSON {
    result: ResponseItemResult
    metadata?: object
}

export interface IResponseItem extends ISerializable {
    result: ResponseItemResult
    metadata?: object
}

export abstract class ResponseItem extends Serializable {
    @serialize()
    @validate()
    public result: ResponseItemResult

    @serialize()
    @validate({ nullable: true })
    public metadata?: object
}
