import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"
import { IRequest, Request, RequestJSON } from "../requests/Request"

export interface RelationshipTemplateContentJSON extends ContentJSON {
    title?: string
    metadata?: object
    newRelationshipRequest: RequestJSON
    existingRelationshipRequest?: RequestJSON
}

export interface IRelationshipTemplateContent extends ISerializable {
    title?: string
    metadata?: object
    newRelationshipRequest: IRequest
    existingRelationshipRequest?: IRequest
}

@type("RelationshipTemplateContent")
export class RelationshipTemplateContent extends Serializable implements IRelationshipTemplateContent {
    @serialize()
    @validate({ nullable: true })
    public title?: string

    @serialize()
    @validate({ nullable: true })
    public metadata?: object

    @serialize()
    @validate()
    public newRelationshipRequest: Request

    @serialize()
    @validate({ nullable: true })
    public existingRelationshipRequest?: Request

    public static from(value: IRelationshipTemplateContent): RelationshipTemplateContent {
        return this.fromAny(value)
    }
}