export class Person {
    public id?: string;
    public name?: string;
    public lastname?: string;
    public email?: string;
    public telephone?: string;
    public birthdate?: Date;
    public address?: string;
    public allergies?: string;
    
    constructor(public user?: Person) {
        if (!user) {
            return;
        }
        for(const property in user) {
            this[property] = user[property];
        }
    }
}