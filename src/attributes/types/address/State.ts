import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("State")
export class State extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
