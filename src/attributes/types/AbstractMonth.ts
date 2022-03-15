import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../AbstractAttributeValue"

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

export abstract class AbstractMonth extends AbstractAttributeValue {
    @serialize()
    @validate({ customValidator: (v) => (!Month[v] ? "has invalid value" : undefined) })
    public value: Month
}
