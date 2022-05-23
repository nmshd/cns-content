import { serialize, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreSerializable, ICoreDate, ICoreSerializable } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"

export interface AbstractAttributeQueryJSON extends ContentJSON {
    valueType?: string
    validfrom?: string
    validTo?: string
}

export interface IAbstractAttributeQuery extends ICoreSerializable {
    valueType?: string
    validfrom?: ICoreDate
    validTo?: ICoreDate
}

export abstract class AbstractAttributeQuery extends CoreSerializable implements IAbstractAttributeQuery {
    @serialize()
    @validate({
        customValidator: (v) => (v === "" ? "must not be an empty string" : undefined)
    })
    public valueType: string

    @serialize()
    @validate({ nullable: true })
    public validfrom?: CoreDate

    @serialize()
    @validate({ nullable: true })
    public validTo?: CoreDate
}
