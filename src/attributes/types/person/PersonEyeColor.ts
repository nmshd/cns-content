import { serialize, type, validate } from "@js-soft/ts-serval";
import { AbstractAttribute } from "../../AbstractAttribute";

@type("PersonEyeColor")
export class PersonEyeColor extends AbstractAttribute {
    @serialize()
    @validate()
    public value: number;
}
