import { AppointmentModel } from "../../../hooks/scheduler-data/useSchedulerData";
import { timestampToDate } from "../../date/format-date/timestampToDate";

export const mapAppointments = (docs: any[]): AppointmentModel[] => {
  // map fetched appointments into array of objeects of type "AppointmentModel"
  return docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      title: data.title,
      startDate: timestampToDate(data.startDate),
      ...(data.endDate && { endDate: timestampToDate(data.endDate) }),
      ...(data.notes && { notes: data.notes }),
      ...(data.allDay && { allDay: data.allDay }),
      ...(data.rRule && { rRule: data.rRule }),
    };
  });
};
