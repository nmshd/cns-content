import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreId, ICoreId } from "@nmshd/transport"
import {
    IdentityAttribute,
    IdentityAttributeJSON,
    IIdentityAttribute,
    IRelationshipAttribute,
    RelationshipAttribute,
    RelationshipAttributeJSON
} from "../../../attributes"
import { AcceptResponseItem, AcceptResponseItemJSON, IAcceptResponseItem } from "../../response"

export interface ReadAttributeAcceptResponseItemJSON extends AcceptResponseItemJSON {
    attributeId: string
    attribute: IdentityAttributeJSON | RelationshipAttributeJSON
}

export interface IReadAttributeAcceptResponseItem extends IAcceptResponseItem {
    attributeId: ICoreId
    attribute: IIdentityAttribute | IRelationshipAttribute
}

@type("AcceptReadAttributeResponseItem")
export class ReadAttributeAcceptResponseItem extends AcceptResponseItem implements IReadAttributeAcceptResponseItem {
    @serialize()
    @validate()
    public attributeId: CoreId

    @serialize()
    @validate()
    public attribute: IdentityAttribute | RelationshipAttribute

    public static override from(
        value: IReadAttributeAcceptResponseItem | ReadAttributeAcceptResponseItemJSON
    ): ReadAttributeAcceptResponseItem {
        return this.fromAny(value)
    }
}
