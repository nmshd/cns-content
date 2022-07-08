import { serialize, type, validate } from "@js-soft/ts-serval"
import { RenderHints, RenderHintsEditType, ValueHints, ValueHintsValue } from "../../../attributes/hints"
import { AbstractString } from "../AbstractString"

/**
 * Biologisches Geschlecht
 */
export enum BiologicalSex {
    M = "male",
    F = "female",
    X = "intersex"
}

@type("Sex")
export class Sex extends AbstractString {
    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(BiologicalSex).includes(v) ? `must be one of: ${Object.values(BiologicalSex)}` : undefined
    })
    public override value: BiologicalSex

    public static override get valueHints(): ValueHints {
        return super.valueHints.copyWith({
            values: Object.values(BiologicalSex).map((value) =>
                ValueHintsValue.from({ key: value, displayName: `i18n://attributes.values.sex.${value}` })
            )
        })
    }

    public static override get renderHints(): RenderHints {
        return super.renderHints.copyWith({
            editType: RenderHintsEditType.ButtonLike
        })
    }
}
