import { ISerializable, Serializable, type } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"

export interface AbstractAttributeValueJSON extends ContentJSON {}

export interface IAbstractAttributeValue extends ISerializable {}

@type("AbstractAttribute")
export abstract class AbstractAttributeValue extends Serializable implements IAbstractAttributeValue {}
