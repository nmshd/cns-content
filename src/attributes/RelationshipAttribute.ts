import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute, AbstractAttributeJSON, IAbstractAttribute } from "./AbstractAttribute"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "./AbstractAttributeValue"

export enum RelationshipAttributeConfidentiality {
    /**
     * If a third party queries a public RelationshipAttribute from an Identity, there is no
     * warning message for a user that possibly sensitive information from within a Relationship
     * is shared to a third party. However, this does not mean that the request for such an
     * Attribute can or is automatically accepted, as the user might not want to share it with
     * this third party - nevertheless it is public.
     *
     * Good examples for public RelationshipAttributes are bonus membership ids or social network
     * account names/channels.
     */
    Public = "public",
    /**
     * A private Attribute may never be queried by a third party. Even if queried, a user cannot
     * "override" this rule and accept such a sharing request. Querying such an Attribute will
     * result in an error.
     *
     * An example would be a telephone PIN with a bank which is used as the authentication factor.
     */
    Private = "private",
    /**
     * A protected RelationshipAttribute may be queried by a third party, but the user is
     * specifically warned about this query and needs to give consent.
     *
     * This is great for all kinds of scenarios, in which giving out the RelationshipAttribute
     * is a "common real-world edge case". For example given out a car insurance id to the
     * other party once you had an accident.
     */
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
    @validate()
    public key: string

    @serialize()
    @validate({ nullable: true })
    public isTechnical: boolean

    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(RelationshipAttributeConfidentiality).includes(v)
                ? `must be one of: ${Object.values(RelationshipAttributeConfidentiality)}`
                : undefined
    })
    public confidentiality: RelationshipAttributeConfidentiality

    protected static override preFrom(value: any): any {
        if (typeof value.isTechnical === "undefined") value.isTechnical = false

        return value
    }

    public static from<
        TValueClass extends AbstractAttributeValue = AbstractAttributeValue,
        TValueInterface extends IAbstractAttributeValue = IAbstractAttributeValue,
        TValueJSONInterface extends AbstractAttributeValueJSON = AbstractAttributeValueJSON
    >(
        value: IRelationshipAttribute<TValueInterface> | RelationshipAttributeJSON<TValueJSONInterface>
    ): RelationshipAttribute<TValueClass> {
        return this.fromAny(value) as RelationshipAttribute<TValueClass>
    }

    public override toJSON(): RelationshipAttributeJSON {
        return super.toJSON() as RelationshipAttributeJSON
    }
}
