import { ISerializable, Serializable, serialize, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"
import { FormItem, FormItemJSON, IFormItem } from "./FormItem"

export interface FormJSON extends ContentJSON {
    title: string
    description: string
    items: FormItemJSON[]
}

export interface IForm extends ISerializable {
    title: string
    description: string
    items: IFormItem[]
}

export class Form extends Serializable {
    @serialize()
    @validate()
    public title: string

    @serialize()
    @validate()
    public description: string

    @serialize({ type: FormItem })
    @validate()
    public items: FormItem[]
}
