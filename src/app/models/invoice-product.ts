import { InvoiceProductKey } from './invoice-product-key';
import { Product } from './product';
import { Invoice } from './invoice';

export class InvoiceProduct {
    id?: InvoiceProductKey;
    buyPricePerUnit?: number;
    amount?: number;
    product?: Product;
    productName?: string;
    invoice?: Invoice;

    constructor(object?: InvoiceProduct) {
        this.id = new InvoiceProductKey();
        if (!object) {
            return;
        }
        for(const property in object) {
            this[property] = object[property];
        }
    }
}