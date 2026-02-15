import { string, object, number } from "yup";

export const loginSchema = object({
  email: string().email("Email inválido").required("El email es obligatorio"),
  password: string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
});

export const registerSchema = object({
  name: string().required("El nombre es obligatorio"),
  identity: number().required("El número de identidad es obligatorio").typeError("Deben ser números"),
  tel: number().min(7, "Minimo 7 caracteres").typeError("Deben ser números"),
  email: string().email("Email inválido").required("El email es obligatorio"),
  password: string()
    .min(8, "Minimo 8 caracteres")
    .required("La contraseña es obligatoria"),
});
