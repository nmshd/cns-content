import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "./AbstractAttributeValue"

export interface AbstractComplexValueJSON extends AbstractAttributeValueJSON {}

export interface IAbstractComplexValue extends IAbstractAttributeValue {}

export abstract class AbstractComplexValue extends AbstractAttributeValue implements IAbstractComplexValue {}
