import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute } from "../../AbstractAttribute"

/**
 * Biologisches Geschlecht
 */
@type("Sex")
export class Sex extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string
}
