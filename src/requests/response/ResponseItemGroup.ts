import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"
import { IResponseItem, ResponseItem, ResponseItemJSON } from "./ResponseItem"

export interface ResponseItemGroupJSON extends ContentJSON {
    items: ResponseItemJSON[]
    metadata?: object
}

export interface IResponseItemGroup extends ISerializable {
    items: IResponseItem[]
    metadata?: object
}

@type("ResponseItemGroup")
export class ResponseItemGroup extends Serializable {
    @serialize()
    @validate({ customValidator: (v) => (v.length < 1 ? "may not be empty" : undefined) })
    public items: ResponseItem[]

    @serialize()
    @validate({ nullable: true })
    public metadata?: object

    public static from(value: IResponseItemGroup | ResponseItemGroupJSON): ResponseItemGroup {
        return this.fromAny(value)
    }
}
