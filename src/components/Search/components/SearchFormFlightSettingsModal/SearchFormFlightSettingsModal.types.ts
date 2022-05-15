import { FieldHookConfig } from "formik";
import { FlightSettings } from "../SearchForm/SearchForm.types";

export interface Props {
  showFlightSettingsModal: boolean;
  setShowFlightSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type SearchFormFlightSettingsProps = Props &
  FieldHookConfig<FlightSettings>;
