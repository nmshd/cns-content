import { serialize, type, validate } from "@js-soft/ts-serval"
import { Attribute, IAttribute } from "../Attribute"

export interface IAddress extends IAttribute {
    street: string
    houseNo: string
    zipCode: string
    city: string
    country: string
    title?: string
    description?: string
    state?: string
}

@type("Address")
export class Address extends Attribute implements IAddress {
    @serialize()
    @validate()
    public street: string

    @serialize()
    @validate()
    public houseNo: string

    @serialize()
    @validate()
    public zipCode: string

    @serialize()
    @validate()
    public city: string

    @serialize()
    @validate()
    public country: string

    @serialize()
    @validate({ nullable: true })
    public title?: string

    @serialize()
    @validate({ nullable: true })
    public description?: string

    @serialize()
    @validate({ nullable: true })
    public state?: string

    public static from(value: IAddress): Address {
        return super.from(value) as Address
    }
}
