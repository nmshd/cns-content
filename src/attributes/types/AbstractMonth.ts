import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../AbstractAttributeValue"
/**
 * Month value are continuously numbered: 1 (january) - 12 (december)
 */

enum Month {
    January = 1,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

export abstract class AbstractMonth extends AbstractAttributeValue {
    @serialize()
    @validate({ customValidator: (v) => (!Month[v] ? "has invalid value" : undefined) })
    public value: Month
}
