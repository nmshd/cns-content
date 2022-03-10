import { serialize, type, validate } from "@js-soft/ts-serval";
import { AbstractAttribute } from "../../AbstractAttribute";

@type("Age")
export class Age extends AbstractAttribute {
    @serialize()
    @validate()
    public value: number;
}
