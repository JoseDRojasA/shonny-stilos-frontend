import { Person } from './person';

export class User {
    public id?: number;
    public username?: string;
    public password?: string;
    public person?: Person;
    public isAdmin?: boolean;

    constructor(public user?: User) {
        if (!user) {
            return;
        }
        for(const property in user) {
            this[property] = user[property];
        }
    }
}