import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "../AbstractAttributeValue"

export type AbstractStringValueJSON = IAbstractStringValueJSON | string

export interface IAbstractStringValueJSON extends AbstractAttributeValueJSON {
    value: string
}

export interface IAbstractStringValue extends IAbstractAttributeValue {
    value: string
}

export class AbstractStringValue extends AbstractAttributeValue implements IAbstractStringValue {
    @serialize()
    @validate()
    public value: string

    public static override preFrom(value: any): any {
        if (typeof value === "string") value = { value }
        return value
    }
}
