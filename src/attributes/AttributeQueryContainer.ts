import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreSerializable, ICoreSerializable } from "@nmshd/transport"
import { nameof } from "ts-simple-nameof"
import { AttributeQuery, IAttributeQuery } from "./AttributeQuery"

export interface IAttributeQueryContainer extends ICoreSerializable {
    query: IAttributeQuery
    filterValid: boolean
    userText?: string
}

@type("AttributeQueryContainer")
export class AttributeQueryContainer extends CoreSerializable implements IAttributeQueryContainer {
    public readonly technicalProperties = [
        nameof<AttributeQueryContainer>((r) => r.query),
        nameof<AttributeQueryContainer>((r) => r.filterValid),
        nameof<AttributeQueryContainer>((r) => r.userText)
    ]

    @serialize()
    @validate()
    public query: AttributeQuery

    @serialize()
    @validate()
    public filterValid: boolean

    @serialize()
    @validate({ nullable: true })
    public userText?: string

    public static from(value: IAttributeQueryContainer): AttributeQueryContainer {
        return super.fromT<AttributeQueryContainer>(value, AttributeQueryContainer)
    }
}
