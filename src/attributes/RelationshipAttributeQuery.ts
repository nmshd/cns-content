import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, ICoreAddress } from "@nmshd/transport"
import { AbstractAttributeQuery, AbstractAttributeQueryJSON, IAbstractAttributeQuery } from "./AbstractAttributeQuery"

export interface RelationshipAttributeQueryJSON extends AbstractAttributeQueryJSON {
    key?: string
    owner?: string
    thirdParty?: string
}

export interface IRelationshipAttributeQuery extends IAbstractAttributeQuery {
    key?: string
    owner?: ICoreAddress
    thirdParty?: ICoreAddress
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

    public static from(
        value: IRelationshipAttributeQuery | RelationshipAttributeQueryJSON
    ): RelationshipAttributeQuery {
        return this.fromAny(value)
    }

    public override toJSON(): RelationshipAttributeQueryJSON {
        return super.toJSON() as RelationshipAttributeQueryJSON
    }
}
