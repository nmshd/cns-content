import { ContentJSON } from "../../ContentJSON"

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

export interface RequestItemV2JSON extends ContentJSON {
    /**
     * The human-readable title of this item.
     */
    title?: string

    /**
     * The human-readable description of this item.
     */
    description?: string

    /**
     * This propertycan be used to add some arbitrary metadata to this item. The content
     * of this property will be copied into the response on the side of the recipient, so
     * the sender can use it to identify the group content as they receive the response.
     */
    responseMetadata?: object
    /**
     * If set to `true`, the recipient has to accept this group if he wants to accept the
     * Request.
     * If set to `false`, the recipient can decide whether he wants to accept it or not.
     *
     * Caution: this setting does not take effect in case it is inside of a
     * {@link RequestItemGroupV2JSON RequestItemGroup}, which is not accepted by the recipient,
     * since a {@link RequestItemV2JSON RequestItem} can only be accepted if the parent group
     * is accepted as well.
     */
    mustBeAccepted: boolean
}

/**
 * A RequestItemGroup can be used to group one or more {@link RequestItemV2JSON RequestItems}. This is useful
 * if you want to
 * * make sure that the items in the group can only be accepted together
 *
 *   Example: when sending a `CreateAttributeRequestItem` **and** a `ShareAttributeRequestItem` in a single
 *   Request where the latter one targets an attribute created by the first one, it it should be impossible to
 *   reject the first item, while accepting the second one.
 * * visually group items on the UI and give the a common title/description
 */
export interface RequestItemGroupV2JSON extends ContentJSON {
    /**
     * The human-readable title of this group.
     */
    title?: string

    /**
     * The human-readable description of this group.
     */
    description?: string

    /**
     * If set to `true`, the recipient has to accept this group if he wants to accept the
     * Request.
     * If set to `false`, the recipient can decide whether he wants to accept it or not.
     */
    mustBeAccepted: boolean

    /**
     * This propertycan be used to add some arbitrary metadata to this group. The content
     * of this property will be copied into the response on the side of the recipient, so
     * the sender can use it to identify the group content as they receive the response.
     */
    responseMetadata?: object

    /**
     * The items of this group.
     */
    items: RequestItemV2JSON[]
}
