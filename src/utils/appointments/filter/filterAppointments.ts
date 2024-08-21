import { AppointmentModel } from "../../../hooks/scheduler-data/useSchedulerData";

export const filterAppointments = (
  existeingData: AppointmentModel[],
  fetchedData: AppointmentModel[]
) => {
  // get rid of duplicate
  const existingId = existeingData.map((appointment) => appointment.id);
  return fetchedData.filter((app) => !existingId.includes(app.id));
};
