interface cabinClass {
  value: "M" | "W" | "C" | "F";
  text: "Economy" | "Economy premium" | "Business" | "First class";
}

export const cabinClassArray: cabinClass[] = [
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
