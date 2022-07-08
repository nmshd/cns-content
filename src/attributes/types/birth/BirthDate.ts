import { serialize, type, validate } from "@js-soft/ts-serval"
import nameOf from "easy-tsnameof"
import { DateTime } from "luxon"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { AbstractComplexValue, AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"
import { RenderHints, ValueHints } from "../../hints"
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
    public static readonly propertyNames = nameOf<BirthDate, never>()

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public day: BirthDay

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public month: BirthMonth

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public year: BirthYear

    public static get valueHints(): ValueHints {
        return ValueHints.from({
            propertyHints: {
                [this.propertyNames.day.$path]: BirthDay.valueHints,
                [this.propertyNames.month.$path]: BirthMonth.valueHints,
                [this.propertyNames.year.$path]: BirthYear.valueHints
            }
        })
    }

    public static override get renderHints(): RenderHints {
        return super.renderHints.copyWith({
            propertyHints: {
                [this.propertyNames.day.$path]: BirthDay.renderHints,
                [this.propertyNames.month.$path]: BirthMonth.renderHints,
                [this.propertyNames.year.$path]: BirthYear.renderHints
            }
        })
    }

    public static from(value: IBirthDate | BirthDateJSON): BirthDate {
        return this.fromAny(value)
    }

    public override toString(): string {
        return DateTime.fromObject({
            day: this.day.value,
            month: this.month.value,
            year: this.year.value
        }).toFormat("yyyy-MM-dd")
    }
}
