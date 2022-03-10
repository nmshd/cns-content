import { serialize, type, validate } from "@js-soft/ts-serval";
import { AbstractAttribute } from "../../AbstractAttribute";

@type("DisplayName")
export class DisplayName extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string;
}
