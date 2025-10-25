import { IUser } from "./User";

export type BreakType = 'lunch_break' | 'bathroom_break';
export type Weekdays = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface ISchedule {
  scheduleDay: Weekdays;
  timeIn: string;
  timeOut: string;
  break: IBreak[];
}

export interface IScheduleExt {
 schedule: string;
 breaks: string[];
 schedules: [string, string][]
}

interface IBreak {
  type: BreakType;
  breakIn: string;
  breakOut: string;
}

export interface UserAttendanceDetailInterface {
  user: IUser;
  schedule: ISchedule[];
  dis: boolean;
}

export interface IUserAttendanceDetailByDay {
  user: string;
  monday?: ISchedule | IScheduleExt;
  tuesday?: ISchedule | IScheduleExt
  wednesday?: ISchedule | IScheduleExt
  thursday?: ISchedule | IScheduleExt
  friday?: ISchedule | IScheduleExt
  saturday?: ISchedule | IScheduleExt
  sunday?: ISchedule | IScheduleExt
}
