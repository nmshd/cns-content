import { ISerializable, Serializable } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"
import { AbstractBoolean } from "./types/AbstractBoolean"
import { AbstractFloat } from "./types/AbstractFloat"
import { AbstractInteger } from "./types/AbstractInteger"
import { AbstractString } from "./types/AbstractString"

export interface AbstractAttributeValueJSON extends ContentJSON {}

export interface IAbstractAttributeValue extends ISerializable {}

export abstract class AbstractAttributeValue extends Serializable implements IAbstractAttributeValue {
    public static valueGenerator(
        v: AbstractBoolean | AbstractFloat | AbstractInteger | AbstractString
    ): boolean | number | string {
        return v.value
    }

    public static valueArrayGenerator(
        v: (AbstractBoolean | AbstractFloat | AbstractInteger | AbstractString)[]
    ): (boolean | number | string)[] {
        return v.map((v) => v.value)
    }
}
