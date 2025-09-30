export type AttendanceStatus = 'in_late' | 'undertime' | 'in_ontime' | 'out_ontime' | 'onbreak'

export interface IUserDailyAttendance {
  date: Date;
  user: string;
  timeIn: string;
  timeOut: string;
  status: AttendanceStatus
}
