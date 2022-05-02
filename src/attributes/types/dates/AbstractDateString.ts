import { serialize, validate } from "@js-soft/ts-serval"
import { DateTime } from "luxon"
import { AbstractString } from "../AbstractString"

export abstract class AbstractDateString extends AbstractString {
    private static readonly format = "yyyy-MM-dd"

    @serialize()
    @validate({
        customValidator: (v) =>
            !DateTime.fromFormat(v, AbstractDateString.format).isValid
                ? `must match the following format: '${AbstractDateString.format}'`
                : undefined
    })
    public override value: string
}
