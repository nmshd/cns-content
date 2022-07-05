import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreId, ICoreDate } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"
import { IRequestItemDerivations, RequestItemDerivations, RequestItemJSONDerivations } from "./RequestItem"
import { IRequestItemGroup, RequestItemGroup, RequestItemGroupJSON } from "./RequestItemGroup"

export interface RequestJSON extends ContentJSON {
    id?: string

    /**
     * The point in time the request is considered obsolete either technically (e.g. the request is no longer
     * valid or its response is no longer accepted) or from a business perspective (e.g. the request is no longer
     * of interest).
     * @default undefined - the request won't expire
     */
    expiresAt?: string

    /**
     * The items of the Request. Can be either a single {@link RequestItemJSONDerivations RequestItem} or a {@link RequestItemGroupJSON RequestItemGroup}, which itself can contain
     * further {@link RequestItemJSONDerivations RequestItems}.
     */
    items: (RequestItemGroupJSON | RequestItemJSONDerivations)[]

    /**
     * This property can be used to add some arbitrary metadata to this request. The content
     * of this property will be copied into the response on the side of the recipient.
     */
    metadata?: object
}

export interface IRequest extends ISerializable {
    id?: CoreId

    /**
     * The point in time the request is considered obsolete either technically (e.g. the request is no longer
     * valid or its response is no longer accepted) or from a business perspective (e.g. the request is no longer
     * of interest).
     * @default undefined - the request won't expire
     */
    expiresAt?: ICoreDate

    /**
     * The items of the Request. Can be either a single {@link IRequestItemDerivations RequestItem} or a {@link IRequestItemGroup RequestItemGroup}, which itself can contain
     * further {@link IRequestItemDerivations RequestItems}.
     */
    items: (IRequestItemGroup | IRequestItemDerivations)[]

    /**
     * This property can be used to add some arbitrary metadata to this request. The content
     * of this property will be copied into the response on the side of the recipient.
     */
    metadata?: object
}

@type("Request")
export class Request extends Serializable implements IRequest {
    @serialize()
    @validate({ nullable: true })
    public id?: CoreId

    @serialize()
    @validate({ nullable: true })
    public expiresAt?: CoreDate

    @serialize()
    @validate({ customValidator: (v) => (v.length < 1 ? "may not be empty" : undefined) })
    public items: (RequestItemGroup | RequestItemDerivations)[]

    @serialize()
    @validate({ nullable: true })
    public metadata?: object

    public static from(value: IRequest | RequestJSON): Request {
        return this.fromAny(value)
    }
}
