import { serialize, type, validate } from "@js-soft/ts-serval"
import { RequestItemJSON } from "../.."
import {
    IdentityAttribute,
    IIdentityAttribute,
    IRelationshipAttribute,
    RelationshipAttribute
} from "../../../attributes"
import { AbstractAttributeJSON } from "../../../attributes/AbstractAttribute"
import { IRequestItem, RequestItem } from "../../RequestItem"

export interface CreateAttributeRequestItemJSON extends RequestItemJSON {
    attribute: AbstractAttributeJSON
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
