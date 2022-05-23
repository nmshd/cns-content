import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreId, ICoreId } from "@nmshd/transport"
import { AbstractAttribute, AbstractAttributeJSON, IAbstractAttribute } from "../../../attributes/AbstractAttribute"
import { AcceptResponseItem, AcceptResponseItemJSON, IAcceptResponseItem } from "../../response"

export interface ReadAttributeAcceptResponseItemJSON extends AcceptResponseItemJSON {
    attributeId: string
    attribute: AbstractAttributeJSON
}

export interface IReadAttributeAcceptResponseItem extends IAcceptResponseItem {
    attributeId: ICoreId
    attribute: IAbstractAttribute
}

@type("AcceptReadAttributeResponseItem")
export class ReadAttributeAcceptResponseItem extends AcceptResponseItem implements IReadAttributeAcceptResponseItem {
    @serialize()
    @validate()
    public attributeId: CoreId

    @serialize()
    @validate()
    public attribute: AbstractAttribute

    public static override from(
        value: IReadAttributeAcceptResponseItem | ReadAttributeAcceptResponseItemJSON
    ): ReadAttributeAcceptResponseItem {
        return this.fromAny(value)
    }
}
