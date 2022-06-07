import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { RelationshipAttributeConfidentiality } from "../RelationshipAttribute"
import { IValueHints, ValueHints, ValueHintsJSON } from "./ValueHints"

export interface RelationshipAttributeCreationHintsJSON {
    title: string
    description?: string
    valueHints?: ValueHintsJSON
    isTechnical?: boolean
    confidentiality: RelationshipAttributeConfidentiality
}

export interface IRelationshipAttributeCreationHints extends ISerializable {
    title: string
    description?: string
    valueHints?: IValueHints
    isTechnical?: boolean
    confidentiality: RelationshipAttributeConfidentiality
}

/**
 * AttributeHints are rendering hints with a `title` and a possible `description` set.
 * They are primarily used within `RelationshipAttributeQuery` to define the metadata of
 * a proprietary Attribute, even without such an Attribute existent.
 */
@type("RelationshipAttributeHints")
export class RelationshipAttributeCreationHints extends Serializable implements IRelationshipAttributeCreationHints {
    @serialize()
    @validate()
    public title: string

    @serialize()
    @validate({ nullable: true })
    public description?: string

    @serialize()
    @validate({ nullable: true })
    public valueHints?: ValueHints

    @serialize()
    @validate({ nullable: true })
    public isTechnical?: boolean = false

    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(RelationshipAttributeConfidentiality).includes(v)
                ? `must be one of: ${Object.values(RelationshipAttributeConfidentiality)}`
                : undefined
    })
    public confidentiality: RelationshipAttributeConfidentiality

    public static from(
        value: IRelationshipAttributeCreationHints | RelationshipAttributeCreationHintsJSON
    ): RelationshipAttributeCreationHints {
        return this.fromAny(value)
    }
}
