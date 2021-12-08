import { Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"

export interface FormItemSelectItemJSON extends ContentJSON {
    key: string
    label: string
}

@type("FormItemSelectItem")
export class FormItemSelectItem extends Serializable {
    @serialize()
    @validate()
    public key: string
    @serialize()
    @validate()
    public label: string
}
