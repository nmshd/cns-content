import { serialize, type, validate } from "@js-soft/ts-serval";
import { AbstractAttribute } from "../../AbstractAttribute";

@type("IDCardAuthorityName")
export class IDCardAuthorityName extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string;
}
