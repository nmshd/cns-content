import { serialize, validate } from "@js-soft/ts-serval"
import { RenderHints, RenderHintsDataType, RenderHintsEditType, ValueHints } from "../../../attributes/hints"
import { AbstractString } from "../AbstractString"

export abstract class AbstractDataURL extends AbstractString {
    @serialize()
    @validate({
        min: 7,
        max: 4096,
        customValidator: (v) => (v.length > 4096 ? "must be less than 4096 characters" : undefined)
    })
    public override value: string

    public static override get valueHints(): ValueHints {
        return super.valueHints.copyWith({
            min: 7,
            max: 4096
        })
    }

    public static override get renderHints(): RenderHints {
        return super.renderHints.copyWith({
            editType: RenderHintsEditType.Upload,
            dataType: RenderHintsDataType.DataURL
        })
    }
}
