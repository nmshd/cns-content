import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { BirthCity } from "./BirthCity"
import { BirthCountry } from "./BirthCountry"
import { BirthState } from "./BirthState"

@type("BirthPlace")
export class BirthPlace extends AbstractAttributeValue {
    @serialize()
    @validate()
    public city: BirthCity

    @serialize()
    @validate({ nullable: true })
    public country?: BirthCountry

    @serialize()
    @validate({ nullable: true })
    public state?: BirthState
}
