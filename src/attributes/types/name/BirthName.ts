import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute } from "../../AbstractAttribute"

@type("BirthName")
export class BirthName extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string
}
