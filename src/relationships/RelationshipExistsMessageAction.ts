import { ISerializableAsync, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"
import { IRelationshipExistsAction, RelationshipExistsAction } from "./RelationshipExistsAction"

export interface RelationshipExistMessageActionJSON extends ContentJSON {
    content: any
}

export interface IRelationshipExistsMessageAction extends IRelationshipExistsAction {
    content: ISerializableAsync
}

@type("RelationshipExistsMessageAction")
export class RelationshipExistsMessageAction
    extends RelationshipExistsAction
    implements IRelationshipExistsMessageAction
{
    @serialize()
    @validate()
    public content: SerializableAsync
}
