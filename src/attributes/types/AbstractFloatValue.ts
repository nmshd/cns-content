import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "../AbstractAttributeValue"

export type AbstractFloatValueJSON = IAbstractFloatValueJSON | number

export interface IAbstractFloatValueJSON extends AbstractAttributeValueJSON {
    value: number
}

export interface IAbstractFloatValue extends IAbstractAttributeValue {
    value: number
}

export class AbstractFloatValue extends AbstractAttributeValue implements IAbstractFloatValue {
    @serialize()
    @validate()
    public value: number

    public static override preFrom(value: any): any {
        if (typeof value === "number") value = { value }
        return value
    }
}
