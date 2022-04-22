import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue, AbstractAttributeValueJSON } from "../AbstractAttributeValue"

export interface AbstractBooleanValueJSON extends AbstractAttributeValueJSON {
    value: boolean
}

export abstract class AbstractBooleanValue extends AbstractAttributeValue implements AbstractBooleanValueJSON {
    @serialize()
    @validate()
    public value: boolean
}
