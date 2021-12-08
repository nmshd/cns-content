import { serialize, type, validate } from "@js-soft/ts-serval"
import { FormItemVisible, FormItemVisibleJSON } from "../FormItem"
import { FormItemSelectItem, FormItemSelectItemJSON } from "./FormItemSelectItem"

export interface FormItemSelectJSON extends FormItemVisibleJSON {
    items: FormItemSelectItemJSON[]
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
