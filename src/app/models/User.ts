export type jobTitle = 'dialer' | 'manager';

export interface IUser {
  firstName: string;
  lastName: string;
  displayName?: string;
  email: string;
  password: string;
  jobTitle: jobTitle;
  reportsTo: string[];
  dis?: boolean;
}
