import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../../ContentJSON"
import { RenderHintsDataType } from "./RenderHintsDataType"
import { RenderHintsEditType } from "./RenderHintsEditType"
import { RenderHintsTechnicalType } from "./RenderHintsTechnicalType"

export interface RenderHintsJSON extends ContentJSON {
    technicalType: RenderHintsTechnicalType
    editType: RenderHintsEditType
    dataType?: RenderHintsDataType
    propertyHints?: Record<string, RenderHintsJSON>
}

export interface RenderHintsOverrideJSON extends Partial<RenderHintsJSON> {}

export interface IRenderHints extends ISerializable {
    technicalType: RenderHintsTechnicalType
    editType: RenderHintsEditType
    dataType?: RenderHintsDataType
    propertyHints?: Record<string, IRenderHints>
}

export interface IRenderHintsOverride extends Partial<IRenderHints> {}

@type("RenderHints")
export class RenderHints extends Serializable implements IRenderHints {
    @serialize()
    @validate()
    public technicalType: RenderHintsTechnicalType

    @serialize()
    @validate()
    public editType: RenderHintsEditType

    @serialize()
    @validate({ nullable: true })
    public dataType?: RenderHintsDataType

    @serialize()
    @validate({ nullable: true })
    public propertyHints: Record<string, RenderHints> = {}

    public static from(value: IRenderHints): RenderHints {
        return this.fromAny(value)
    }

    public static override postFrom<T extends Serializable>(value: T): T {
        if (!(value instanceof RenderHints)) throw new Error("this should never happen")

        value.propertyHints = Object.entries(value.propertyHints)
            .map((k) => {
                return { [k[0]]: RenderHints.from(k[1]) }
            })
            .reduce((obj, item) => Object.assign(obj, { [Object.keys(item)[0]]: Object.values(item)[0] }), {})

        return value
    }

    public override toJSON(): RenderHintsJSON {
        const json = super.toJSON() as RenderHintsJSON

        json.propertyHints = Object.entries(this.propertyHints)
            .map((k) => {
                return { [k[0]]: k[1].toJSON() }
            })
            .reduce((obj, item) => Object.assign(obj, { [Object.keys(item)[0]]: Object.values(item)[0] }), {})

        return json
    }

    public copyWith(
        override?: Partial<IRenderHintsOverride | RenderHintsOverrideJSON | RenderHintsOverride>
    ): RenderHints {
        const overrideJson = override && override instanceof RenderHintsOverride ? override.toJSON() : override

        const propertyHints = { ...this.toJSON().propertyHints, ...overrideJson?.propertyHints }
        return RenderHints.from({ ...this.toJSON(), ...overrideJson, propertyHints })
    }
}

@type("RenderHintsOverride")
export class RenderHintsOverride extends Serializable implements IRenderHintsOverride {
    @serialize()
    @validate({ nullable: true })
    public technicalType?: RenderHintsTechnicalType

    @serialize()
    @validate({ nullable: true })
    public editType?: RenderHintsEditType

    @serialize()
    @validate({ nullable: true })
    public dataType?: RenderHintsDataType

    @serialize()
    @validate({ nullable: true })
    public propertyHints?: Record<string, RenderHints>

    public static from(value: IRenderHintsOverride | RenderHintsOverrideJSON): RenderHintsOverride {
        return this.fromAny(value)
    }

    public static override postFrom<T extends Serializable>(value: T): T {
        const valueAsAny = value as any
        if (typeof valueAsAny.propertyHints === "undefined") return value

        valueAsAny.propertyHints = Object.entries(valueAsAny.propertyHints)
            .map((k) => {
                return { [k[0]]: RenderHints.from(k[1] as IRenderHints) }
            })
            .reduce((obj, item) => Object.assign(obj, { [Object.keys(item)[0]]: Object.values(item)[0] }), {})

        return valueAsAny
    }

    public override toJSON(): RenderHintsOverrideJSON {
        const json = super.toJSON() as RenderHintsOverrideJSON

        json.propertyHints = Object.entries(this.propertyHints ?? {})
            .map((k) => {
                return { [k[0]]: k[1].toJSON() }
            })
            .reduce((obj, item) => Object.assign(obj, { [Object.keys(item)[0]]: Object.values(item)[0] }), {})

        return json
    }
}
