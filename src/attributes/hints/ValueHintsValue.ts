import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"

export interface ValueHintsValueJSON {
    key: boolean | number | string
    displayName: string
}

export interface IValueHintsValue extends ISerializable {
    key: boolean | number | string
    displayName: string
}

@type("ValueHintsValue")
export class ValueHintsValue extends Serializable implements IValueHintsValue {
    @serialize()
    @validate()
    public displayName: string

    @serialize({ unionTypes: [Boolean, Number, String] })
    @validate()
    public key: boolean | number | string

    public static from(value: IValueHintsValue | ValueHintsValueJSON): ValueHintsValue {
        return this.fromAny(value)
    }
}
