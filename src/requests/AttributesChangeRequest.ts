import { ISerializable, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, CoreDate, CoreId, ICoreAddress, ICoreDate, ICoreId } from "@nmshd/transport"
import { Attribute, AttributeJSON, IAttribute } from "../attributes/Attribute"
import { ContentJSON } from "../ContentJSON"

export interface AttributesChangeRequestJSON extends ContentJSON {
    id?: string
    key?: string
    reason?: string
    expiresAt?: string
    impact?: string
    attributes: AttributeJSON[]
    applyTo?: string
}

export interface IAttributesChangeRequest extends ISerializable {
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

    attributes: IAttribute[]
    applyTo?: ICoreAddress
}

@type("AttributesChangeRequest")
export class AttributesChangeRequest extends SerializableAsync implements IAttributesChangeRequest {
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
