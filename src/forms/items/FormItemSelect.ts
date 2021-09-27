import { serialize, type, validate } from "@js-soft/ts-serval"
import { FormItemVisible, FormItemVisibleJSON } from "../FormItem"
import { FormItemSelectedItemJSON, FormItemSelectItem } from "./FormItemSelectItem"

export interface FormItemSelectJSON extends FormItemVisibleJSON {
    items: FormItemSelectedItemJSON[]
    selectedKey: string
}

@type("FormItemSelect")
export class FormItemSelect extends FormItemVisible {
    @serialize({ type: FormItemSelectItem })
    @validate()
    public items: FormItemSelectItem[]

    @serialize()
    @validate({ nullable: true })
    public selectedKey: string
}
