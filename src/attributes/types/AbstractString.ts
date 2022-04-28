import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "../AbstractAttributeValue"

export type AbstractStringJSON = IAbstractStringJSON | string

export interface IAbstractStringJSON extends AbstractAttributeValueJSON {
    value: string
}

export interface IAbstractString extends IAbstractAttributeValue {
    value: string
}

export class AbstractString extends AbstractAttributeValue implements IAbstractString {
    @serialize()
    @validate()
    public value: string

    public static override preFrom(value: any): any {
        if (typeof value === "string") value = { value }
        return value
    }
}
