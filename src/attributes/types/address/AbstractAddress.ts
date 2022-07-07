import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractComplexValue, AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"
import { RenderHints, RenderHintsEditType, RenderHintsTechnicalType, ValueHints } from "../../hints"

export interface AbstractAddressJSON extends AbstractComplexValueJSON {
    recipient: string
}

export interface IAbstractAddress extends IAbstractComplexValue {
    recipient: string
}

export abstract class AbstractAddress extends AbstractComplexValue implements IAbstractAddress {
    @serialize()
    @validate()
    public recipient: string

    public static get valueHints(): ValueHints {
        return ValueHints.from({
            propertyHints: {
                recipient: ValueHints.from({})
            }
        })
    }

    public static override get renderHints(): RenderHints {
        return super.renderHints.copyWith({
            propertyHints: {
                recipient: RenderHints.from({
                    editType: RenderHintsEditType.InputLike,
                    technicalType: RenderHintsTechnicalType.String
                })
            }
        })
    }
}
