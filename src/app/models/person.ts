export class Person {
    public id?: string;
    public name?: string;
    public lastname?: string;
    public email?: string;
    public telephone?: string;
    public birthdate?: Date;
    public address?: string;
    public allergies?: string;
    
    constructor(object?: Person) {
        if (!object) {
            return;
        }
        for(const property in object) {
            this[property] = object[property];
        }
    }
}