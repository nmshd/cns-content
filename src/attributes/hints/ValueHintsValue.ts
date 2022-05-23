import { ISerializable, PrimitiveType, Serializable, serialize, type, validate } from "@js-soft/ts-serval"

export interface ValueHintsValueJSON {
    key: string | number | boolean
    displayName: string
}

export interface IValueHintsValue extends ISerializable {
    key: string | number | boolean
    displayName: string
}

@type("ValueHintsValue")
export class ValueHintsValue extends Serializable implements IValueHintsValue {
    @serialize()
    @validate()
    public displayName: string

    @validate({ allowedTypes: [PrimitiveType.String, PrimitiveType.Number, PrimitiveType.Boolean] })
    @serialize()
    public key: string | number | boolean

    public static from(value: IValueHintsValue | ValueHintsValueJSON): ValueHintsValue {
        return this.fromAny(value)
    }
}
