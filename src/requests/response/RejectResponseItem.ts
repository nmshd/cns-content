import { serialize, type, validate } from "@js-soft/ts-serval"
import { IResponseItem, ResponseItem, ResponseItemJSON } from "./ResponseItem"
import { ResponseItemResult } from "./ResponseItemResult"

export interface RejectResponseItemJSON extends ResponseItemJSON {
    result: ResponseItemResult.Rejected
    code?: string
    message?: string
}

export type RejectResponseItemJSONDerivations = RejectResponseItemJSON

export interface IRejectResponseItem extends IResponseItem {
    result: ResponseItemResult.Rejected
    code?: string
    message?: string
}

export type IRejectResponseItemDerivations = IRejectResponseItem

@type("RejectResponseItem")
export class RejectResponseItem extends ResponseItem implements IRejectResponseItem {
    public override result: ResponseItemResult.Rejected

    @serialize()
    @validate({ nullable: true })
    public code?: string

    @serialize()
    @validate({ nullable: true })
    public message?: string

    public static from(value: IRejectResponseItem | RejectResponseItemJSON): RejectResponseItem {
        return this.fromAny(value)
    }
}

export type RejectResponseItemDerivations = RejectResponseItem
