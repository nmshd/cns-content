import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractComplexValue, AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"

export interface AbstractAddressJSON extends AbstractComplexValueJSON {
    recipient: string
}

export interface IAbstractAddress extends IAbstractComplexValue {
    recipient: string
}

export abstract class AbstractAddress extends AbstractComplexValue implements IAbstractAddress {
    @serialize()
    @validate()
    public recipient: string
}
