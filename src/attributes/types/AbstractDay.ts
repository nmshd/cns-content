import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../AbstractAttributeValue"

/**
 * day values start with 1 = first day of month
 */
export abstract class AbstractDay extends AbstractAttributeValue {
    @serialize()
    @validate({ customValidator: (v) => (v < 1 || v > 31 ? "has invalid value" : undefined) })
    public value: number
}
