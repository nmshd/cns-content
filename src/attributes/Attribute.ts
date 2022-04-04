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
    @serialize()
    @validate()
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

    private static convertDeprecatedAttribute(attribute: any): any {
        if (!attribute.content) {
            attribute.content = {}
        }
        attribute.content["@type"] = "DeprecatedAttribute"
        attribute.content.value = attribute.value

        if (attribute.tags) {
            attribute.tags = []
        }
        attribute.tags?.push(JSON.stringify(attribute.name))
        delete attribute.name
        delete attribute.value
    }

    public static from(attribute: IAttribute): Attribute {
        let attributeAny: any = attribute
        if (attributeAny.name) {
            attributeAny = this.convertDeprecatedAttribute(attributeAny)
        }

        return super.fromT<Attribute>(attributeAny, Attribute)
    }
}
