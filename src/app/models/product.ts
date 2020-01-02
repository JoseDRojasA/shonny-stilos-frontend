import { Brand } from './brand';
import { Provider } from './provider';

export class Product {
    id?: number;
    name?: string;
    price?: number;
    buyPrice?: number;
    amount?: number;
    minAmount?: number;
    active?: boolean;
    brand?: Brand;
    provider?: Provider;
    
    constructor(object?: Product) {
        if (!object) {
            return;
        }
        for(const property in object) {
            this[property] = object[property];
        }
    }
}