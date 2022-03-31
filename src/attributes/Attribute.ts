import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreSerializable, ICoreDate, ICoreSerializable } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "./AbstractAttributeValue"

export interface AttributeJSON extends ContentJSON {
    content: AbstractAttributeValueJSON
    createdAt: string
    tags?: string[]
    validFrom?: string
    validTo?: string
}

export interface IAttribute extends ICoreSerializable {
    content: IAbstractAttributeValue
    createdAt: ICoreDate
    tags?: string[] | undefined
    validFrom?: ICoreDate
    validTo?: ICoreDate
}

@type("Attribute")
export class Attribute extends CoreSerializable implements IAttribute {
    @validate()
    @serialize()
    public content: AbstractAttributeValue

    @validate()
    @serialize()
    public createdAt: CoreDate

    @serialize({ type: String })
    @validate({ nullable: true })
    public tags?: string[]

    @serialize()
    @validate({ nullable: true })
    public validFrom?: CoreDate

    @serialize()
    @validate({ nullable: true })
    public validTo?: CoreDate

    public static from(value: IAttribute): Attribute {
        if (value.content.name) {
            value.content["@type"] = "DeprecatedAttribute"
            if (value.tags) {
                value.tags = []
            }
            value.tags?.push(JSON.stringify(value.content.name))
        }

        return super.fromT<Attribute>(value, Attribute)
    }

    public static fromJSON(attribute: AttributeJSON): Attribute {
        if (attribute.content.name) {
            attribute.content["@type"] = "DeprecatedAttribute"
            if (attribute.tags) {
                attribute.tags = []
            }
            attribute.tags?.push(JSON.stringify(attribute.content.name))
        }

        return super.fromT<Attribute>(attribute, Attribute)
    }
}
