import { User } from './user.model';

export class Ticket {
  constructor(
    public id: string,
    // tslint:disable-next-line:variable-name
    public number: number,
    public title: string,
    public status: string,
    public priority: string,
    public description: string,
    public image: string,
    public user: User,
    public assignedUser: User,
    public data: string,
    public changes: Array<string>
  ) {}
}
