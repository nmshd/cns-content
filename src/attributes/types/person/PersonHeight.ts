import { serialize, type, validate } from "@js-soft/ts-serval"
import { LengthMeasurement } from "../measurements/LengthMeasurement"

enum LengthUnit {
    CM = "cm"
}
@type("PersonHeight")
export class PersonHeight extends LengthMeasurement {
    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(LengthUnit).includes(v) ? `must be one of: ${Object.values(LengthUnit)}` : undefined
    })
    public unit: LengthUnit
}
