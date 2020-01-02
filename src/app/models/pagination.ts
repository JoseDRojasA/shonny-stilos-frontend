export class Pagination<T> {
    elements?: Array<T>;
    count?: number;
    constructor(object?: Pagination<T>) {
        if (!object) {
            return;
        }
        for(const property in object) {
            this[property] = object[property];
        }
    }
}