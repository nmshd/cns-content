import { serialize, type, validate } from "@js-soft/ts-serval"
import { ValueHints } from "../../../attributes/hints"
import { AbstractInteger } from "../AbstractInteger"

@type("Age")
export class Age extends AbstractInteger {
    @serialize()
    @validate({
        customValidator: (v) =>
            v < 0 || v > 150 || !Number.isInteger(v) ? "must be an integer value between 0 and 150" : undefined
    })
    public override value: number

    public static override get valueHints(): ValueHints {
        return super.valueHints.copyWith({
            min: 0,
            max: 151
        })
    }
}
