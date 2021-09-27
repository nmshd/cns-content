import { Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"

export interface FormItemMultipleChoiceItemJSON extends ContentJSON {
    key: string
    label: string
}

@type("FormItemMultipleChoiceItem")
export class FormItemMultipleChoiceItem extends Serializable {
    @serialize()
    @validate()
    public key: string
    @serialize()
    @validate()
    public label: string
}
