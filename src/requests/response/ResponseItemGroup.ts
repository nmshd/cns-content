import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"
import { IResponseItemDerivations, ResponseItemDerivations, ResponseItemJSONDerivations } from "./ResponseItem"

export interface ResponseItemGroupJSON extends ContentJSON {
    items: ResponseItemJSONDerivations[]
}

export interface IResponseItemGroup extends ISerializable {
    items: IResponseItemDerivations[]
}

@type("ResponseItemGroup")
export class ResponseItemGroup extends Serializable {
    @serialize()
    @validate({ customValidator: (v) => (v.length < 1 ? "may not be empty" : undefined) })
    public items: ResponseItemDerivations[]

    public static from(value: IResponseItemGroup | ResponseItemGroupJSON): ResponseItemGroup {
        return this.fromAny(value)
    }
}
