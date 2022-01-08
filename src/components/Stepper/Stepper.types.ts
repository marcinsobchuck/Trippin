export interface StepperProps {
  value: number;
  increment: () => void;
  decrement: () => void;
  minValue: number;
  maxValue: number;
}
