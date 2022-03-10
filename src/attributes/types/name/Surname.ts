import { serialize, type, validate } from "@js-soft/ts-serval";
import { AbstractAttribute } from "../../AbstractAttribute";

@type("Surname")
export class Surname extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string;
}
