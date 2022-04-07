import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../AbstractAttributeValue"

const dateRegex = new RegExp("d{4}-1[0-2]|0[1-9]-3[01]|[12][0-9]|0[1-9]")

export abstract class AbstractDateString extends AbstractAttributeValue {
    @serialize()
    @validate({
        customValidator: (v) => (!dateRegex.test(v) ? "must match the following format: 'yyyy-MM-dd'" : undefined)
    })
    public value: string
}
