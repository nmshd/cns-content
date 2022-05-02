import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, ICoreAddress } from "@nmshd/transport"
import { AbstractAttributeQuery, AbstractAttributeQueryJSON, IAbstractAttributeQuery } from "./AbstractAttributeQuery"

export interface RelationshipAttributeQueryJSON extends AbstractAttributeQueryJSON {
    key: string
    owner: string
}

export interface IRelationshipAttributeQuery extends IAbstractAttributeQuery {
    key: string
    owner: ICoreAddress
}

@type("RelationshipAttributeQuery")
export class RelationshipAttributeQuery extends AbstractAttributeQuery implements IRelationshipAttributeQuery {
    @serialize()
    @validate()
    public key: string

    @serialize()
    @validate()
    public owner: CoreAddress

    public static from(
        value: IRelationshipAttributeQuery | RelationshipAttributeQueryJSON
    ): RelationshipAttributeQuery {
        return this.fromAny(value)
    }
}
