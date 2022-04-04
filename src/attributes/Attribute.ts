import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreSerializable, ICoreDate, ICoreSerializable } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "./AbstractAttributeValue"

export interface AttributeJSON extends ContentJSON {
    content?: AbstractAttributeValueJSON
    createdAt: string
    tags?: string[]
    validFrom?: string
    validTo?: string
}

export interface IAttribute extends ICoreSerializable {
    name?: string
    value?: any
    content?: IAbstractAttributeValue
    createdAt: ICoreDate
    tags?: string[] | undefined
    validFrom?: ICoreDate
    validTo?: ICoreDate
}

@type("Attribute")
export class Attribute extends CoreSerializable implements IAttribute {
    @serialize()
    @validate({ nullable: true })
    public name?: string

    @serialize()
    @validate({ nullable: true })
    public value?: string

    @serialize()
    @validate({ nullable: true })
    public content?: AbstractAttributeValue

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
        if (value.name) {
            if (!value.content) {
                value.content = {}
            }
            value.content["@type"] = "DeprecatedAttribute"
            value.content.value = value.value
            if (value.tags) {
                value.tags = []
            }
            value.tags?.push(JSON.stringify(value.name))
        }

        return super.fromT<Attribute>(value, Attribute)
    }
}
