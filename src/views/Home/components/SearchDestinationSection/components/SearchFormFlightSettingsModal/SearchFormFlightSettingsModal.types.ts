import { FieldHookConfig } from 'formik';

import { FlightSettings } from 'src/views/Home/types/types';

export interface Props {
  showFlightSettingsModal: boolean;
  setShowFlightSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type SearchFormFlightSettingsProps = Props & FieldHookConfig<FlightSettings>;

export type Operation = 'INCREMENT' | 'DECREMENT';
