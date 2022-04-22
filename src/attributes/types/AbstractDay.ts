import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractIntegerValue } from "./AbstractIntegerValue"

/**
 * day values start with 1 = first day of month
 */
export abstract class AbstractDay extends AbstractIntegerValue {
    @serialize()
    @validate({
        customValidator: (v) =>
            v < 1 || v > 31 || !Number.isInteger(v) ? "must be an integer value between 1 and 31" : undefined
    })
    public override value: number
}
