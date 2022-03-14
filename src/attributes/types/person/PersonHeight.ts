import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractMeasurement } from "../AbstractMeasurement"

enum LengthUnit {
    CM = 0
}
@type("PersonHeight")
export class PersonHeight extends AbstractMeasurement {
    @serialize()
    @validate({ customValidator: (v) => (!LengthUnit[v] ? "has invalid value" : undefined) })
    public unit: LengthUnit
}
