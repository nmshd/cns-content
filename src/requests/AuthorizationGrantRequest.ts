import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreDate, ICoreDate } from "@nmshd/transport"
import { IRequest, Request, RequestJSON } from "./Request"

export interface AuthorizationGrantRequestJSON extends RequestJSON {
    authorizationCode: string
    authorizationDescription?: string
    authorizationTitle: string
    authorizationExpiresAt?: string
}

export interface IAuthorizationGrantRequest extends IRequest {
    authorizationCode: string
    authorizationDescription?: string
    authorizationTitle: string
    authorizationExpiresAt?: ICoreDate
}

@type("AuthorizationGrantRequest")
export class AuthorizationGrantRequest extends Request implements IAuthorizationGrantRequest {
    @serialize()
    @validate()
    public authorizationCode: string

    @serialize()
    @validate({ nullable: true })
    public authorizationDescription?: string

    @serialize()
    @validate()
    public authorizationTitle: string

    @serialize()
    @validate({ nullable: true })
    public authorizationExpiresAt?: CoreDate
}
