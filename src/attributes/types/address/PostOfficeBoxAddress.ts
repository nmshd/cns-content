import { serialize, type, validate } from "@js-soft/ts-serval";
import { Address } from "./Address";
import { City } from "./City";
import { Country } from "./Country";
import { State } from "./State";
import { ZipCode } from "./ZipCode";

@type("PostOfficeBoxAddress")
export class PostOfficeBoxAddress extends Address {
    @serialize()
    @validate()
    public boxId: string;

    @serialize()
    @validate()
    public zipCode: ZipCode;

    @serialize()
    @validate()
    public city: City;

    @serialize()
    @validate()
    public country: Country;

    @serialize()
    @validate()
    public state: State;
}
