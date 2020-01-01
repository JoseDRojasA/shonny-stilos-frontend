export class Brand {
    id?: number;
    name?: string;

    constructor(object?: Brand) {
        if (!object) {
            return;
        }
        for(const property in object) {
            this[property] = object[property];
        }
    }
}