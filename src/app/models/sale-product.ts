import { SaleProductKey } from './sale-product-key';
import { Sale } from './sale';
import { Product } from './product';

export class SaleProduct {
    id?: SaleProductKey;
    sale?: Sale;
    product?: Product;
    buyPrice?: number;
    price?: number;
    amount?: number;
    discount?: number;
    productName?: string;

    constructor(object?: SaleProduct) {
        if (!object) {
            return;
        }
        for(const property in object) {
            this[property] = object[property];
        }
    }
}