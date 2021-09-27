import { serialize, type, validate } from "@js-soft/ts-serval"
import { Address, IAddress } from "./Address"

export interface IDeliveryAddress extends IAddress {
    deliveryPhone?: string
    deliveryPlacement?: string
    deliveryTimeframe?: string
}

@type("DeliveryAddress")
export class DeliveryAddress extends Address implements IDeliveryAddress {
    @serialize()
    @validate()
    public deliveryPhone?: string

    @serialize()
    @validate()
    public deliveryPlacement?: string

    @serialize()
    @validate()
    public deliveryTimeframe?: string

    public static from(value: IDeliveryAddress): DeliveryAddress {
        return super.from(value) as DeliveryAddress
    }
}
