import { InvoiceProductKey } from './invoice-product-key';
import { Product } from './product';
import { Invoice } from './invoice';

export class InvoiceProduct {
    id?: InvoiceProductKey;
    buyPricePerUnit?: number;
    pricePerUnit?: number;
    amount?: number;
    product?: Product;
    invoice?: Invoice;

    constructor(object?: InvoiceProduct) {
        if (!object) {
            return;
        }
        for(const property in object) {
            this[property] = object[property];
        }
    }
}