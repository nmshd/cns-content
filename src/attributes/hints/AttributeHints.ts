import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { IValueHints, ValueHints, ValueHintsJSON } from "./ValueHints"

export interface AttributeHintsJSON {
    title: string
    description?: string
    valueHints?: ValueHintsJSON
}

export interface IAttributeHints extends ISerializable {
    title: string
    description?: string
    valueHints?: IValueHints
}

/**
 * AttributeHints are rendering hints with a `title` and a possible `description` set.
 * They are primarily used within `RelationshipAttributeQuery` to define the metadata of
 * a proprietary Attribute, even without such an Attribute existent.
 */
@type("AttributeHints")
export class AttributeHints extends Serializable implements IAttributeHints {
    @serialize()
    @validate()
    public title: string

    @serialize()
    @validate({ nullable: true })
    public description?: string

    @serialize()
    @validate({ nullable: true })
    public valueHints?: ValueHints

    public static from(value: IAttributeHints | AttributeHintsJSON): AttributeHints {
        return this.fromAny(value)
    }
}
