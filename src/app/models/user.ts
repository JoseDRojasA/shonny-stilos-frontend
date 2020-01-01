import { Person } from './person';

export class User {
    public id?: number;
    public username?: string;
    public password?: string;
    public person?: Person;
    public isAdmin?: boolean;

    constructor(object?: User) {
        if (!object) {
            return;
        }
        for(const property in object) {
            this[property] = object[property];
        }
    }
}