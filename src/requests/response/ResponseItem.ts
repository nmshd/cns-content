import { ISerializable, Serializable, serialize, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"
import {
    AcceptResponseItemDerivations,
    AcceptResponseItemJSONDerivations,
    IAcceptResponseItemDerivations
} from "./AcceptResponseItem"
import {
    IRejectResponseItemDerivations,
    RejectResponseItemDerivations,
    RejectResponseItemJSONDerivations
} from "./RejectResponseItem"
import { ResponseItemResult } from "./ResponseItemResult"

export interface ResponseItemJSON extends ContentJSON {
    result: ResponseItemResult
}

export type ResponseItemJSONDerivations = AcceptResponseItemJSONDerivations | RejectResponseItemJSONDerivations

export interface IResponseItem extends ISerializable {
    result: ResponseItemResult
}

export type IResponseItemDerivations = IAcceptResponseItemDerivations | IRejectResponseItemDerivations

export abstract class ResponseItem extends Serializable {
    @serialize()
    @validate()
    public result: ResponseItemResult
}

export type ResponseItemDerivations = AcceptResponseItemDerivations | RejectResponseItemDerivations
