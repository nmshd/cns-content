import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreId } from "@nmshd/transport"
import { AttributeQueryContainer } from "../attributes"
import { IRequest, Request, RequestJSON } from "./Request"

export interface AttributesRequestJSON extends RequestJSON {
    queries: AttributeQueryContainer[]
    required: boolean
}

export interface IAttributesRequest extends IRequest {
    queries: AttributeQueryContainer[]
    /**
     * Whether or not this attribute request is required or optional
     * @default undefined - the attribute request is optional
     */
    required?: boolean
}

@type("AttributesRequest")
export class AttributesRequest extends Request implements IAttributesRequest {
    @serialize({ type: AttributeQueryContainer })
    @validate()
    public queries: AttributeQueryContainer[]

    @serialize()
    @validate({ nullable: true })
    public required?: boolean

    public static async from(value: IAttributesRequest): Promise<AttributesRequest> {
        return (await super.from(value, AttributesRequest)) as AttributesRequest
    }

    public static async fromJSON(value: AttributesRequestJSON): Promise<AttributesRequest> {
        return await this.from({
            id: value.id ? CoreId.from(value.id) : undefined,
            expiresAt: value.expiresAt ? CoreDate.from(value.expiresAt) : undefined,
            key: value.key,
            reason: value.reason,
            queries: value.queries,
            required: value.required
        })
    }
}
