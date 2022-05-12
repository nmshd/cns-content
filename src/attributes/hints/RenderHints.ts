export enum RenderHintsDataType {
    String = "String",
    Number = "Number",
    Boolean = "Boolean"
}

export enum RenderHintsEditType {
    Input = "Input",
    CheckBox = "CheckBox",
    Select = "Select"
}

export enum RenderHintsSemantic {
    Sex = "Sex",
    Country = "Country",
    Language = "Language",
    Secret = "Secret",
    Date = "Date",
    DatePeriod = "DatePeriod",
    DateTime = "DateTime",
    DateTimePeriod = "DateTimePeriod",
    Time = "Time",
    TimePeriod = "TimePeriod"
}

export interface RenderHints {
    dataType: RenderHintsDataType
    editType: RenderHintsEditType
    semantic?: RenderHintsSemantic
}
