import { ISerializable } from "@js-soft/ts-serval"
import { ICoreId } from "@nmshd/transport"
import { ResponseItemStatus } from "./ResponseItemStatus"

export interface IResponse extends ISerializable {
    requestId: ICoreId
    items: (IResponseItemGroup | IResponseItem)[]
}

export interface IResponseItem extends ISerializable {
    status: ResponseItemStatus
    content?: IAcceptContent | IRejectContent | IErrorContent
    metadata?: object
}

export interface IAcceptContent extends ISerializable {}

export interface IRejectContent extends ISerializable {
    code?: string
    message?: string
}

export interface IErrorContent extends ISerializable {
    code: string
    message: string
}

export interface IResponseItemGroup extends ISerializable {
    items: IResponseItem[]
    metadata?: object
}
