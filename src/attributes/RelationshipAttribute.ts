import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute, AbstractAttributeJSON, IAbstractAttribute } from "./AbstractAttribute"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "./AbstractAttributeValue"

export enum RelationshipAttributeConfidentiality {
    Public = "public",
    Private = "private",
    Protected = "protected"
}

export interface RelationshipAttributeJSON<
    TValueJSONInterface extends AbstractAttributeValueJSON = AbstractAttributeValueJSON
> extends AbstractAttributeJSON {
    value: TValueJSONInterface
    key: string
    isTechnical?: boolean
    confidentiality: RelationshipAttributeConfidentiality
}

export interface IRelationshipAttribute<TValueInterface extends IAbstractAttributeValue = IAbstractAttributeValue>
    extends IAbstractAttribute {
    value: TValueInterface
    key: string
    isTechnical?: boolean
    confidentiality: RelationshipAttributeConfidentiality
}

@type("RelationshipAttribute")
export class RelationshipAttribute<TValueClass extends AbstractAttributeValue = AbstractAttributeValue>
    extends AbstractAttribute
    implements IRelationshipAttribute<TValueClass>
{
    // Fix serval bug where { type: AbstractAttributeValue } does not work here ...
    @serialize({ unionTypes: [AbstractAttributeValue] })
    @validate()
    public value: TValueClass

    @serialize()
    @validate({ nullable: true })
    public key: string

    @serialize()
    @validate({ nullable: true })
    public isTechnical = false

    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(RelationshipAttributeConfidentiality).includes(v)
                ? `must be one of: ${Object.values(RelationshipAttributeConfidentiality)}`
                : undefined
    })
    public confidentiality: RelationshipAttributeConfidentiality

    public static from<
        TValueClass extends AbstractAttributeValue = AbstractAttributeValue,
        TValueInterface extends IAbstractAttributeValue = IAbstractAttributeValue,
        TValueJSONInterface extends AbstractAttributeValueJSON = AbstractAttributeValueJSON
    >(
        value: IRelationshipAttribute<TValueInterface> | RelationshipAttributeJSON<TValueJSONInterface>
    ): RelationshipAttribute<TValueClass> {
        return this.fromAny(value) as RelationshipAttribute<TValueClass>
    }
}
