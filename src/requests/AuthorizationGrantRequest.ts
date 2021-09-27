import { serialize, type, validate } from "@js-soft/ts-serval"
import { IRequest, Request, RequestJSON } from "./Request"

export interface AuthorizationGrantRequestJSON extends RequestJSON {
    authorization: string
    reference: string
}

export interface IAuthorizationGrantRequest extends IRequest {
    authorization: string
    reference: string
}

@type("AuthorizationGrantRequest")
export class AuthorizationGrantRequest extends Request implements IAuthorizationGrantRequest {
    @serialize()
    @validate()
    public authorization: string

    @serialize()
    @validate()
    public reference: string
}
