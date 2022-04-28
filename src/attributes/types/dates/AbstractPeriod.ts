import { serialize, validate } from "@js-soft/ts-serval"
import { CoreDate, ICoreDate } from "@nmshd/transport"
import { AbstractComplexValue, AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"
import { AbstractStringJSON, IAbstractString } from "../AbstractString"

export interface AbstractPeriodJSON extends AbstractComplexValueJSON {
    start?: AbstractStringJSON
    end?: AbstractStringJSON
}

export interface IAbstractPeriod extends IAbstractComplexValue {
    start?: ICoreDate | IAbstractString | string
    end?: ICoreDate | IAbstractString | string
}

export class AbstractPeriod extends AbstractComplexValue implements IAbstractPeriod {
    @serialize()
    @validate({ nullable: true })
    public start?: CoreDate

    @serialize()
    @validate({ nullable: true })
    public end?: CoreDate

    public static from(value: IAbstractPeriod | AbstractPeriodJSON): AbstractPeriod {
        return this.fromAny(value)
    }
}
