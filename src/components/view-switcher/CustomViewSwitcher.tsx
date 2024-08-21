import { SchedulerView, ViewSwitcher } from "@devexpress/dx-react-scheduler";
import { MenuItem, Select } from "@mui/material";
import { viewSwitcherMessage } from "../../utils/translation/translation";

export const CustomViewSwitcher = ({
  currentView,
  availableViews,
  onChange,
}: ViewSwitcher.SwitcherProps) => (
  <Select
    value={currentView.name}
    onChange={(event) => onChange(event.target.value as string)}
  >
    {availableViews.map((view: SchedulerView) => {
      return (
        <MenuItem key={view.name} value={view.displayName}>
          {viewSwitcherMessage[view.name.toLowerCase()] || view.name}
        </MenuItem>
      );
    })}
  </Select>
);
