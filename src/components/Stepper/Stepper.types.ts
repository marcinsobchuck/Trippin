import { Passengers } from "../Search/reducer/types/searchReducer.types";

export interface StepperProps {
  value: number;
  increment: () => void;
  decrement: () => void;
  minValue: number;
  maxValue: number;
  passengers: Passengers;
}
