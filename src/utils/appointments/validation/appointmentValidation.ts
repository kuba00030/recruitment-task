import { AppointmentModel } from "../../../hooks/scheduler-data/useSchedulerData";

export type ValidationError = {
  message: string;
};

export const validateAppointment = (
  appointment: AppointmentModel
): [ValidationError[], boolean] => {
  const errors: ValidationError[] = [];

  if (!appointment.title) {
    errors.push({ message: "Wydarzenie musi posiadać tytuł" });
  }

  if (appointment.endDate && appointment.startDate > appointment.endDate) {
    errors.push({
      message: "Data początkowa nie może być późniejsza niż data końcowa",
    });
  }

  const isValid = errors.length === 0;

  return [errors, isValid];
};
