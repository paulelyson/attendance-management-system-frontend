import {
  ISchedule,
  IScheduleExt,
  UserAttendanceDetailInterface,
  Weekdays,
} from '../models/AttendanceUserDetail';
import { IUser } from '../models/User';
import { snakeCaseToString } from './string.util';

export const scheduleToScheduleExt = (schedule: ISchedule | undefined): IScheduleExt => {
  const timeIn = schedule ? convertTimeTo12HourFormat(schedule.timeIn) : '';
  const timeOut = schedule ? convertTimeTo12HourFormat(schedule.timeOut) : '';
  const breaks = schedule
    ? schedule.break.map((x) => {
        const type = snakeCaseToString(x.type);
        const breakIn = convertTimeTo12HourFormat(x.breakIn);
        const breakOut = convertTimeTo12HourFormat(x.breakOut);
        return `${type} (${breakIn} - ${breakOut})`;
      })
    : [];
  let schedules: [string, string][] = schedule
    ? schedule.break.map((x) => {
        const type = snakeCaseToString(x.type);
        const breakIn = convertTimeTo12HourFormat(x.breakIn);
        const breakOut = convertTimeTo12HourFormat(x.breakOut);
        const range = breakIn + ' - ' + breakOut;
        return [type, range];
      })
    : [];
  schedules.push(['Schedule', timeIn + ' - ' + timeOut]);
  return {
    schedule: timeIn + ' - ' + timeOut,
    breaks: breaks,
    schedules: schedules,
  };
};

export const convertTimeTo12HourFormat = (time24: string): string => {
  const [hourStr, minute] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const period = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12;

  return `${hour}:${minute} ${period}`;
};

export const getScheduleByDayName = (
  user_attendance: UserAttendanceDetailInterface,
  dayName: Weekdays
): ISchedule | undefined =>
  user_attendance?.schedule.find((sched) => sched.scheduleDay === dayName);

export const getDisplayName = (user: IUser): string => user.firstName + ' ' + user.lastName;

export const getCurrentDayName = (): Weekdays =>
  new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase() as Weekdays;
