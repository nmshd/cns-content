import { ISerializableAsync, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"

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

export interface IRequestItemV2 extends ISerializableAsync {
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
     * {@link RequestItemGroupV2 RequestItemGroup}, which is not accepted by the recipient,
     * since a {@link RequestItemV2 RequestItem} can only be accepted if the parent group
     * is accepted as well.
     */
    mustBeAccepted: boolean
}

@type("RequestItem")
export class RequestItemV2 extends SerializableAsync {
    @serialize()
    @validate({ nullable: true })
    public title?: string
    @serialize()
    @validate({ nullable: true })
    public description?: string

    @serialize()
    @validate()
    public mustBeAccepted: boolean

    @serialize()
    @validate({ nullable: true })
    public responseMetadata?: object
}
