import { serialize, type, validate } from "@js-soft/ts-serval";
import { AbstractAttribute } from "../../AbstractAttribute";
import { BirthDay } from "./BirthDay";
import { BirthMonth } from "./BirthMonth";
import { BirthYear } from "./BirthYear";

@type("BirthDate")
export class BirthDate extends AbstractAttribute {
    @serialize()
    @validate()
    public day: BirthDay;

    @serialize()
    @validate()
    public month: BirthMonth;

    @serialize()
    @validate()
    public year: BirthYear;
}
