import { serialize, type, validate } from "@js-soft/ts-serval"
import { IRequest, Request, RequestJSON } from "./Request"

export interface PrivacyStatementJSON extends RequestJSON {
    title?: string
    text: string
    consentText?: string
    required?: boolean
    activeConsent?: boolean
    uri?: string
}

export interface IPrivacyStatement extends IRequest {
    title?: string
    text: string
    consentText?: string
    required?: boolean
    activeConsent?: boolean
    uri?: string
}

@type("PrivacyStatement")
export class PrivacyStatement extends Request implements IPrivacyStatement {
    @serialize()
    @validate({ nullable: true })
    public title?: string

    @serialize()
    @validate({ nullable: true })
    public text: string

    @serialize()
    @validate({ nullable: true })
    public consentText?: string

    @serialize()
    @validate({ nullable: true })
    public required?: boolean

    @serialize()
    @validate({ nullable: true })
    public activeConsent?: boolean

    @serialize()
    @validate({ nullable: true })
    public uri?: string
}
