import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute, AbstractAttributeJSON, IAbstractAttribute } from "./AbstractAttribute"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "./AbstractAttributeValue"

export interface RelationshipAttributeJSON<K extends AbstractAttributeValueJSON = AbstractAttributeValueJSON>
    extends AbstractAttributeJSON {
    value: K
    key: string
}

export interface IRelationshipAttribute<T extends IAbstractAttributeValue = IAbstractAttributeValue>
    extends IAbstractAttribute {
    value: T
    key: string
}

@type("RelationshipAttribute")
export class RelationshipAttribute<T extends AbstractAttributeValue = AbstractAttributeValue>
    extends AbstractAttribute
    implements IRelationshipAttribute<T>
{
    // Fix serval bug where { type: AbstractAttributeValue } does not work here ...
    @serialize({ unionTypes: [AbstractAttributeValue] })
    @validate()
    public value: T

    @serialize()
    @validate({ nullable: true })
    public key: string

    public static from<
        T extends AbstractAttributeValue = AbstractAttributeValue,
        I extends IAbstractAttributeValue = IAbstractAttributeValue,
        K extends AbstractAttributeValueJSON = AbstractAttributeValueJSON
    >(value: IRelationshipAttribute<I> | RelationshipAttributeJSON<K>): RelationshipAttribute<T> {
        return this.fromAny(value) as RelationshipAttribute<T>
    }
}
