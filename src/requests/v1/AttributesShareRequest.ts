import { ISerializable, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, CoreDate, CoreId, ICoreAddress, ICoreDate, ICoreId } from "@nmshd/transport"
import { ContentJSON } from "../../ContentJSON"

export interface AttributesShareRequestJSON extends ContentJSON {
    id?: string
    key?: string
    reason?: string
    expiresAt?: string
    impact?: string
    attributes: string[]
    recipients: string[]
}

export interface IAttributesShareRequest extends ISerializable {
    id?: ICoreId
    /**
     * The technial key of the request which is submitted back with the answer. This can be used
     * for mapping requests and answers. The key should be unique and non-personal, best a random UUID.
     * @default undefined - no key is used
     */
    key?: string
    /**
     * The human-readable reason for this request. This can be used to provide the user with more input
     * why this request is necessary and should be answered.
     * @default undefined - no reason is given
     */
    reason?: string
    /**
     * The point in time the request is considered obsolete either technically (e.g. the request is no longer
     * valid or its response is no longer accepted) or from a business perspective (e.g. the request is no longer
     * of interest).
     * @default undefined - the request won't expire
     */
    expiresAt?: ICoreDate

    /**
     * The impact of this request. This can be used to show the user what happens if the user does not accept the request.
     *
     * @default undefined - no specific impact
     */
    impact?: string

    attributes: string[]
    recipients: ICoreAddress[]
}

@type("AttributesShareRequest")
export class AttributesShareRequest extends SerializableAsync implements IAttributesShareRequest {
    @serialize()
    @validate({ nullable: true })
    public id?: CoreId

    @serialize()
    @validate({ nullable: true })
    public key?: string

    @serialize()
    @validate({ nullable: true })
    public reason?: string

    @serialize()
    @validate({ nullable: true })
    public expiresAt?: CoreDate

    @serialize()
    @validate({ nullable: true })
    public impact?: string

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
