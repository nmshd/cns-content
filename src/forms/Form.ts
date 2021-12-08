import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"
import { FormItem, FormItemJSON, IFormItem } from "./FormItem"

export interface FormJSON extends ContentJSON {
    title?: string
    description?: string
    items: FormItemJSON[]
}

export interface IForm extends ISerializable {
    title?: string
    description?: string
    items: IFormItem[]
}

@type("Form")
export class Form extends Serializable {
    @serialize()
    @validate({ nullable: true })
    public title?: string

    @serialize()
    @validate({ nullable: true })
    public description?: string

    @serialize({ type: FormItem })
    @validate()
    public items: FormItem[]
}
