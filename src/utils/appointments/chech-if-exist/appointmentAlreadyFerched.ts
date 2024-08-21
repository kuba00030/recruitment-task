import { AppointmentModel } from "../../../hooks/scheduler-data/useSchedulerData";
import {
  getEndOfTheMonth,
  getStartOfTheMonth,
} from "../../date/get-date/getDate";

export const appointmentAlreadyFetched = (
  currentDate: Date,
  appointments: AppointmentModel[]
): boolean => {
  // chech if at least one appointments that belongs to currently month being viewed has been fetched (used for decide to fetch or not, appointments for certain month)
  return appointments.some(
    (app) =>
      app.startDate >= getStartOfTheMonth(currentDate) &&
      app.startDate <= getEndOfTheMonth(currentDate)
  );
};
