import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

/**
 * Biologisches Geschlecht
 */
export enum BiolSex {
    M = "male",
    F = "female",
    X = "diverse"
}
@type("Sex")
export class Sex extends AbstractAttributeValue {
    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(BiolSex).includes(v) ? `must be one of: ${Object.values(BiolSex)}` : undefined
    })
    public value: BiolSex
}
