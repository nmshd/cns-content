import { ISerializableAsync, SerializableAsync, serialize, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"

export interface RequestItemJSON extends ContentJSON {
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
     * {@link RequestItemGroupJSON RequestItemGroup}, which is not accepted by the recipient,
     * since a {@link RequestItemJSON RequestItem} can only be accepted if the parent group
     * is accepted as well.
     */
    mustBeAccepted: boolean
}

export interface IRequestItem extends ISerializableAsync {
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
     * {@link RequestItemGroup RequestItemGroup}, which is not accepted by the recipient,
     * since a {@link RequestItem RequestItem} can only be accepted if the parent group
     * is accepted as well.
     */
    mustBeAccepted: boolean
}

export abstract class RequestItem extends SerializableAsync {
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