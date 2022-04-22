import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractStringValue } from "../AbstractStringValue"

/**
 * Biologisches Geschlecht
 */
export enum BiolSex {
    M = "male",
    F = "female",
    X = "diverse"
}
@type("Sex")
export class Sex extends AbstractStringValue {
    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(BiolSex).includes(v) ? `must be one of: ${Object.values(BiolSex)}` : undefined
    })
    public override value: BiolSex
}
