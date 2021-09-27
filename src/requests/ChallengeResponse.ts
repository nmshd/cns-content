import { serialize, type, validate } from "@js-soft/ts-serval"
import { ChallengeSigned, IChallengeSigned } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"
import { IRequest, Request } from "./Request"

export interface ChallengeResponseJSON extends ContentJSON {
    signedChallenge: ChallengeSignedJSON
}

export interface IChallengeResponse extends IRequest {
    signedChallenge: IChallengeSigned
}

export interface ChallengeSignedJSON extends ContentJSON {
    challenge: string
    signature: string
}

@type("ChallengeResponse")
export class ChallengeResponse extends Request implements IChallengeResponse {
    @serialize()
    @validate()
    public signedChallenge: ChallengeSigned
}
