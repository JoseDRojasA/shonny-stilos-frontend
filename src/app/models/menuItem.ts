export class MenuItem {
    public label?: string;
    public url?: string;
    constructor(object?: MenuItem) {
        if (!object) {
            return;
        }
        for(const property in object) {
            this[property] = object[property];
        }
    }
}