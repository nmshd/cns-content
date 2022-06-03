import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, ICoreAddress } from "@nmshd/transport"
import { AbstractAttributeQuery, AbstractAttributeQueryJSON, IAbstractAttributeQuery } from "./AbstractAttributeQuery"
import { RelationshipAttributeConfidentiality } from "./RelationshipAttribute"

export interface RelationshipAttributeQueryJSON extends AbstractAttributeQueryJSON {
    key?: string
    owner?: string
    thirdParty?: string
    isTechnical?: boolean
    confidentiality?: RelationshipAttributeConfidentiality
}

export interface IRelationshipAttributeQuery extends IAbstractAttributeQuery {
    key?: string
    owner?: ICoreAddress
    thirdParty?: ICoreAddress
    isTechnical?: boolean
    confidentiality?: RelationshipAttributeConfidentiality
}

@type("RelationshipAttributeQuery")
export class RelationshipAttributeQuery extends AbstractAttributeQuery implements IRelationshipAttributeQuery {
    @serialize()
    @validate({ nullable: true })
    public key?: string

    @serialize()
    @validate({ nullable: true })
    public owner?: CoreAddress

    @serialize()
    @validate({ nullable: true })
    public thirdParty?: CoreAddress

    @serialize()
    @validate({ nullable: true })
    public isTechnical?: boolean

    @serialize()
    @validate({
        nullable: true,
        customValidator: (v) =>
            !Object.values(RelationshipAttributeConfidentiality).includes(v)
                ? `must be one of: ${Object.values(RelationshipAttributeConfidentiality)}`
                : undefined
    })
    public confidentiality?: RelationshipAttributeConfidentiality

    public static from(
        value: IRelationshipAttributeQuery | RelationshipAttributeQueryJSON
    ): RelationshipAttributeQuery {
        return this.fromAny(value)
    }

    public override toJSON(): RelationshipAttributeQueryJSON {
        return super.toJSON() as RelationshipAttributeQueryJSON
    }
}
