import { ISerializableAsync, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"
import { IRequestItem, RequestItem, RequestItemJSON } from "./RequestItem"

/**
 * A RequestItemGroup can be used to group one or more {@link RequestItemJSON RequestItems}. This is useful
 * if you want to
 * * make sure that the items in the group can only be accepted together
 *
 *   Example: when sending a `CreateAttributeRequestItem` **and** a `ShareAttributeRequestItem` in a single
 *   Request where the latter one targets an attribute created by the first one, it it should be impossible to
 *   reject the first item, while accepting the second one.
 * * visually group items on the UI and give the a common title/description
 */
export interface RequestItemGroupJSON extends ContentJSON {
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
    items: RequestItemJSON[]
}

/**
 * A RequestItemGroup can be used to group one or more {@link RequestItem RequestItems}. This is useful
 * if you want to
 * * make sure that the items in the group can only be accepted together
 *
 *   Example: when sending a `CreateAttributeRequestItem` **and** a `ShareAttributeRequestItem` in a single
 *   Request where the latter one targets an attribute created by the first one, it it should be impossible to
 *   reject the first item, while accepting the second one.
 * * visually group items on the UI and give the a common title/description
 */
export interface IRequestItemGroup extends ISerializableAsync {
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
    items: IRequestItem[]
}

@type("RequestItemGroup")
export class RequestItemGroup extends SerializableAsync {
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
    @validate({ customValidator: (v) => (v.length < 1 ? "may not be empty" : undefined) })
    public items: RequestItem[]

    @serialize()
    @validate({ nullable: true })
    public responseMetadata?: object

    public static async from(value: IRequestItemGroup | RequestItemGroupJSON): Promise<RequestItemGroup> {
        return await super.fromT(value, RequestItemGroup)
    }
}
