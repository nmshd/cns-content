import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue, AbstractAttributeValueJSON } from "../AbstractAttributeValue"

export interface AbstractStringValueJSON extends AbstractAttributeValueJSON {
    value: string
}

export abstract class AbstractStringValue extends AbstractAttributeValue implements AbstractStringValueJSON {
    @serialize()
    @validate()
    public value: string
}
