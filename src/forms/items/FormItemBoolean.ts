import { serialize, type, validate } from "@js-soft/ts-serval"
import { FormItemVisible, FormItemVisibleJSON } from "../FormItem"

export interface FormItemBooleanJSON extends FormItemVisibleJSON {
    value: boolean
}

@type("FormItemBoolean")
export class FormItemBoolean extends FormItemVisible {
    @serialize()
    @validate({ nullable: true })
    public value: boolean
}
