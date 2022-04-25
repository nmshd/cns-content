import { ISerializable, Serializable } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"
import { AbstractBooleanValue } from "./types/AbstractBooleanValue"
import { AbstractFloatValue } from "./types/AbstractFloatValue"
import { AbstractIntegerValue } from "./types/AbstractIntegerValue"
import { AbstractStringValue } from "./types/AbstractStringValue"

export interface AbstractAttributeValueJSON extends ContentJSON {}

export interface IAbstractAttributeValue extends ISerializable {}

export abstract class AbstractAttributeValue extends Serializable implements IAbstractAttributeValue {
    public static valueGenerator(
        v: AbstractBooleanValue | AbstractFloatValue | AbstractIntegerValue | AbstractStringValue
    ): boolean | number | string {
        return v.value
    }

    public static valueArrayGenerator(
        v: (AbstractBooleanValue | AbstractFloatValue | AbstractIntegerValue | AbstractStringValue)[]
    ): (boolean | number | string)[] {
        return v.map((v) => v.value)
    }
}
