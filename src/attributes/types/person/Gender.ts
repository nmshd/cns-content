import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

/**
 * Soziales Geschlecht
 */
@type("Gender")
export class Gender extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
