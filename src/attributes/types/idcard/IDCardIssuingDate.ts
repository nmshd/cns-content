import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { IssuingDay } from "../times"
import { IssuingMonth } from "../times/IssuingMonth"
import { IssuingYear } from "../times/IssuingYear"

@type("IDCardIssuingDate")
export class IDCardIssuingDate extends AbstractAttributeValue {
    @serialize()
    @validate()
    public day: IssuingDay

    @serialize()
    @validate()
    public month: IssuingMonth

    @serialize()
    @validate()
    public year: IssuingYear
}
