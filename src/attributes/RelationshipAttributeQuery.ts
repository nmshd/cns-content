import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, ICoreAddress } from "@nmshd/transport"
import { AbstractAttributeQuery, AbstractAttributeQueryJSON, IAbstractAttributeQuery } from "./AbstractAttributeQuery"
import {
    IRelationshipAttributeHints,
    RelationshipAttributeHints,
    RelationshipAttributeHintsJSON
} from "./hints/RelationshipAttributeHints"

export interface RelationshipAttributeQueryJSON extends AbstractAttributeQueryJSON {
    key: string
    owner: string
    attributeHints: RelationshipAttributeHintsJSON
    thirdParty?: string
}

export interface IRelationshipAttributeQuery extends IAbstractAttributeQuery {
    key: string
    owner: ICoreAddress
    attributeHints: IRelationshipAttributeHints
    thirdParty?: ICoreAddress
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
    @validate()
    public attributeHints: RelationshipAttributeHints

    @serialize()
    @validate({ nullable: true })
    public thirdParty?: CoreAddress

    public static from(
        value: IRelationshipAttributeQuery | RelationshipAttributeQueryJSON
    ): RelationshipAttributeQuery {
        return this.fromAny(value)
    }
}
