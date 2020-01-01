export class Provider {
    id?: number;
    name?: string;
    consultant?: string;
    consultantNumber?: string;

    constructor(object?: Provider) {
        if (!object) {
            return;
        }
        for(const property in object) {
            this[property] = object[property];
        }
    }
}