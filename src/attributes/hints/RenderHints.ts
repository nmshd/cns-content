import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"

export enum RenderHintsTechnicalType {
    Boolean = "Boolean",
    Float = "Float",
    Integer = "Integer",
    Object = "Object",
    String = "String"
}

export enum RenderHintsEditType {
    InputLike = "InputLike",
    ButtonLike = "ButtonLike",
    RadioButtonLike = "RadioButtonLike",
    SelectLike = "SelectLike",
    SliderLike = "SliderLike",
    Complex = "Complex",
    Secret = "Secret",
    TextArea = "TextArea",
    Upload = "Upload"
}

export enum RenderHintsDataType {
    Country = "Country",
    DataURL = "DataURL",
    EMailAddress = "EMailAddress",
    HEXColor = "HEXColor",
    Language = "Language",
    PhoneNumber = "PhoneNumber",
    URL = "URL",
    FileReference = "FileReference",
    Date = "Date",
    DatePeriod = "DatePeriod",
    DateTime = "DateTime",
    DateTimePeriod = "DateTimePeriod",
    Time = "Time",
    TimePeriod = "TimePeriod",
    Day = "Day",
    Month = "Month",
    Year = "Year"
}

export interface RenderHintsJSON extends ContentJSON {
    technicalType: RenderHintsTechnicalType
    editType: RenderHintsEditType
    dataType?: RenderHintsDataType
    subHints?: Record<string, RenderHintsJSON>
}

export interface IRenderHints extends ISerializable {
    technicalType: RenderHintsTechnicalType
    editType: RenderHintsEditType
    dataType?: RenderHintsDataType
    subHints?: Record<string, IRenderHints>
}

@type("RenderHints")
export class RenderHints extends Serializable implements IRenderHints {
    @serialize()
    @validate()
    public technicalType: RenderHintsTechnicalType

    @serialize()
    @validate()
    public editType: RenderHintsEditType

    @serialize()
    @validate({ nullable: true })
    public dataType?: RenderHintsDataType

    @serialize({ type: RenderHints })
    @validate({ nullable: true })
    public subHints: Record<string, RenderHints> = {}

    public static from(value: IRenderHints): RenderHints {
        return this.fromAny(value)
    }

    public static override postFrom<T extends Serializable>(value: T): T {
        if (!(value instanceof RenderHints)) throw new Error("this should never happen")

        value.subHints = Object.entries(value.subHints)
            .map((k) => {
                return { [k[0]]: RenderHints.from(k[1]) }
            })
            .reduce((obj, item) => Object.assign(obj, { [Object.keys(item)[0]]: Object.values(item)[0] }), {})

        return value
    }

    public override toJSON(): RenderHintsJSON {
        const json = super.toJSON() as RenderHintsJSON

        json.subHints = Object.entries(this.subHints)
            .map((k) => {
                return { [k[0]]: k[1].toJSON() }
            })
            .reduce((obj, item) => Object.assign(obj, { [Object.keys(item)[0]]: Object.values(item)[0] }), {})

        return json
    }

    public copyWith(
        override?: Partial<IRenderHintsOverride | RenderHintsOverrideJSON | RenderHintsOverride>
    ): RenderHints {
        const overrideJson = override && override instanceof RenderHintsOverride ? override.toJSON() : override

        const subHints = { ...this.toJSON().subHints, ...overrideJson?.subHints }
        return RenderHints.from({ ...this.toJSON(), ...overrideJson, subHints })
    }
}

export interface RenderHintsOverrideJSON {
    technicalType?: RenderHintsTechnicalType
    editType?: RenderHintsEditType
    dataType?: RenderHintsDataType
    subHints?: Record<string, RenderHintsJSON>
}

export interface IRenderHintsOverride {
    technicalType?: RenderHintsTechnicalType
    editType?: RenderHintsEditType
    dataType?: RenderHintsDataType
    subHints?: Record<string, IRenderHints>
}

@type("RenderHintsOverride")
export class RenderHintsOverride extends Serializable implements IRenderHintsOverride {
    @serialize()
    @validate({ nullable: true })
    public technicalType?: RenderHintsTechnicalType

    @serialize()
    @validate({ nullable: true })
    public editType?: RenderHintsEditType

    @serialize()
    @validate({ nullable: true })
    public dataType?: RenderHintsDataType

    @serialize({ type: RenderHints })
    @validate({ nullable: true })
    public subHints?: Record<string, RenderHints>

    public static from(value: IRenderHintsOverride | RenderHintsOverrideJSON): RenderHintsOverride {
        return this.fromAny(value)
    }

    public static override postFrom<T extends Serializable>(value: T): T {
        const valueAsAny = value as any
        if (typeof valueAsAny.subHints === "undefined") return value

        valueAsAny.subHints = Object.entries(valueAsAny.subHints)
            .map((k) => {
                return { [k[0]]: RenderHints.from(k[1] as IRenderHints) }
            })
            .reduce((obj, item) => Object.assign(obj, { [Object.keys(item)[0]]: Object.values(item)[0] }), {})

        return valueAsAny
    }

    public override toJSON(): RenderHintsOverrideJSON {
        const json = super.toJSON() as RenderHintsOverrideJSON

        json.subHints = Object.entries(this.subHints ?? {})
            .map((k) => {
                return { [k[0]]: k[1].toJSON() }
            })
            .reduce((obj, item) => Object.assign(obj, { [Object.keys(item)[0]]: Object.values(item)[0] }), {})

        return json
    }
}
