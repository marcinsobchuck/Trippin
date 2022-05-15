export type CabinClassValue = "M" | "W" | "C" | "F";

export type CabinClassText =
  | "Economy"
  | "Economy premium"
  | "Business"
  | "First class";

interface CabinClass {
  value: CabinClassValue;
  text: CabinClassText;
}

export const cabinClassArray: CabinClass[] = [
  {
    value: "M",
    text: "Economy",
  },
  {
    value: "W",
    text: "Economy premium",
  },
  {
    value: "C",
    text: "Business",
  },
  {
    value: "F",
    text: "First class",
  },
];
