import { FieldHookConfig } from "formik";
import { RecommendedPlace } from "src/shared/types";

export interface Props {
  label: string;
  placeholder: string;
  type: "text" | "radio";
  className?: string;
  isDestination?: boolean;
  currentRecommendedPlace?: RecommendedPlace;
}

export type SearchFormInputProps = Props &
  FieldHookConfig<{
    id: string;
    text: string;
  }>;
