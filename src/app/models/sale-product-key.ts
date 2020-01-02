export class SaleProductKey {
    sale?: number;
    product?: number;

    constructor(object?: SaleProductKey) {
        if (!object) {
            return;
        }
        for(const property in object) {
            this[property] = object[property];
        }
    }
}