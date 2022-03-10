import { serialize, type, validate } from "@js-soft/ts-serval";
import { AbstractAttribute } from "../../AbstractAttribute";

@type("PersonHeight")
export class PersonHeight extends AbstractAttribute {
    @serialize()
    @validate()
    public value: number;
}
