import { type } from "@js-soft/ts-serval"
import {
    CreateAttributeAcceptResponseItem,
    CreateAttributeAcceptResponseItemJSON,
    ICreateAttributeAcceptResponseItem,
    IProposeAttributeAcceptResponseItem,
    IReadAttributeAcceptResponseItem,
    ProposeAttributeAcceptResponseItem,
    ProposeAttributeAcceptResponseItemJSON,
    ReadAttributeAcceptResponseItem,
    ReadAttributeAcceptResponseItemJSON
} from "../items"
import { IResponseItem, ResponseItem, ResponseItemJSON } from "./ResponseItem"
import { ResponseItemResult } from "./ResponseItemResult"

export interface AcceptResponseItemJSON extends ResponseItemJSON {
    result: ResponseItemResult.Accepted
}

export type AcceptResponseItemJSONDerivations =
    | AcceptResponseItemJSON
    | CreateAttributeAcceptResponseItemJSON
    | ProposeAttributeAcceptResponseItemJSON
    | ReadAttributeAcceptResponseItemJSON

export interface IAcceptResponseItem extends IResponseItem {
    result: ResponseItemResult.Accepted
}

export type IAcceptResponseItemDerivations =
    | IAcceptResponseItem
    | ICreateAttributeAcceptResponseItem
    | IProposeAttributeAcceptResponseItem
    | IReadAttributeAcceptResponseItem

@type("AcceptResponseItem")
export class AcceptResponseItem extends ResponseItem implements IAcceptResponseItem {
    public override result: ResponseItemResult.Accepted

    public static from(value: IAcceptResponseItem | AcceptResponseItemJSON): AcceptResponseItem {
        return this.fromAny(value)
    }
}

export type AcceptResponseItemDerivations =
    | AcceptResponseItem
    | CreateAttributeAcceptResponseItem
    | ProposeAttributeAcceptResponseItem
    | ReadAttributeAcceptResponseItem
