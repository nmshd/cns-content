import { serialize, type, validate } from "@js-soft/ts-serval";
import { AbstractAttribute } from "../../AbstractAttribute";

@type("HouseNo")
export class HouseNo extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string;
}
