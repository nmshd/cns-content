import { serialize, type, validate } from "@js-soft/ts-serval"
import { FormItemVisible, FormItemVisibleJSON } from "../FormItem"
import { FormItemMultipleChoiceItem, FormItemMultipleChoiceItemJSON } from "./FormItemMultipleChoiceItem"

export interface FormItemMultipleChoiceJSON extends FormItemVisibleJSON {
    items: FormItemMultipleChoiceItemJSON[]
    selectedKey: string
}

@type("FormItemMultipleChoice")
export class FormItemMultipleChoice extends FormItemVisible {
    @serialize({ type: FormItemMultipleChoiceItem })
    @validate()
    public items: FormItemMultipleChoiceItem[]

    @serialize()
    @validate({ nullable: true })
    public selectedKey: string
}
