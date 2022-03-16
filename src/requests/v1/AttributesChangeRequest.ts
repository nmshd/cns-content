import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, CoreDate, CoreId, ICoreAddress } from "@nmshd/transport"
import { Attribute, AttributeJSON, IAttribute } from "../../attributes/Attribute"
import { IRequest, Request, RequestJSON } from "./Request"

export interface AttributesChangeRequestJSON extends RequestJSON {
    attributes: AttributeJSON[]
    applyTo?: string
}

export interface IAttributesChangeRequest extends IRequest {
    attributes: IAttribute[]
    applyTo?: ICoreAddress
}

@type("AttributesChangeRequest")
export class AttributesChangeRequest extends Request implements IAttributesChangeRequest {
    @serialize({ type: Attribute })
    @validate()
    public attributes: Attribute[]

    @serialize()
    @validate({ nullable: true })
    public applyTo?: CoreAddress

    public static async from(value: IAttributesChangeRequest): Promise<AttributesChangeRequest> {
        return (await super.from(value, AttributesChangeRequest)) as AttributesChangeRequest
    }

    public static async fromJSON(value: AttributesChangeRequestJSON): Promise<AttributesChangeRequest> {
        const parsedAttributes = await Promise.all(value.attributes.map((attribute) => Attribute.fromJSON(attribute)))
        return await this.from({
            id: value.id ? CoreId.from(value.id) : undefined,
            attributes: parsedAttributes,
            applyTo: value.applyTo ? CoreAddress.from(value.applyTo) : undefined,
            expiresAt: value.expiresAt ? CoreDate.from(value.expiresAt) : undefined,
            key: value.key,
            reason: value.reason
        })
    }
}
