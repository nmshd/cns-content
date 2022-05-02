import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractString } from "../AbstractString"

/**
 * Biologisches Geschlecht
 */
export enum BiologicalSex {
    M = "male",
    F = "female",
    X = "intersex"
}
@type("Sex")
export class Sex extends AbstractString {
    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(BiologicalSex).includes(v) ? `must be one of: ${Object.values(BiologicalSex)}` : undefined
    })
    public override value: BiologicalSex
}
