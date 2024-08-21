import { MonthView } from "@devexpress/dx-react-scheduler";
import "./custom-table-cell.css";
import { TableCell } from "@mui/material";

const options: Intl.DateTimeFormatOptions = {
  day: "numeric",
};

export const CustomTableCell = ({
  startDate,
  today,
  otherMonth,
  formatDate,
  onDoubleClick,
}: MonthView.TimeTableCellProps) => {
  const start = formatDate ? formatDate(startDate, options) : "";
  return (
    <TableCell
      tabIndex={0}
      className={`month-table-cell ${
        otherMonth ? "other-month-table-cell" : "current-month-table-cell"
      }`}
      onDoubleClick={onDoubleClick}
    >
      <div className={`${today ? "cell-today" : "cell-text"}`}>{start}</div>
    </TableCell>
  );
};
