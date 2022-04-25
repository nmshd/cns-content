import { serialize, validate } from "@js-soft/ts-serval"
import { CoreSerializable, ICoreSerializable } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"
import { AbstractPeriodJSON, AbstractPeriodValue, IAbstractPeriod } from "./types/dates/AbstractPeriodValue"

export interface AbstractAttributeQueryJSON extends ContentJSON {
    attributeType?: string
    validityPeriod?: AbstractPeriodJSON
}

export interface IAbstractAttributeQuery extends ICoreSerializable {
    attributeType?: string
    validityPeriod?: IAbstractPeriod
}

export abstract class AbstractAttributeQuery extends CoreSerializable implements IAbstractAttributeQuery {
    @serialize()
    @validate({
        nullable: true,
        customValidator: (v) => (v === "" ? "must not be an empty string" : undefined)
    })
    public attributeType?: string

    @serialize()
    @validate({ nullable: true })
    public validityPeriod?: AbstractPeriodValue
}
