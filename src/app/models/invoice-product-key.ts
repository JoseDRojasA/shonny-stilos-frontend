export class InvoiceProductKey {
    invoice?: number;
    product?: number;
    constructor(object?: InvoiceProductKey) {
        if (!object) {
            return;
        }
        for(const property in object) {
            this[property] = object[property];
        }
    }
}