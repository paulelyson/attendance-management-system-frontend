import {
  ISchedule,
  IScheduleExt,
  UserAttendanceDetailInterface,
  Weekdays,
} from '../models/AttendanceUserDetail';
import { IUser } from '../models/User';

export const scheduleToScheduleExt = (schedule: ISchedule | undefined): IScheduleExt => {
  return {
    schedule: schedule
      ? convertTimeTo12HourFormat(schedule.timeIn) +
        ' - ' +
        convertTimeTo12HourFormat(schedule.timeOut)
      : '',
    breaks: schedule
      ? schedule.break.map(
          (x) =>
            `${x.type} (${convertTimeTo12HourFormat(x.breakIn)} - ${convertTimeTo12HourFormat(
              x.breakOut
            )})`
        )
      : [],
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
): ISchedule | undefined => user_attendance.schedule.find((sched) => sched.scheduleDay === dayName);

export const getDisplayName = (user: IUser): string => user.firstName + ' ' + user.lastName;

export const getCurrentDayName = (): Weekdays => new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase() as Weekdays;
