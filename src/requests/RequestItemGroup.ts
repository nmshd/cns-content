import { ISerializable, Serializable, serialize, type, validate, ValidationError } from "@js-soft/ts-serval"
import { nameof } from "ts-simple-nameof"
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
     * This property can be used to add some arbitrary metadata to this group. The content
     * of this property will be copied into the response on the side of the recipient, so
     * the sender can use it to identify the group content as they receive the response.
     */
    metadata?: object

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
export interface IRequestItemGroup extends ISerializable {
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
     * This property can be used to add some arbitrary metadata to this group. The content
     * of this property will be copied into the response on the side of the recipient, so
     * the sender can use it to identify the group content as they receive the response.
     */
    metadata?: object

    /**
     * The items of this group.
     */
    items: IRequestItem[]
}

@type("RequestItemGroup")
export class RequestItemGroup extends Serializable {
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
    public metadata?: object

    public static from(value: IRequestItemGroup | RequestItemGroupJSON): RequestItemGroup {
        return this.fromAny(value)
    }

    protected static override postFrom<T extends Serializable>(value: T): T {
        if (!(value instanceof RequestItemGroup)) throw new Error("this should never happen")

        if (value.mustBeAccepted && value.items.every((item) => !item.mustBeAccepted)) {
            throw new ValidationError(
                RequestItemGroup.name,
                nameof<RequestItemGroup>((x) => x.mustBeAccepted),
                `${nameof<RequestItemGroup>(
                    (x) => x.mustBeAccepted
                )} can only be true if at least one item is flagged as ${nameof<RequestItemGroup>(
                    (x) => x.mustBeAccepted
                )}`
            )
        }

        return value
    }
}
