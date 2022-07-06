import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, CoreId, ICoreAddress, ICoreId } from "@nmshd/transport"
import { IRequestItem, RequestItem, RequestItemJSON } from "../../RequestItem"

export interface ShareAttributeRequestItemJSON extends RequestItemJSON {
    attributeId: string
    shareWith: string
}

export interface IShareAttributeRequestItem extends IRequestItem {
    attributeId: ICoreId
    shareWith: ICoreAddress
}

@type("ShareAttributeRequestItem")
export class ShareAttributeRequestItem extends RequestItem implements IShareAttributeRequestItem {
    @serialize()
    @validate()
    public attributeId: CoreId

    @serialize()
    @validate()
    public shareWith: CoreAddress

    public static from(value: IShareAttributeRequestItem | ShareAttributeRequestItemJSON): ShareAttributeRequestItem {
        return this.fromAny(value)
    }
}
