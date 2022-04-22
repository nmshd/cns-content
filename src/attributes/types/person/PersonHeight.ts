import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractLengthMeasurementValue, LengthUnit } from "../measurements/AbstractLengthMeasurementValue"

const validUnits = [LengthUnit.CM, LengthUnit.M]

@type("PersonHeight")
export class PersonHeight extends AbstractLengthMeasurementValue {
    @serialize()
    @validate({
        customValidator: (v) => (!validUnits.includes(v) ? `must be one of: ${validUnits}` : undefined)
    })
    public override unit: LengthUnit.CM | LengthUnit.M
}
