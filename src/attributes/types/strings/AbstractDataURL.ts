import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractString } from "../AbstractString"

export abstract class AbstractDataURL extends AbstractString {
    @serialize()
    @validate({
        customValidator: (v) => (v.length > 4096 ? "must be less than 4096 characters" : undefined)
    })
    public override value: string
}
