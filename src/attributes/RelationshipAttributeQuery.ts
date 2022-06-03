import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, ICoreAddress } from "@nmshd/transport"
import { AbstractAttributeQuery, AbstractAttributeQueryJSON, IAbstractAttributeQuery } from "./AbstractAttributeQuery"
import {
    IRelationshipAttributeCreationHints,
    RelationshipAttributeCreationHints,
    RelationshipAttributeCreationHintsJSON
} from "./hints/RelationshipAttributeHints"

export interface RelationshipAttributeQueryJSON extends AbstractAttributeQueryJSON {
    key: string
    owner: string
    thirdParty?: string
    attributeCreationHints: RelationshipAttributeCreationHintsJSON
}

export interface IRelationshipAttributeQuery extends IAbstractAttributeQuery {
    key: string
    owner: ICoreAddress
    thirdParty?: ICoreAddress
    attributeCreationHints: IRelationshipAttributeCreationHints
}

@type("RelationshipAttributeQuery")
export class RelationshipAttributeQuery extends AbstractAttributeQuery implements IRelationshipAttributeQuery {
    @serialize()
    @validate()
    public key: string

    @serialize()
    @validate()
    public owner: CoreAddress

    @serialize()
    @validate({ nullable: true })
    public thirdParty?: CoreAddress

    @serialize()
    @validate()
    public attributeCreationHints: RelationshipAttributeCreationHints

    public static from(
        value: IRelationshipAttributeQuery | RelationshipAttributeQueryJSON
    ): RelationshipAttributeQuery {
        return this.fromAny(value)
    }

    public override toJSON(): RelationshipAttributeQueryJSON {
        return super.toJSON() as RelationshipAttributeQueryJSON
    }
}
