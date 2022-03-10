import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute } from "../../AbstractAttribute"

@type("GivenName")
export class GivenName extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string
}
