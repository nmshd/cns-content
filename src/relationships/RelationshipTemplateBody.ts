import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"
import { IRequest, Request, RequestJSON } from "../requests/Request"

export interface RelationshipTemplateBodyJSON extends ContentJSON {
    title?: string
    metadata?: object
    onNewRelationship: RequestJSON
    onExistingRelationship?: RequestJSON
}

export interface IRelationshipTemplateBody extends ISerializable {
    title?: string
    metadata?: object
    onNewRelationship: IRequest
    onExistingRelationship?: IRequest
}

@type("RelationshipTemplateBody")
export class RelationshipTemplateBody extends Serializable implements IRelationshipTemplateBody {
    @serialize()
    @validate({ nullable: true })
    public title?: string

    @serialize()
    @validate({ nullable: true })
    public metadata?: object

    @serialize()
    @validate()
    public onNewRelationship: Request

    @serialize()
    @validate({ nullable: true })
    public onExistingRelationship?: Request

    public static from(value: IRelationshipTemplateBody | RelationshipTemplateBodyJSON): RelationshipTemplateBody {
        return this.fromAny(value)
    }
}
