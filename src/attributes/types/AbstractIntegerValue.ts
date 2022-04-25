import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "../AbstractAttributeValue"

export type AbstractIntegerValueJSON = IAbstractIntegerValueJSON | number

export interface IAbstractIntegerValueJSON extends AbstractAttributeValueJSON {
    value: number
}

export interface IAbstractIntegerValue extends IAbstractAttributeValue {
    value: number
}

export class AbstractIntegerValue extends AbstractAttributeValue implements IAbstractIntegerValue {
    @serialize()
    @validate({ customValidator: (v) => (!Number.isInteger(v) ? "must be an integer" : undefined) })
    public value: number

    public static override preFrom(value: any): any {
        if (typeof value === "number") value = { value }
        return value
    }
}
