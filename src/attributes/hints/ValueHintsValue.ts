import { ISerializable, PrimitiveType, Serializable, serialize, type, validate } from "@js-soft/ts-serval"

export interface ValueHintsValueJSON {
    key: any
    displayName: string
}

export interface IValueHintsValue extends ISerializable {
    key: any
    displayName: string
}

@type("ValueHintsValue")
export class ValueHintsValue extends Serializable implements IValueHintsValue {
    @serialize()
    @validate()
    public displayName: string

    @serialize({ any: true })
    @validate({ allowedTypes: [PrimitiveType.Number, PrimitiveType.String, PrimitiveType.Boolean] })
    public key: any

    public static from(value: IValueHintsValue | ValueHintsValueJSON): ValueHintsValue {
        return this.fromAny(value)
    }
}
