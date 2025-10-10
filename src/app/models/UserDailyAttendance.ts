import { BreakType } from "./AttendanceUserDetail";

export type AttendanceStatus = 'in_late' | 'undertime' | 'in_ontime' | 'out_ontime' | BreakType

export interface IUserDailyAttendance {
  _id: string;
  date: Date;
  user: string;
  timeIn: string;
  timeOut: string;
  status: AttendanceStatus[];
  reportsTo: string[]
}
