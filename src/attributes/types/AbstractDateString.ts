import { serialize, validate } from "@js-soft/ts-serval"
import { DateTime } from "luxon"
import { AbstractAttributeValue } from "../AbstractAttributeValue"

export abstract class AbstractDateString extends AbstractAttributeValue {
    @serialize()
    @validate({
        customValidator: (v) =>
            !DateTime.fromFormat(v, "yyyy-MM-dd").isValid ? "must match the following format: 'yyyy-MM-dd'" : undefined
    })
    public value: string
}
