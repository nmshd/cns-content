import { ISerializableAsync, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreId, ICoreDate } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"
import { IRequestItem, RequestItem, RequestItemJSON } from "./RequestItem"
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
     * The items of the Request. Can be either a single {@link RequestItemJSON RequestItem} or a {@link RequestItemGroupJSON RequestItemGroup}, which itself can contain
     * further {@link RequestItemJSON RequestItems}.
     */
    items: (RequestItemGroupJSON | RequestItemJSON)[]
}

export interface IRequest extends ISerializableAsync {
    id?: CoreId

    /**
     * The point in time the request is considered obsolete either technically (e.g. the request is no longer
     * valid or its response is no longer accepted) or from a business perspective (e.g. the request is no longer
     * of interest).
     * @default undefined - the request won't expire
     */
    expiresAt?: ICoreDate

    /**
     * The items of the Request. Can be either a single {@link RequestItem RequestItem} or a {@link RequestItemGroup RequestItemGroup}, which itself can contain
     * further {@link RequestItem RequestItems}.
     */
    items: (IRequestItemGroup | IRequestItem)[]
}

@type("Request")
export class Request extends SerializableAsync implements IRequest {
    @serialize()
    @validate({ nullable: true })
    public id?: CoreId

    @serialize()
    @validate({ nullable: true })
    public expiresAt?: CoreDate

    @serialize()
    @validate({ customValidator: (v) => (v.length < 1 ? "may not be empty" : undefined) })
    public items: (RequestItemGroup | RequestItem)[]

    public static async from(value: IRequest | RequestJSON): Promise<Request> {
        return await SerializableAsync.fromT<Request>(value, Request)
    }
}
