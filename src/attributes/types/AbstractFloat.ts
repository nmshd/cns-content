import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "../AbstractAttributeValue"

export type AbstractFloatJSON = IAbstractFloatJSON | number

export interface IAbstractFloatJSON extends AbstractAttributeValueJSON {
    value: number
}

export interface IAbstractFloat extends IAbstractAttributeValue {
    value: number
}

export class AbstractFloat extends AbstractAttributeValue implements IAbstractFloat {
    @serialize()
    @validate()
    public value: number

    public static override preFrom(value: any): any {
        if (typeof value === "number") value = { value }
        return value
    }
}