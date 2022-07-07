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
    subHints?: Record<string, ValueHintsJSON>
}

export interface ValueHintsOverrideJSON extends Partial<ValueHintsJSON> {}

export interface IValueHints extends ISerializable {
    editHelp?: string
    min?: number
    max?: number
    pattern?: string
    values?: IValueHintsValue[]
    defaultValue?: string | number | boolean
    subHints?: Record<string, IValueHints>
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

    @serialize({ type: ValueHints })
    @validate({ nullable: true })
    public subHints: Record<string, ValueHints> = {}

    public static from(value: IValueHints | ValueHintsJSON): ValueHints {
        return this.fromAny(value)
    }

    public static override postFrom<T extends Serializable>(value: T): T {
        if (!(value instanceof ValueHints)) throw new Error("this should never happen")

        value.subHints = Object.entries(value.subHints)
            .map((k) => {
                return { [k[0]]: ValueHints.from(k[1]) }
            })
            .reduce((obj, item) => Object.assign(obj, { [Object.keys(item)[0]]: Object.values(item)[0] }), {})

        return value
    }

    public override toJSON(): ValueHintsJSON {
        const json = super.toJSON() as ValueHintsJSON

        json.subHints = Object.entries(this.subHints)
            .map((k) => {
                return { [k[0]]: k[1].toJSON() }
            })
            .reduce((obj, item) => Object.assign(obj, { [Object.keys(item)[0]]: Object.values(item)[0] }), {})

        return json
    }

    public copyWith(override?: Partial<IValueHintsOverride | ValueHintsOverrideJSON | ValueHintsOverride>): ValueHints {
        const overrideJson = override && override instanceof ValueHintsOverride ? override.toJSON() : override

        const subHints = { ...this.toJSON().subHints, ...overrideJson?.subHints }
        return ValueHints.from({ ...this.toJSON(), ...overrideJson, subHints })
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

    @serialize({ type: ValueHints })
    @validate({ nullable: true })
    public subHints?: Record<string, ValueHints>

    public static from(value: IValueHintsOverride | ValueHintsOverrideJSON): ValueHintsOverride {
        return this.fromAny(value)
    }

    public static override postFrom<T extends Serializable>(value: T): T {
        const valueAsAny = value as any
        if (typeof valueAsAny.subHints === "undefined") return value

        valueAsAny.subHints = Object.entries(valueAsAny.subHints)
            .map((k) => {
                return { [k[0]]: ValueHints.from(k[1] as IValueHints) }
            })
            .reduce((obj, item) => Object.assign(obj, { [Object.keys(item)[0]]: Object.values(item)[0] }), {})

        return valueAsAny
    }

    public override toJSON(): ValueHintsOverrideJSON {
        const json = super.toJSON() as ValueHintsOverrideJSON

        json.subHints = Object.entries(this.subHints ?? {})
            .map((k) => {
                return { [k[0]]: k[1].toJSON() }
            })
            .reduce((obj, item) => Object.assign(obj, { [Object.keys(item)[0]]: Object.values(item)[0] }), {})

        return json
    }
}
