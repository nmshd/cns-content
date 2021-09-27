import { serialize, type, validate } from "@js-soft/ts-serval"
import { Challenge, IChallenge } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"
import { IRequest, Request, RequestJSON } from "./Request"

export interface ChallengeRequestJSON extends RequestJSON {
    challenge: ChallengeJSON
}

export interface ChallengeJSON extends ContentJSON {
    id: string
    expiresAt: string
    createdBy?: string
    createdByDevice?: string
    type: string
}

export enum ChallengeJSONType {
    Identity = "Identity",
    Device = "Device",
    Relationship = "Relationship"
}

export interface IChallengeRequest extends IRequest {
    challenge: IChallenge
}

@type("ChallengeRequest")
export class ChallengeRequest extends Request implements IChallengeRequest {
    @serialize()
    @validate()
    public challenge: Challenge
}
