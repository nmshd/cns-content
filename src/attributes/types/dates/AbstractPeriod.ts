import { serialize, validate } from "@js-soft/ts-serval"
import { CoreDate, ICoreDate } from "@nmshd/transport"
import { AbstractComplexValue, AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"
import { AbstractStringValueJSON, IAbstractStringValue } from "../AbstractStringValue"

export interface AbstractPeriodJSON extends AbstractComplexValueJSON {
    start?: AbstractStringValueJSON
    end?: AbstractStringValueJSON
}

export interface IAbstractPeriod extends IAbstractComplexValue {
    start?: ICoreDate | IAbstractStringValue | string
    end?: ICoreDate | IAbstractStringValue | string
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
