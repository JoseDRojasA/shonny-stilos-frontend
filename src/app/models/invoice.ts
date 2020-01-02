import { Provider } from './provider';
import { InvoiceProduct } from './invoice-product';

export class Invoice {
    id?: number;
    serial?: string;
    date?: Date;
    provider?: Provider;
    invoiceProducts?: InvoiceProduct[];

    constructor(object?: Invoice) {
        if (!object) {
            return;
        }
        for(const property in object) {
            this[property] = object[property];
        }
    }
}