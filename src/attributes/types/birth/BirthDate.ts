import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { AbstractComplexValue, AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"
import { AbstractIntegerJSON, IAbstractInteger } from "../AbstractInteger"
import { BirthDay } from "./BirthDay"
import { BirthMonth } from "./BirthMonth"
import { BirthYear } from "./BirthYear"

export interface BirthDateJSON extends AbstractComplexValueJSON {
    day: AbstractIntegerJSON
    month: AbstractIntegerJSON
    year: AbstractIntegerJSON
}

export interface IBirthDate extends IAbstractComplexValue {
    day: BirthDay | IAbstractInteger | number
    month: BirthMonth | IAbstractInteger | number
    year: BirthYear | IAbstractInteger | number
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
