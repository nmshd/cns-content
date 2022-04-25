import { serialize, validate } from "@js-soft/ts-serval"
import {
    AbstractAttributeValue,
    AbstractAttributeValueJSON,
    IAbstractAttributeValue
} from "../../AbstractAttributeValue"

export interface AbstractAddressJSON extends AbstractAttributeValueJSON {
    recipient: string
}

export interface IAbstractAddress extends IAbstractAttributeValue {
    recipient: string
}

export abstract class AbstractAddress extends AbstractAttributeValue implements IAbstractAddress {
    @serialize()
    @validate()
    public recipient: string
}
