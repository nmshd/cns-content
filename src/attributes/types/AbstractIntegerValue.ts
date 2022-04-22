import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue, AbstractAttributeValueJSON } from "../AbstractAttributeValue"

export interface AbstractIntegerValueJSON extends AbstractAttributeValueJSON {
    value: number
}

export abstract class AbstractIntegerValue extends AbstractAttributeValue implements AbstractIntegerValueJSON {
    @serialize()
    @validate({ customValidator: (v) => (!Number.isInteger(v) ? "must be an integer" : undefined) })
    public value: number
}
