import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute, AbstractAttributeJSON, IAbstractAttribute } from "./AbstractAttribute"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "./AbstractAttributeValue"

export interface RelationshipAttributeJSON extends AbstractAttributeJSON {
    store: "Relationship"
    value: AbstractAttributeValueJSON
    key: string
}

export interface IRelationshipAttribute extends IAbstractAttribute {
    store: "Relationship"
    value: IAbstractAttributeValue
    key: string
}

@type("RelationshipAttribute")
export class RelationshipAttribute<T extends AbstractAttributeValue>
    extends AbstractAttribute
    implements IRelationshipAttribute
{
    @serialize()
    @validate()
    public readonly store: "Relationship" = "Relationship"

    @serialize()
    @validate()
    public value: T

    @serialize({ type: String })
    @validate({ nullable: true })
    public key: string

    public static from<T extends AbstractAttributeValue>(
        value: IRelationshipAttribute | RelationshipAttributeJSON
    ): RelationshipAttribute<T> {
        return this.fromAny(value) as RelationshipAttribute<T>
    }
}
