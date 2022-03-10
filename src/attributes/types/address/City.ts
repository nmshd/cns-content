import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute } from "../../AbstractAttribute"

@type("City")
export class City extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string
}
