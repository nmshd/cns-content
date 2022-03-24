import { ISerializable, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreId, ICoreId } from "@nmshd/transport"
import { ContentJSON } from "../../ContentJSON"
import { IResponseItem, ResponseItem, ResponseItemJSON } from "./ResponseItem"
import { IResponseItemGroup, ResponseItemGroup, ResponseItemGroupJSON } from "./ResponseItemGroup"

export interface ResponseJSON extends ContentJSON {
    requestId: string
    items: (ResponseItemGroupJSON | ResponseItemJSON)[]
}

export interface IResponse extends ISerializable {
    requestId: ICoreId
    items: (IResponseItemGroup | IResponseItem)[]
}

@type("Response")
export class Response extends SerializableAsync {
    @serialize()
    @validate()
    public requestId: CoreId

    @serialize()
    @validate({ customValidator: (v) => (v.length < 1 ? "may not be empty" : undefined) })
    public items: (ResponseItemGroup | ResponseItem)[]

    public static async from(value: IResponse | ResponseJSON): Promise<Response> {
        return await super.fromT(value, Response)
    }
}
