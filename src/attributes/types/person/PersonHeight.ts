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
            !Object.values(LengthUnit).includes(v.value) ? `must be one of: ${Object.keys(LengthUnit)}` : undefined
    })
    public unit: { value: LengthUnit }
}
