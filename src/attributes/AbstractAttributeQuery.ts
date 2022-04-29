import { serialize, validate } from "@js-soft/ts-serval"
import { CoreSerializable, ICoreSerializable } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"
import { AbstractPeriod, AbstractPeriodJSON, IAbstractPeriod } from "./types/dates/AbstractPeriod"

export interface AbstractAttributeQueryJSON extends ContentJSON {
    valueType?: string
    validityPeriod?: AbstractPeriodJSON
}

export interface IAbstractAttributeQuery extends ICoreSerializable {
    valueType?: string
    validityPeriod?: IAbstractPeriod
}

export abstract class AbstractAttributeQuery extends CoreSerializable implements IAbstractAttributeQuery {
    @serialize()
    @validate({
        nullable: true,
        customValidator: (v) => (v === "" ? "must not be an empty string" : undefined)
    })
    public valueType?: string

    @serialize()
    @validate({ nullable: true })
    public validityPeriod?: AbstractPeriod
}
