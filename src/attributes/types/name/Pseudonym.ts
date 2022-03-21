import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("Pseudonym")
export class Pseudonym extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
