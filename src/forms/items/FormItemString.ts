import { serialize, type, validate } from "@js-soft/ts-serval"
import { FormItemVisible, FormItemVisibleJSON } from "../FormItem"

export interface FormItemStringJSON extends FormItemVisibleJSON {
    placeholder: string
    value: string
    minLength: number
    maxLength: number
    allowedRegex: string
}

@type("FormItemString")
export class FormItemString extends FormItemVisible {
    @serialize()
    @validate({ nullable: true })
    public placeholder: string

    @serialize()
    @validate({ nullable: true })
    public value: string

    @serialize()
    @validate({ nullable: true })
    public minLength: number

    @serialize()
    @validate({ nullable: true })
    public maxLength: number

    @serialize()
    @validate({ nullable: true })
    public allowedRegex: string
}
