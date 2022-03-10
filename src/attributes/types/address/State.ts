import { serialize, type, validate } from "@js-soft/ts-serval";
import { AbstractAttribute } from "../../AbstractAttribute";

@type("State")
export class State extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string;
}
