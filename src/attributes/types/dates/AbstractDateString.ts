import { serialize, validate } from "@js-soft/ts-serval"
import { DateTime } from "luxon"
import { AbstractStringValue } from "../AbstractStringValue"

export abstract class AbstractDateStringValue extends AbstractStringValue {
    private static readonly format = "yyyy-MM-dd"

    @serialize()
    @validate({
        customValidator: (v) =>
            !DateTime.fromFormat(v, AbstractDateStringValue.format).isValid
                ? `must match the following format: '${AbstractDateStringValue.format}'`
                : undefined
    })
    public override value: string
}
