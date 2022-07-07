import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreId, ICoreId } from "@nmshd/transport"
import { RequestItemJSON } from "../.."
import {
    IdentityAttribute,
    IdentityAttributeJSON,
    IIdentityAttribute,
    IRelationshipAttribute,
    RelationshipAttribute,
    RelationshipAttributeJSON
} from "../../../attributes"
import { IRequestItem, RequestItem } from "../../RequestItem"

export interface CreateAttributeRequestItemJSON extends RequestItemJSON {
    attribute: IdentityAttributeJSON | RelationshipAttributeJSON
    sourceAttributeId?: string
}

export interface ICreateAttributeRequestItem extends IRequestItem {
    attribute: IIdentityAttribute | IRelationshipAttribute
    sourceAttributeId?: ICoreId
}

@type("CreateAttributeRequestItem")
export class CreateAttributeRequestItem extends RequestItem implements ICreateAttributeRequestItem {
    @serialize({ unionTypes: [IdentityAttribute, RelationshipAttribute] })
    @validate()
    public attribute: IdentityAttribute | RelationshipAttribute

    @serialize()
    @validate({ nullable: true })
    public sourceAttributeId?: CoreId

    public static from(
        value: ICreateAttributeRequestItem | CreateAttributeRequestItemJSON
    ): CreateAttributeRequestItem {
        return this.fromAny(value)
    }
}
