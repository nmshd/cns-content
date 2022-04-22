import { ISerializable, Serializable } from "@js-soft/ts-serval"

export interface AbstractAttributeValueJSON {}

export interface IAbstractAttributeValue extends ISerializable {}

export abstract class AbstractAttributeValue extends Serializable implements IAbstractAttributeValue {}
