import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "../AbstractAttributeValue"

export type AbstractBooleanValueJSON = IAbstractBooleanValueJSON | number

export interface IAbstractBooleanValueJSON extends AbstractAttributeValueJSON {
    value: boolean
}

export interface IAbstractBooleanValue extends IAbstractAttributeValue {
    value: boolean
}

export class AbstractBooleanValue extends AbstractAttributeValue implements IAbstractBooleanValue {
    @serialize()
    @validate()
    public value: boolean

    public static override preFrom(value: any): any {
        if (typeof value === "boolean") value = { value }
        return value
    }
}
