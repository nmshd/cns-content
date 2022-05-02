import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractInteger } from "../AbstractInteger"

export abstract class AbstractYear extends AbstractInteger {
    @serialize()
    @validate({
        customValidator: (v) =>
            v < 1 || v > 9999 || !Number.isInteger(v) ? "must be an integer value between 1 and 9999" : undefined
    })
    public override value: number
}
