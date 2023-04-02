import * as Yup from "yup";

export const searchSchema = Yup.object().shape({
  start: Yup.object({
    id: Yup.string().required("Required"),
  }),
  date: Yup.object().when("flightType", {
    is: "round",
    then: Yup.object({
      inbound: Yup.string().required("Required"),
      outbound: Yup.string().required("If round, return required"),
    }),
    otherwise: Yup.object({
      inbound: Yup.string().required("Required"),
    }),
  }),
});
