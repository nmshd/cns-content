import { serialize, type, validate } from "@js-soft/ts-serval";
import { AbstractAttribute } from "../../AbstractAttribute";

@type("Pseudonym")
export class Pseudonym extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string;
}
