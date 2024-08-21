import { useEffect, useState } from "react";
import { getAppointmentsDB } from "../../api/appointments/appointmets";
import { getCurrentDate } from "../../utils/date/get-date/getDate";

export type AppointmentModel = {
  id: string;
  title: string;
  startDate: Date;
  endDate?: Date;
  allDay?: boolean;
  rRule?: string;
  exDate?: string;
};

export const useSchedulerData = () => {
  const [data, setData] = useState<AppointmentModel[]>([]);

  // get data on the first render
  useEffect(() => {
    const fetchData = async () => {
      const appointments = await getAppointmentsDB(getCurrentDate());
      if (appointments.length) {
        setData([...appointments]);
      }
    };

    fetchData();
  }, []);

  const addApointment = (appointnemnt: AppointmentModel) => {
    setData((prevData) => [...prevData, appointnemnt]);
  };

  const updateAppointment = (
    id: string,
    updatedAppointment: AppointmentModel
  ) => {
    setData((prevData) =>
      prevData.map((app) => {
        if (app.id === id) {
          return { ...app, ...updatedAppointment };
        }
        return app;
      })
    );
  };

  const deleteAppointment = (id: string) => {
    setData((prevData) =>
      prevData.filter((appointnemnt) => appointnemnt.id !== id)
    );
  };

  return {
    data,
    setData,
    addApointment,
    updateAppointment,
    deleteAppointment,
  };
};
