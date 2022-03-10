import { serialize, validate } from "@js-soft/ts-serval";
import { AbstractAttribute } from "../../AbstractAttribute";

/*
Tags:
- Delivery
- Invoice
- Mailing
- Residential
- Working
- Registration/Legal -> Meldeadresse
*/

export class Address extends AbstractAttribute {
    @serialize()
    @validate()
    public recipient: string;
}
