import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, ICoreAddress } from "@nmshd/transport"
import { IRequest, Request, RequestJSON } from "./Request"

export interface AttributesShareRequestJSON extends RequestJSON {
    attributes: string[]
    recipients: string[]
}

export interface IAttributesShareRequest extends IRequest {
    attributes: string[]
    recipients: ICoreAddress[]
}

@type("AttributesShareRequest")
export class AttributesShareRequest extends Request implements IAttributesShareRequest {
    @serialize({ type: String })
    @validate()
    public attributes: string[]

    @serialize({ type: CoreAddress })
    @validate()
    public recipients: CoreAddress[]

    public static async from(value: IAttributesShareRequest): Promise<AttributesShareRequest> {
        return await super.fromT(value, AttributesShareRequest)
    }
}
