import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { AbstractComplexValue, AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"
import { AbstractIntegerValueJSON, IAbstractIntegerValue } from "../AbstractIntegerValue"
import { BirthDay } from "./BirthDay"
import { BirthMonth } from "./BirthMonth"
import { BirthYear } from "./BirthYear"

export interface BirthDateJSON extends AbstractComplexValueJSON {
    day: AbstractIntegerValueJSON
    month: AbstractIntegerValueJSON
    year: AbstractIntegerValueJSON
}

export interface IBirthDate extends IAbstractComplexValue {
    day: BirthDay | IAbstractIntegerValue | number
    month: BirthMonth | IAbstractIntegerValue | number
    year: BirthYear | IAbstractIntegerValue | number
}

@type("BirthDate")
export class BirthDate extends AbstractComplexValue implements IBirthDate {
    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public day: BirthDay

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public month: BirthMonth

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public year: BirthYear

    public static from(value: IBirthDate | BirthDateJSON): BirthDate {
        return this.fromAny(value)
    }
}
