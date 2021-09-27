import { serialize, type, validate } from "@js-soft/ts-serval"
import { Form, FormJSON, IForm } from "../forms"
import { IRequest, Request, RequestJSON } from "./Request"

export interface FormRequestJSON extends RequestJSON {
    form: FormJSON
}

export interface IFormRequest extends IRequest {
    form: IForm
}

@type("FormRequest")
export class FormRequest extends Request implements IFormRequest {
    @serialize()
    @validate()
    public form: Form
}
