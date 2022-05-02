import { serialize, validate } from "@js-soft/ts-serval"
import { LanguageISO639 } from "../../constants/LanguagesISO639"
import { AbstractString } from "../AbstractString"

export abstract class AbstractLanguage extends AbstractString {
    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(LanguageISO639).includes(v) ? `must be one of: ${Object.values(LanguageISO639)}` : undefined
    })
    public override value: LanguageISO639
}
