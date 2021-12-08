import { Serializable, type } from "@js-soft/ts-serval"

export interface RelationshipExistsActionJSON {}

export enum RelationshipExistsActionType {}

export interface IRelationshipExistsAction {}

@type("RelationshipExistsAction")
export abstract class RelationshipExistsAction extends Serializable implements IRelationshipExistsAction {}
