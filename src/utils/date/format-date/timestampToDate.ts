import { Timestamp } from "firebase/firestore";

export const timestampToDate = (timeStamp: Timestamp) => {
  const date = timeStamp.toDate();
  return date;
};
