import { ISerializable, Serializable, serialize, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"
import {
    AcceptResponseItemDerivations,
    AcceptResponseItemJSONDerivations,
    IAcceptResponseItemDerivations
} from "./AcceptResponseItem"
import {
    ErrorResponseItemDerivations,
    ErrorResponseItemJSONDerivations,
    IErrorResponseItemDerivations
} from "./ErrorResponseItem"
import {
    IRejectResponseItemDerivations,
    RejectResponseItemDerivations,
    RejectResponseItemJSONDerivations
} from "./RejectResponseItem"
import { ResponseItemResult } from "./ResponseItemResult"

export interface ResponseItemJSON extends ContentJSON {
    result: ResponseItemResult
}

export type ResponseItemJSONDerivations =
    | AcceptResponseItemJSONDerivations
    | RejectResponseItemJSONDerivations
    | ErrorResponseItemJSONDerivations

export interface IResponseItem extends ISerializable {
    result: ResponseItemResult
}

export type IResponseItemDerivations =
    | IAcceptResponseItemDerivations
    | IRejectResponseItemDerivations
    | IErrorResponseItemDerivations

export abstract class ResponseItem extends Serializable {
    @serialize()
    @validate()
    public result: ResponseItemResult
}

export type ResponseItemDerivations =
    | AcceptResponseItemDerivations
    | RejectResponseItemDerivations
    | ErrorResponseItemDerivations
