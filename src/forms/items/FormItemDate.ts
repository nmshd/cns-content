import { serialize, type, validate } from "@js-soft/ts-serval"
import { FormItemVisible, FormItemVisibleJSON } from "../FormItem"

export interface FormItemDateJSON extends FormItemVisibleJSON {
    placeholder: string
    value: string
    minDate: string
    maxDate: string
    duration: string
}

@type("FormItemDate")
export class FormItemDate extends FormItemVisible {
    @serialize()
    @validate({ nullable: true })
    public placeholder: string

    @serialize()
    @validate({ nullable: true })
    public value: string

    @serialize()
    @validate({ nullable: true })
    public minDate: string

    @serialize()
    @validate({ nullable: true })
    public maxDate: string

    @serialize()
    @validate({ nullable: true })
    public duration: string
}
