export const getCurrentDate = (): Date => {
  const date = new Date();
  return date;
};

export const getEndOfTheMonth = (date: Date): Date => {
  const month = date.getMonth();
  const year = date.getFullYear();

  const endOfTheMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

  return endOfTheMonth;
};

export const getStartOfTheMonth = (date: Date): Date => {
  const month = date.getMonth();
  const year = date.getFullYear();

  const startOfTheMonth = new Date(year, month, 1);

  return startOfTheMonth;
};
