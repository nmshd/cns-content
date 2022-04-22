import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreId, ICoreDate, ICoreId } from "@nmshd/transport"
import { ContentJSON } from "../../ContentJSON"

export interface AttributesRequestJSON extends ContentJSON {
    id?: string
    key?: string
    reason?: string
    expiresAt?: string
    names: string[]
    required: boolean
}

export interface IAttributesRequest extends ISerializable {
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

    names: string[]
    /**
     * Whether or not this attribute request is required or optional
     * @default undefined - the attribute request is optional
     */
    required?: boolean
}

@type("AttributesRequest")
export class AttributesRequest extends Serializable implements IAttributesRequest {
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

    @serialize({ type: String })
    @validate()
    public names: string[]

    @serialize()
    @validate({ nullable: true })
    public required?: boolean

    public static from(value: IAttributesRequest): AttributesRequest {
        return this.fromAny(value)
    }

    public static fromJSON(value: AttributesRequestJSON): AttributesRequest {
        return this.from({
            id: value.id ? CoreId.from(value.id) : undefined,
            expiresAt: value.expiresAt ? CoreDate.from(value.expiresAt) : undefined,
            key: value.key,
            reason: value.reason,
            names: value.names,
            required: value.required
        })
    }
}
