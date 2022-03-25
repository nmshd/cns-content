import { serialize, type, validate } from "@js-soft/ts-serval"
import { IResponseItem, ResponseItem, ResponseItemJSON } from "./ResponseItem"
import { ResponseItemResult } from "./ResponseItemResult"

export interface RejectResponseItemJSON extends ResponseItemJSON {
    result: ResponseItemResult.Rejected
    code?: string
    message?: string
}

export interface IRejectResponseItem extends IResponseItem {
    result: ResponseItemResult.Rejected
    code?: string
    message?: string
}

@type("RejectResponseItem")
export class RejectResponseItem extends ResponseItem implements IRejectResponseItem {
    public result: ResponseItemResult.Rejected

    @serialize()
    @validate({ nullable: true })
    public code?: string

    @serialize()
    @validate({ nullable: true })
    public message?: string

    public static async from(value: IRejectResponseItem | RejectResponseItemJSON): Promise<RejectResponseItem> {
        return await super.fromT(value, RejectResponseItem)
    }
}
