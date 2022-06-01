import { serialize, type, validate } from "@js-soft/ts-serval"
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
}

export interface ICreateAttributeRequestItem extends IRequestItem {
    attribute: IIdentityAttribute | IRelationshipAttribute
}

@type("CreateAttributeRequestItem")
export class CreateAttributeRequestItem extends RequestItem implements ICreateAttributeRequestItem {
    @serialize()
    @validate()
    public attribute: IdentityAttribute | RelationshipAttribute

    public static from(
        value: ICreateAttributeRequestItem | CreateAttributeRequestItemJSON
    ): CreateAttributeRequestItem {
        return this.fromAny(value)
    }
}
