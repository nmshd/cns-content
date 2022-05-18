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
    TimePeriod = "TimePeriod"
}

export interface RenderHints {
    technicalType: RenderHintsTechnicalType
    editType: RenderHintsEditType
    dataType?: RenderHintsDataType
}
