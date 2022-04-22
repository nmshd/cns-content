import { serialize, validate } from "@js-soft/ts-serval"
import { CoreSerializable, ICoreSerializable } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"

export interface AbstractAttributeQueryJSON extends ContentJSON {
    attributeType?: string
    onlyValid: boolean
}

export interface IAbstractAttributeQuery extends ICoreSerializable {
    attributeType?: string
    onlyValid: boolean
}

export abstract class AbstractAttributeQuery extends CoreSerializable implements IAbstractAttributeQuery {
    @serialize()
    @validate({
        nullable: true,
        customValidator: (v) => (v === "" ? "must not be an empty string" : undefined)
    })
    public attributeType?: string

    @serialize()
    @validate()
    public onlyValid: boolean
}
