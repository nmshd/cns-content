import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../AbstractAttributeValue"

export abstract class AbstractIntegerValue extends AbstractAttributeValue {
    @serialize()
    @validate({ customValidator: (v) => (!Number.isInteger(v) ? "must be an integer" : undefined) })
    public value: number
}
