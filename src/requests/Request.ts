import { ISerializable, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreId, ICoreDate, ICoreId } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"

export interface RequestJSON extends ContentJSON {
    id?: string
    key?: string
    reason?: string
    expiresAt?: string
}

export interface IRequest extends ISerializable {
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
}

@type("Request")
export abstract class Request extends SerializableAsync {
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
}
