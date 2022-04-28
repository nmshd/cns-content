import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "../AbstractAttributeValue"

export type AbstractIntegerJSON = IAbstractIntegerValue | number

export interface IAbstractIntegerValue extends AbstractAttributeValueJSON {
    value: number
}

export interface IAbstractInteger extends IAbstractAttributeValue {
    value: number
}

export class AbstractInteger extends AbstractAttributeValue implements IAbstractInteger {
    @serialize()
    @validate({ customValidator: (v) => (!Number.isInteger(v) ? "must be an integer" : undefined) })
    public value: number

    public static override preFrom(value: any): any {
        if (typeof value === "number") value = { value }
        return value
    }
}
