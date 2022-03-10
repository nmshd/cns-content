import { serialize, type, validate } from "@js-soft/ts-serval";
import { StreetAddress } from "../address/StreetAddress";
import { BirthDate } from "../birth/BirthDate";
import { BirthPlace } from "../birth/BirthPlace";
import { LegalNameDE } from "../name/LegalNameDE";
import { IDCard } from "./IDCard";

@type("IDCardDE")
export class IDCardDE extends IDCard {
    @serialize()
    @validate()
    public legalName: LegalNameDE;

    @serialize()
    @validate()
    public birthDate: BirthDate;

    @serialize()
    @validate()
    public birthPlace: BirthPlace;

    @serialize()
    @validate()
    public address: StreetAddress;
}
