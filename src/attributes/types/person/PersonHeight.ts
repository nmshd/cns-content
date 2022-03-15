import { serialize, type, validate } from "@js-soft/ts-serval"
import { LengthMeasurement, LengthUnit } from "../measurements/LengthMeasurement"

const validUnits = [LengthUnit.CM, LengthUnit.M]

@type("PersonHeight")
export class PersonHeight extends LengthMeasurement {
    @serialize()
    @validate({
        customValidator: (v) => (!validUnits.includes(v) ? `must be one of: ${validUnits}` : undefined)
    })
    public unit: LengthUnit.CM | LengthUnit.M
}
