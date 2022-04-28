import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "../AbstractAttributeValue"

export type AbstractBooleanJSON = IAbstractBooleanJSON | number

export interface IAbstractBooleanJSON extends AbstractAttributeValueJSON {
    value: boolean
}

export interface IAbstractBoolean extends IAbstractAttributeValue {
    value: boolean
}

export class AbstractBoolean extends AbstractAttributeValue implements IAbstractBoolean {
    @serialize()
    @validate()
    public value: boolean

    public static override preFrom(value: any): any {
        if (typeof value === "boolean") value = { value }
        return value
    }
}
