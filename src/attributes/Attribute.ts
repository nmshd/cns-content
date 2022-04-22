import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreSerializable, ICoreDate, ICoreSerializable } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"

export interface AttributeJSON extends ContentJSON {
    name: string
    value: any
    validFrom?: string
    validTo?: string
}

export interface IAttribute extends ICoreSerializable {
    name: string
    value: any
    validFrom?: ICoreDate
    validTo?: ICoreDate
}

@type("Attribute")
export class Attribute extends CoreSerializable implements IAttribute {
    @serialize()
    @validate()
    public name: string

    @serialize({ any: true })
    @validate({ nullable: true })
    public value: any

    @serialize()
    @validate({ nullable: true })
    public validFrom?: CoreDate

    @serialize()
    @validate({ nullable: true })
    public validTo?: CoreDate

    public get namespace(): string | undefined {
        if (!this.name) return undefined
        const ar = this.name.split(".")
        if (ar.length <= 1) return undefined
        return ar[0]
    }

    public get attribute(): string | undefined {
        if (!this.name) return undefined
        const ar = this.name.split(".")
        return ar.pop()
    }

    public static from(value: IAttribute): Attribute {
        return this.fromAny(value)
    }

    public static fromJSON(value: AttributeJSON): Attribute {
        return this.from({
            name: value.name,
            value: value.value,
            validFrom: value.validFrom ? CoreDate.from(value.validFrom) : undefined,
            validTo: value.validTo ? CoreDate.from(value.validTo) : undefined
        })
    }
}
