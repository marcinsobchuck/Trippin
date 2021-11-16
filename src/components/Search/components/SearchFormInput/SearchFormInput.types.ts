import { FieldHookConfig } from "formik";

export interface Props {
  label: string;
  placeholder: string;
  type: "text" | "radio";
  className?: string;
  currentRecommendedPlace?: {
    id: string;
    place_key?: string;
    inputText: string;
    place: string;
  };
  hasCurrentRecommendedPlacesChanged?: boolean;
  setHasCurrentRecommendedPlacesChanged?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export type SearchFormInputProps = Props & FieldHookConfig<string>;
