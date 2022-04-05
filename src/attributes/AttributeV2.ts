import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreSerializable, ICoreDate, ICoreSerializable } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "./AbstractAttributeValue"

export interface AttributeV2JSON extends ContentJSON {
    value: AbstractAttributeValueJSON
    createdAt: string
    tags?: string[]
    validFrom?: string
    validTo?: string
}

export interface IAttributeV2 extends ICoreSerializable {
    value: IAbstractAttributeValue
    createdAt: ICoreDate
    tags?: string[] | undefined
    validFrom?: ICoreDate
    validTo?: ICoreDate
}

@type("Attribute", { version: 2 })
export class AttributeV2 extends CoreSerializable implements IAttributeV2 {
    @serialize()
    @validate()
    public value: AbstractAttributeValue

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

    public static from(attribute: IAttributeV2): AttributeV2 {
        return super.fromT<AttributeV2>(attribute, AttributeV2)
    }
}
