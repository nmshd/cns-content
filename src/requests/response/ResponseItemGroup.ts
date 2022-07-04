import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"
import { IResponseItem, ResponseItem, ResponseItemJSON } from "./ResponseItem"

export interface ResponseItemGroupJSON extends ContentJSON {
    items: ResponseItemJSON[]
}

export interface IResponseItemGroup extends ISerializable {
    items: IResponseItem[]
}

@type("ResponseItemGroup")
export class ResponseItemGroup extends Serializable {
    @serialize()
    @validate({ customValidator: (v) => (v.length < 1 ? "may not be empty" : undefined) })
    public items: ResponseItem[]

    public static from(value: IResponseItemGroup | ResponseItemGroupJSON): ResponseItemGroup {
        return this.fromAny(value)
    }
}
