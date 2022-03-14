import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("GivenName")
export class GivenName extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
