import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreId, ICoreId } from "@nmshd/transport"
import { ContentJSON } from "../../../ContentJSON"

export interface CreateAttributeAcceptResponseItemJSON extends ContentJSON {
    attributeId: string
}

export interface ICreateAttributeAcceptResponseItem extends ISerializable {
    attributeId: ICoreId
}

@type("CreateAttributeAcceptResponseItem")
export class CreateAttributeAcceptResponseItem extends Serializable implements ICreateAttributeAcceptResponseItem {
    @serialize()
    @validate()
    public attributeId: CoreId

    public static from(
        value: ICreateAttributeAcceptResponseItem | CreateAttributeAcceptResponseItemJSON
    ): CreateAttributeAcceptResponseItem {
        return this.fromAny(value)
    }
}
