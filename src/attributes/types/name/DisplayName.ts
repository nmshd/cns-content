import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("DisplayName")
export class DisplayName extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
