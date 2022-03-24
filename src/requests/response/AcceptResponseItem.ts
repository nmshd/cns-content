import { SerializableAsync, type } from "@js-soft/ts-serval"
import { IResponseItem, ResponseItem, ResponseItemJSON } from "./ResponseItem"
import { ResponseItemResult } from "./ResponseItemResult"

export interface AcceptResponseItemJSON extends ResponseItemJSON {
    result: ResponseItemResult.Accepted
}

export interface IAcceptResponseItem extends IResponseItem {
    result: ResponseItemResult.Accepted
}

@type("AcceptResponseItem")
export class AcceptResponseItem extends ResponseItem implements IAcceptResponseItem {
    public result: ResponseItemResult.Accepted

    public static async from(value: IAcceptResponseItem | AcceptResponseItemJSON): Promise<AcceptResponseItem> {
        return await SerializableAsync.fromT<AcceptResponseItem>(value, AcceptResponseItem)
    }
}
