import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractMeasurement } from "./AbstractMeasurement"

export enum LengthUnit {
    NM = "nm",
    UM = "um",
    MM = "mm",
    CM = "cm",
    DM = "dm",
    M = "m",
    KM = "km",
    MI = "mi",
    YD = "yd",
    FT = "ft",
    SM = "sm",
    IN = "in"
}

export class AbstractLengthMeasurementValue extends AbstractMeasurement {
    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(LengthUnit).includes(v) ? `must be one of: ${Object.values(LengthUnit)}` : undefined
    })
    public override unit: LengthUnit
}
