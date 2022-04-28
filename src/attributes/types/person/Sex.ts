import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractString } from "../AbstractString"

/**
 * Biologisches Geschlecht
 */
export enum BiolSex {
    M = "male",
    F = "female",
    X = "intersex"
}
@type("Sex")
export class Sex extends AbstractString {
    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(BiolSex).includes(v) ? `must be one of: ${Object.values(BiolSex)}` : undefined
    })
    public override value: BiolSex
}
