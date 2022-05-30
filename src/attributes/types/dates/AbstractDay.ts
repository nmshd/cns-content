import { serialize, validate } from "@js-soft/ts-serval"
import { RenderHints, RenderHintsDataType, RenderHintsEditType, ValueHints } from "../../../attributes/hints"
import { AbstractInteger } from "../AbstractInteger"

/**
 * day values start with 1 = first day of month
 */
export abstract class AbstractDay extends AbstractInteger {
    @serialize()
    @validate({
        customValidator: (v) =>
            v < 1 || v > 31 || !Number.isInteger(v) ? "must be an integer value between 1 and 31" : undefined
    })
    public override value: number

    public static override get valueHints(): ValueHints {
        return super.valueHints.copyWith({
            min: 1,
            max: 31
        })
    }

    public static override get renderHints(): RenderHints {
        return super.renderHints.copyWith({
            editType: RenderHintsEditType.ButtonLike,
            dataType: RenderHintsDataType.Day
        })
    }
}
