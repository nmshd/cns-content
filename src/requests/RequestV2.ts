import { ISerializableAsync, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreId, ICoreDate } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"
import { IRequestItemGroupV2, RequestItemGroupV2, RequestItemGroupV2JSON } from "./RequestItemGroupV2"
import { IRequestItemV2, RequestItemV2, RequestItemV2JSON } from "./RequestItemV2"

export interface RequestV2JSON extends ContentJSON {
    id?: string

    /**
     * The technial key of the Request which is submitted back with the answer. This can be used
     * for mapping requests and answers. The key should be unique and non-personal, best a random UUID.
     * @default undefined - no key is used
     * @deprecated `key` should not be used anymore. Instead, use {@link RequestItemV2JSON.responseMetadata RequestItem.responseMetadata}
     * or {@link RequestItemGroupV2JSON.responseMetadata RequestItemGroup.responseMetadata}.
     */
    key?: string

    /**
     * The point in time the request is considered obsolete either technically (e.g. the request is no longer
     * valid or its response is no longer accepted) or from a business perspective (e.g. the request is no longer
     * of interest).
     * @default undefined - the request won't expire
     */
    expiresAt?: string

    /**
     * The items of the Request. Can be either a single {@link RequestItemV2JSON RequestItem} or a {@link RequestItemGroupV2JSON RequestItemGroup}, which itself can contain
     * further {@link RequestItemV2JSON RequestItems}.
     */
    items: (RequestItemGroupV2JSON | RequestItemV2JSON)[]
}

export interface IRequestV2 extends ISerializableAsync {
    id?: CoreId

    /**
     * The technial key of the Request which is submitted back with the answer. This can be used
     * for mapping requests and answers. The key should be unique and non-personal, best a random UUID.
     * @default undefined - no key is used
     * @deprecated `key` should not be used anymore. Instead, use {@link RequestItemV2.responseMetadata RequestItem.responseMetadata}
     * or {@link RequestItemGroupV2.responseMetadata RequestItemGroup.responseMetadata}.
     */
    key?: string

    /**
     * The point in time the request is considered obsolete either technically (e.g. the request is no longer
     * valid or its response is no longer accepted) or from a business perspective (e.g. the request is no longer
     * of interest).
     * @default undefined - the request won't expire
     */
    expiresAt?: ICoreDate

    /**
     * The items of the Request. Can be either a single {@link RequestItemV2 RequestItem} or a {@link RequestItemGroupV2 RequestItemGroup}, which itself can contain
     * further {@link RequestItemV2 RequestItems}.
     */
    items: (IRequestItemGroupV2 | IRequestItemV2)[]
}

@type("RequestV2")
export class RequestV2 extends SerializableAsync implements IRequestV2 {
    @serialize()
    @validate({ nullable: true })
    public id?: CoreId

    @serialize()
    @validate({ nullable: true })
    public expiresAt?: CoreDate

    @serialize()
    @validate({ customValidator: (v) => (v.length < 1 ? "may not be empty" : undefined) })
    public items: (RequestItemGroupV2 | RequestItemV2)[]

    public static async from(value: IRequestV2 | RequestV2JSON): Promise<RequestV2> {
        return await SerializableAsync.fromT<RequestV2>(value, RequestV2)
    }
}
