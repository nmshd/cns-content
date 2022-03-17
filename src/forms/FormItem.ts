import { ISerializable, Serializable, serialize, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"

export enum FormType {
    Invisible = "invisible",
    String = "string",
    Select = "select",
    Date = "date",
    Text = "text"
}

export interface FormItemJSON extends ContentJSON {
    key: string
    type: string
}

export interface FormItemVisibleJSON extends FormItemJSON {
    label: string
    readonly?: boolean
    help?: string
}

export interface IFormItem extends ISerializable {
    key: string
    type: FormType
}

export abstract class FormItem extends Serializable implements IFormItem {
    @serialize()
    @validate()
    public key: string

    @serialize()
    @validate()
    public type: FormType
}

export interface IFormItemVisible extends IFormItem {
    readonly?: boolean
    help?: string
}

export abstract class FormItemVisible extends FormItem implements IFormItemVisible {
    @serialize()
    @validate()
    public label: string

    @serialize()
    @validate({ nullable: true })
    public readonly?: boolean

    @serialize()
    @validate({ nullable: true })
    public help?: string
}
