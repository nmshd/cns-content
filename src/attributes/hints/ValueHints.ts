import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { IValueHintsValue, ValueHintsValue, ValueHintsValueJSON } from "./ValueHintsValue"

export interface ValueHintsJSON {
    editHelp?: string
    min?: number
    max?: number
    regExp?: string
    values?: ValueHintsValueJSON[]
    defaultValue?: boolean | number | string
}

export interface IValueHints extends ISerializable {
    editHelp?: string
    min?: number
    max?: number
    regExp?: string
    values?: IValueHintsValue[]
    defaultValue?: boolean | number | string
}

@type("ValueHints")
export class ValueHints extends Serializable implements IValueHints {
    @serialize()
    @validate({ nullable: true })
    public editHelp?: string

    @serialize()
    @validate({ nullable: true })
    public min?: number

    @serialize()
    @validate({ nullable: true })
    public max?: number

    @serialize()
    @validate({ nullable: true })
    public regExp?: string

    @serialize({ type: ValueHintsValue })
    @validate({ nullable: true })
    public values?: ValueHintsValue[]

    @serialize({ unionTypes: [Boolean, Number, String] })
    @validate({ nullable: true })
    public defaultValue?: boolean | number | string

    public static from(value: IValueHints | ValueHintsJSON): ValueHints {
        return this.fromAny(value)
    }
}
