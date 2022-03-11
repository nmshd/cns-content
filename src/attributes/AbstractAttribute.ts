import { ISerializable, Serializable, type } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"

export interface AbstractAttributeJSON extends ContentJSON {}

export interface IAbstractAttribute extends ISerializable {}

@type("AbstractAttribute")
export abstract class AbstractAttribute extends Serializable implements IAbstractAttribute {}
