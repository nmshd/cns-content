import { serialize, type, validate } from "@js-soft/ts-serval"
import { FormItem, FormItemJSON } from "../FormItem"

export interface FormItemInvisibleJSON extends FormItemJSON {
    value: string
}

@type("FormItemInvisible")
export class FormItemInvisible extends FormItem {
    @serialize()
    @validate()
    public value: string
}
