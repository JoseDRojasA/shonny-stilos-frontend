import { SaleProduct } from './sale-product';

export class Sale {
    id?: number;
    clientName?: string;
    date?: Date;
    saleProducts: SaleProduct[];

    constructor(object?: Sale) {
        this.saleProducts = [];
        if (!object) {
            return;
        }
        for(const property in object) {
            this[property] = object[property];
        }
    }
}