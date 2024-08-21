import { ValidationError } from "./appointmentValidation";

export const showValidaitonErrors = (errors: ValidationError[]) => {
  const errorMessages = errors.map((error) => error.message).join("\n");
  window.alert(errorMessages);
};
