import { serialize, type, validate } from "@js-soft/ts-serval"
import {
    IdentityAttribute,
    IdentityAttributeJSON,
    IdentityAttributeQuery,
    IdentityAttributeQueryJSON,
    IIdentityAttribute,
    IIdentityAttributeQuery,
    IRelationshipAttribute,
    IRelationshipAttributeQuery,
    RelationshipAttribute,
    RelationshipAttributeJSON,
    RelationshipAttributeQuery,
    RelationshipAttributeQueryJSON
} from "../../../attributes"
import { IRequestItem, RequestItem, RequestItemJSON } from "../../RequestItem"
export interface ProposeAttributeRequestItemJSON extends RequestItemJSON {
    query: IdentityAttributeQueryJSON | RelationshipAttributeQueryJSON
    attribute: IdentityAttributeJSON | RelationshipAttributeJSON
}

export interface IProposeAttributeRequestItem extends IRequestItem {
    query: IIdentityAttributeQuery | IRelationshipAttributeQuery
    attribute: IIdentityAttribute | IRelationshipAttribute
}

@type("ProposeAttributeRequestItem")
export class ProposeAttributeRequestItem extends RequestItem implements IProposeAttributeRequestItem {
    @serialize({ unionTypes: [IdentityAttributeQuery, RelationshipAttributeQuery] })
    @validate()
    public query: IdentityAttributeQuery | RelationshipAttributeQuery

    @serialize({ unionTypes: [IdentityAttribute, RelationshipAttribute] })
    @validate()
    public attribute: IdentityAttribute | RelationshipAttribute

    public static from(value: IProposeAttributeRequestItem): ProposeAttributeRequestItem {
        return this.fromAny(value)
    }
}
