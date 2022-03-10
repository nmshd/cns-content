import { serialize, type, validate } from "@js-soft/ts-serval";
import { AbstractAttribute } from "../../AbstractAttribute";

@type("IDCardIssuingDate")
export class IDCardIssuingDate extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string;
}
