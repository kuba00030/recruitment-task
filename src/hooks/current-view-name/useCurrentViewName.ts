import { useState } from "react";

type InitViewName = string;

export const useCurrentViewName = (initViewName: InitViewName) => {
  const [currentViewName, setCurrentViewName] = useState<string>(initViewName);

  return { currentViewName, setCurrentViewName };
};
