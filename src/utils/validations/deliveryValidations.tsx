import { string, object, number, mixed } from "yup";

export const deliverySchema = object().shape({
  amount: number().min(1, "Mínimo 1 unidad").required("Requerido"),
  type: mixed().oneOf(["mar", "tierra"]).required(),
  destination: string().required("Selecciona un destino"),
});
