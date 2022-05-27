import { serialize, validate } from "@js-soft/ts-serval"
import {
    RenderHints,
    RenderHintsDataType,
    RenderHintsEditType,
    ValueHints,
    ValueHintsValue
} from "../../../attributes/hints"
import { LanguageISO639, LANGUAGES_ISO639_TO_DISPLAY_NAME } from "../../constants/LanguagesISO639"
import { AbstractString } from "../AbstractString"

export abstract class AbstractLanguage extends AbstractString {
    @serialize()
    @validate({
        min: 2,
        max: 2,
        customValidator: (v) =>
            !Object.values(LanguageISO639).includes(v) ? `must be one of: ${Object.values(LanguageISO639)}` : undefined
    })
    public override value: LanguageISO639

    public static override get valueHints(): ValueHints {
        const languages: ValueHintsValue[] = []
        LANGUAGES_ISO639_TO_DISPLAY_NAME.forEach((value, code) => {
            languages.push(
                ValueHintsValue.from({ key: code, displayName: `i18n://attributes.values.languages.${code}` })
            )
        })
        return super.valueHints.copyWith({
            min: 2,
            max: 2,
            values: languages
        })
    }

    public static override get renderHints(): RenderHints {
        return super.renderHints.copyWith({
            editType: RenderHintsEditType.SelectLike,
            dataType: RenderHintsDataType.Language
        })
    }
}
