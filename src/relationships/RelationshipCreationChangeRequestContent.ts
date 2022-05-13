import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"
import { IResponse, Response, ResponseJSON } from "../requests/response/Response"

export interface IRelationshipCreationChangeRequestContentJSON extends ContentJSON {
    title?: string
    metadata?: any
    response: ResponseJSON
}

export interface IRelationshipCreationChangeRequestContent extends ISerializable {
    title?: string
    metadata?: any
    response: IResponse
}

@type("RelationshipCreationChangeRequestContent")
export class RelationshipCreationChangeRequestContent
    extends Serializable
    implements IRelationshipCreationChangeRequestContent
{
    @serialize()
    @validate({ nullable: true })
    public title?: string

    @serialize({ any: true })
    @validate({ nullable: true })
    public metadata?: any

    @serialize()
    @validate()
    public response: Response

    public static from(value: IRelationshipCreationChangeRequestContent): RelationshipCreationChangeRequestContent {
        return this.fromAny(value)
    }
}
