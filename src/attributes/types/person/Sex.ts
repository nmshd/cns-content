import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

/**
 * Biologisches Geschlecht
 */
@type("Sex")
export class Sex extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
