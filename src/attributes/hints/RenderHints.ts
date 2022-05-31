import { Serializable, serialize, type, validate } from "@js-soft/ts-serval"
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
}

export interface IRenderHints {
    technicalType: RenderHintsTechnicalType
    editType: RenderHintsEditType
    dataType?: RenderHintsDataType
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

    public static from(value: IRenderHints): RenderHints {
        return this.fromAny(value)
    }

    public override toJSON(): RenderHintsJSON {
        return super.toJSON() as RenderHintsJSON
    }

    public copyWith(
        override?: Partial<IRenderHintsOverride | RenderHintsOverrideJSON | RenderHintsOverride>
    ): RenderHints {
        const anyOverride = override as any
        const json = anyOverride && typeof anyOverride.toJSON === "function" ? anyOverride.toJSON() : override
        return RenderHints.from({ ...this.toJSON(), ...json })
    }
}

export interface RenderHintsOverrideJSON {
    technicalType?: RenderHintsTechnicalType
    editType?: RenderHintsEditType
    dataType?: RenderHintsDataType
}

export interface IRenderHintsOverride {
    technicalType?: RenderHintsTechnicalType
    editType?: RenderHintsEditType
    dataType?: RenderHintsDataType
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

    public static from(value: IRenderHintsOverride | RenderHintsOverrideJSON): RenderHintsOverride {
        return this.fromAny(value)
    }

    public override toJSON(): RenderHintsOverrideJSON {
        return super.toJSON() as RenderHintsOverrideJSON
    }
}
