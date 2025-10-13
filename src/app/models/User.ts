export type jobTitle = 'dialer' | 'manager';

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  email: string;
  password: string;
  jobTitle: jobTitle;
  reportsTo: string[];
  dis?: boolean;
}
