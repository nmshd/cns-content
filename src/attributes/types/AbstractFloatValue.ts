import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue, AbstractAttributeValueJSON } from "../AbstractAttributeValue"

export interface AbstractFloatValueJSON extends AbstractAttributeValueJSON {
    value: number
}

export abstract class AbstractFloatValue extends AbstractAttributeValue implements AbstractFloatValueJSON {
    @serialize()
    @validate()
    public value: number
}
