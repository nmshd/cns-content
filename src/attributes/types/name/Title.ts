import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute } from "../../AbstractAttribute"

@type("Title")
export class Title extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string
}
