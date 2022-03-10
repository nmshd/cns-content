import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute } from "../../AbstractAttribute"

/**
 * Soziales Geschlecht
 */
@type("Gender")
export class Gender extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string
}
