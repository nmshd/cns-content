import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import {
    IRelationshipExistsAction,
    RelationshipExistsAction,
    RelationshipExistsActionJSON
} from "./RelationshipExistsAction"

export interface RelationshipExistsMessageActionJSON extends RelationshipExistsActionJSON {
    content: any
}

export interface IRelationshipExistsMessageAction extends IRelationshipExistsAction {
    content: ISerializable
}

@type("RelationshipExistsMessageAction")
export class RelationshipExistsMessageAction
    extends RelationshipExistsAction
    implements IRelationshipExistsMessageAction
{
    @serialize()
    @validate()
    public content: Serializable
}
