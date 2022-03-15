import { serialize, type, validate } from "@js-soft/ts-serval"
import { LengthMeasurement, LengthUnit } from "../measurements/LengthMeasurement"

type PersonHeightUnitType = LengthUnit.CM | LengthUnit.M
const personHeightUnit: Record<PersonHeightUnitType, string> = {
    [LengthUnit.CM]: LengthUnit["CM"],
    [LengthUnit.M]: LengthUnit["M"]
}

@type("PersonHeight")
export class PersonHeight extends LengthMeasurement {
    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(personHeightUnit).includes(v)
                ? `must be one of: ${Object.values(personHeightUnit)}`
                : undefined
    })
    public unit: PersonHeightUnitType
}
