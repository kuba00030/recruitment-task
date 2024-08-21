import "./custom-date-picker.css";
import { AppointmentForm } from "@devexpress/dx-react-scheduler";
import { TextField } from "@mui/material";
import {
  DesktopDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pl";

export const CustomeDatePicker = ({
  readOnly,
  value,
  onValueChange,
  locale,
}: AppointmentForm.DateEditorProps) => {
  const handleChange = (newValue: any) => {
    onValueChange(newValue.$d);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DesktopDateTimePicker
        ampm={false}
        readOnly={readOnly}
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} className="custom-date-picker" />
        )}
        toolbarTitle={"Wybierz datę"}
      />
    </LocalizationProvider>
  );
};
