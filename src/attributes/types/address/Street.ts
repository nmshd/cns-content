import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute } from "../../AbstractAttribute"

@type("Street")
export class Street extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string
}
