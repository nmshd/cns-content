import { type } from "@js-soft/ts-serval"
import { ValueHints } from "../../hints/ValueHints"
import { AbstractMonth } from "../dates/AbstractMonth"

@type("BirthMonth")
export class BirthMonth extends AbstractMonth {
    public static override get valueHints(): ValueHints {
        return super.valueHints.with({
            editHelp: "i18n://yourBirthMonth"
        })
    }
}
