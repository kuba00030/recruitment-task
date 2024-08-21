import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import {
  getEndOfTheMonth,
  getStartOfTheMonth,
} from "../../utils/date/get-date/getDate";
import { mapAppointments } from "../../utils/appointments/map/mapAppointments";
import { initializeApp } from "firebase/app";
import { AppointmentModel } from "../../hooks/scheduler-data/useSchedulerData";
import { firebaseConfig } from "../firebase-config/firebaseConfig";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const error: string = "Failed while";

export const getAppointmentsDB = async (date: Date) => {
  try {
    // create firestore timestamp for query

    const startTimeStamp = Timestamp.fromDate(getStartOfTheMonth(date));
    const endTimeStamp = Timestamp.fromDate(getEndOfTheMonth(date));

    const appointmentRef = collection(db, "appointments");

    // get appointments between start and end of the currently displayed month
    const appointments = await getDocs(
      query(
        appointmentRef,
        where("startDate", ">=", startTimeStamp),
        where("startDate", "<=", endTimeStamp)
      )
    );

    // if appointments exists map them otherwise return empty array

    return appointments.empty ? [] : mapAppointments(appointments.docs);
  } catch (err) {
    console.log(`${error} fetching appontment`, err);

    return [];
  }
};

export const setAppointmentDB = async (appointment: AppointmentModel) => {
  // add new appointment if it doesnt exist or update it if exist
  try {
    await setDoc(doc(db, "appointments", appointment.id), appointment, {
      merge: true,
    });
  } catch (err) {
    console.log(`${error} setting appontment`, err);
  }
};

export const deleteAppointmentDB = async (appID: string) => {
  // delete exesting appointment from firestore
  try {
    await deleteDoc(doc(db, "appointments", appID));
  } catch (err) {
    console.log(`${error} deleting appontment`, err);
  }
};
