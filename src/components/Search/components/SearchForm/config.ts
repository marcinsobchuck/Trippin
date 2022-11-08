import * as Yup from "yup";

export const searchSchema = Yup.object().shape({
  start: Yup.object({
    id: Yup.string().required("Required"),
  }),
  date: Yup.object().when("flightType", {
    is: "round",
    then: Yup.object({
      departDate: Yup.string().required("Required"),
      returnDate: Yup.string().required("If round, return required"),
    }),
    otherwise: Yup.object({
      departDate: Yup.string().required("Required"),
    }),
  }),
});
