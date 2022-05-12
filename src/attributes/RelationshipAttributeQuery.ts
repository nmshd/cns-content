import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, ICoreAddress } from "@nmshd/transport"
import { AbstractAttributeQuery, AbstractAttributeQueryJSON, IAbstractAttributeQuery } from "./AbstractAttributeQuery"
import { AttributeHints, AttributeHintsJSON, IAttributeHints } from "./hints/AttributeHints"

export interface RelationshipAttributeQueryJSON extends AbstractAttributeQueryJSON {
    key: string
    owner: string
    attributeHints: AttributeHintsJSON
    thirdParty?: string
}

export interface IRelationshipAttributeQuery extends IAbstractAttributeQuery {
    key: string
    owner: ICoreAddress
    attributeHints: IAttributeHints
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
    public attributeHints: AttributeHints

    @serialize()
    @validate({ nullable: true })
    public thirdParty?: CoreAddress

    public static from(
        value: IRelationshipAttributeQuery | RelationshipAttributeQueryJSON
    ): RelationshipAttributeQuery {
        return this.fromAny(value)
    }
}
