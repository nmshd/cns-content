import { serialize, validate } from "@js-soft/ts-serval"
import { LanguagesISO639 } from "../../constants/LanguagesISO639"
import { AbstractString } from "../AbstractString"

export abstract class AbstractLanguage extends AbstractString {
    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(LanguagesISO639).includes(v)
                ? `must be one of: ${Object.values(LanguagesISO639)}`
                : undefined
    })
    public override value: LanguagesISO639
}
