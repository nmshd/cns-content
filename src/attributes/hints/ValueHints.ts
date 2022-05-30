import { ISerializable, PrimitiveType, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"
import { IValueHintsValue, ValueHintsValue, ValueHintsValueJSON } from "./ValueHintsValue"

export interface ValueHintsJSON extends ContentJSON {
    editHelp?: string
    min?: number
    max?: number
    pattern?: string
    values?: ValueHintsValueJSON[]
    defaultValue?: string | number | boolean
}

export interface ValueHintsOverrideJSON extends Partial<ValueHintsJSON> {}

export interface IValueHints extends ISerializable {
    editHelp?: string
    min?: number
    max?: number
    pattern?: string
    values?: IValueHintsValue[]
    defaultValue?: string | number | boolean
}

export interface IValueHintsOverride extends Partial<IValueHints> {}

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
    public pattern?: string

    @serialize({ type: ValueHintsValue })
    @validate({ nullable: true })
    public values?: ValueHintsValue[]

    @validate({ nullable: true, allowedTypes: [PrimitiveType.Number, PrimitiveType.String, PrimitiveType.Boolean] })
    @serialize()
    public defaultValue?: number | string | boolean

    public static from(value: IValueHints | ValueHintsJSON): ValueHints {
        return this.fromAny(value)
    }

    public override toJSON(): ValueHintsJSON {
        return super.toJSON() as ValueHintsJSON
    }

    public copyWith(override?: Partial<ValueHintsOverrideJSON>): ValueHints {
        return ValueHints.from({ ...this.toJSON(), ...override })
    }
}

@type("ValueHintsOverride")
export class ValueHintsOverride extends Serializable implements IValueHintsOverride {
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
    public pattern?: string

    @serialize({ type: ValueHintsValue })
    @validate({ nullable: true })
    public values?: ValueHintsValue[]

    @serialize({ unionTypes: [Boolean, Number, String] })
    @validate({ nullable: true })
    public defaultValue?: boolean | number | string

    public static from(value: IValueHintsOverride | ValueHintsOverrideJSON): ValueHintsOverride {
        return this.fromAny(value)
    }

    public override toJSON(): ValueHintsOverrideJSON {
        return super.toJSON()
    }
}
