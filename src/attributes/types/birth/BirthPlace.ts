import { serialize, type, validate } from "@js-soft/ts-serval";
import { AbstractAttribute } from "../../AbstractAttribute";
import { BirthCity } from "./BirthCity";
import { BirthCountry } from "./BirthCountry";
import { BirthState } from "./BirthState";

@type("BirthPlace")
export class BirthPlace extends AbstractAttribute {
    @serialize()
    @validate()
    public city: BirthCity;

    @serialize()
    @validate()
    public country?: BirthCountry;

    @serialize()
    @validate()
    public state?: BirthState;
}
