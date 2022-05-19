import { serialize, validate } from "@js-soft/ts-serval"
import { ValueHints } from "../../hints/ValueHints"
import { AbstractInteger } from "../AbstractInteger"

/**
 * Month values: 1 (january) - 12 (december)
 */
enum Month {
    January = 1,
    February = 2,
    March = 3,
    April = 4,
    May = 5,
    June = 6,
    July = 7,
    August = 8,
    September = 9,
    October = 10,
    November = 11,
    December = 12
}

/**
 * Month value are continuously numbered: 1 (january) - 12 (december)
 */
export class AbstractMonth extends AbstractInteger {
    @serialize()
    @validate({
        customValidator: (v) =>
            !Month[v] || !Number.isInteger(v)
                ? `must be an integer value between ${Month.January} and ${Month.December}`
                : undefined
    })
    public override value: Month

    public static override get valueHints(): ValueHints {
        return super.valueHints.copyWith({
            min: 1,
            max: 12
        })
    }
}
