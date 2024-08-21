import Paper from "@mui/material/Paper";
import {
  AllDayPanel,
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  CurrentTimeIndicator,
  DateNavigator,
  DayView,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  ChangeSet,
  EditingState,
  IntegratedEditing,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  AppointmentModel,
  useSchedulerData,
} from "./hooks/scheduler-data/useSchedulerData";
import {
  deleteAppointmentDB,
  getAppointmentsDB,
  setAppointmentDB,
} from "./api/appointments/appointmets";
import { appointmentAlreadyFetched } from "./utils/appointments/chech-if-exist/appointmentAlreadyFerched";
import { CustomViewSwitcher } from "./components/view-switcher/CustomViewSwitcher";
import {
  allDayMessages,
  appointmentFormMessages,
  locale,
  todayButtonMessage,
} from "./utils/translation/translation";
import { createEventId } from "./utils/create-appointment-id/createEventId";
import { validateAppointment } from "./utils/appointments/validation/appointmentValidation";
import { showValidaitonErrors } from "./utils/appointments/validation/showValidationErrors";
import { filterAppointments } from "./utils/appointments/filter/filterAppointments";
import { CustomeDatePicker } from "./components/date-picker/CustomDatePicker";
import { useCurrentViewName } from "./hooks/current-view-name/useCurrentViewName";
import { CustomTableCell } from "./components/month-view/CustomTableCell";

const SchedulerComponent = () => {
  const { currentViewName, setCurrentViewName } = useCurrentViewName("Week");
  const { data, setData, addApointment, deleteAppointment, updateAppointment } =
    useSchedulerData();

  const error: string = "...UPS\nCos poszło nie tak podczas";

  const handleAddAppointment = async (added: Partial<AppointmentModel>) => {
    try {
      const newAppointment: AppointmentModel = {
        ...added,
        id: createEventId(),
      } as AppointmentModel;

      const [errors, isValid] = validateAppointment(newAppointment);

      if (!isValid) {
        showValidaitonErrors(errors);
        return;
      }

      await setAppointmentDB(newAppointment);
      addApointment(newAppointment);
    } catch {
      window.alert(`${error} dodawania wydarzenia`);
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    try {
      console.log(id);
      await deleteAppointmentDB(id);
      deleteAppointment(id);
    } catch {
      window.alert(`${error} usuwania wydarzenia`);
    }
  };

  const handleUpdateAppointment = async (changed: any) => {
    try {
      const id = Object.keys(changed)[0];
      const appointment = data.find((app) => app.id === id);
      const updatedAppointment = { ...appointment, ...changed[id] };
      const [errors, isValid] = validateAppointment(updatedAppointment);

      if (!isValid) {
        showValidaitonErrors(errors);
        return;
      }
      updateAppointment(id, updatedAppointment);
      await setAppointmentDB(updatedAppointment);
    } catch {
      window.alert(`${error} aktualizowania wydarzenia`);
    }
  };

  const commitChanges = async ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      await handleAddAppointment(added);
    }

    if (deleted) {
      await handleDeleteAppointment(deleted.toString());
    }

    if (changed) {
      await handleUpdateAppointment(changed);
    }
  };

  const handleCurrentDateChange = async (date: Date) => {
    // re-fecth appointments only when appointments for currently displayed month hasn't been fetched before
    if (!appointmentAlreadyFetched(date, data)) {
      const appointments = await getAppointmentsDB(date);
      if (appointments.length) {
        const filteredAppointments = filterAppointments(data, appointments);
        setData((prevData) => [...prevData, ...filteredAppointments]);
      }
    }
  };

  return (
    <Paper style={{ height: "100vh", overflow: "hidden" }}>
      <Scheduler data={data} locale={locale} firstDayOfWeek={1}>
        <ViewState
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
          onCurrentDateChange={handleCurrentDateChange}
        />
        <DayView startDayHour={6} endDayHour={18} />
        <WeekView startDayHour={6} endDayHour={18} />
        <MonthView intervalCount={1} timeTableCellComponent={CustomTableCell} />
        <AllDayPanel messages={allDayMessages} />
        <Toolbar />
        <ViewSwitcher switcherComponent={CustomViewSwitcher} />
        <TodayButton messages={todayButtonMessage} />
        <DateNavigator />
        <Appointments />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <AppointmentTooltip showCloseButton showDeleteButton showOpenButton />
        <AppointmentForm
          messages={appointmentFormMessages}
          dateEditorComponent={CustomeDatePicker}
        />
        <CurrentTimeIndicator />
      </Scheduler>
    </Paper>
  );
};

export default SchedulerComponent;
