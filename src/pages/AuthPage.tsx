import { useState } from "react";
import { Formik, Form } from "formik";
import { Ship, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  loginSchema,
  registerSchema,
} from "../utils/validations/authValidations";
import { CustomInput } from "../components/commons/CustonInput";
import { CustomButton } from "../components/commons/CustomButton";
import { loginService } from "../features/auth/services/login";
import { registerService } from "../features/auth/services/register";

const AuthPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    name: "",
    identity: "",
    tel: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any,
  ) => {
    try {
      if (currentTab == 0) {
        const data = await loginService(values.email, values.password);

        localStorage.setItem("token", data.access_token);

        // navigate("/");
      } else {
        await registerService({
          email: values.email,
          password: values.password,
          name: values.name,
          identity_number: values.identity,
          contact_phone: values.tel
        });

        alert("Registro exitoso, ahora puedes iniciar sesión");
      }
    } catch (error: any) {
        alert("Ocurrió un error inesperado");
      
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-linear-to-br from-secondary to-primary flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
        <div className="flex items-center justify-around mb-8">
          <Truck className="size-10 text-secondary" />

          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">SIATA</h1>
            <p className="font-medium">Sistema de envios</p>
          </div>

          <Ship className="size-10 text-primary" />
        </div>

        <div className="flex mb-6 gap-x-5">
          {["Iniciar Sesión", "Registrarse"].map((tab, index) => {
            return (
              <CustomButton
                key={tab}
                isSelected={currentTab == index}
                onClick={() => setCurrentTab(index)}
              >
                {tab}
              </CustomButton>
            );
          })}
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={currentTab == 0 ? loginSchema : registerSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="space-y-4">
              <CustomInput
                label="Correo electrónico"
                name="email"
                type="email"
                placeholder="tomas@siata.com"
              />

              <CustomInput
                label="Contraseña"
                name="password"
                type="password"
                placeholder="******"
              />

              {currentTab != 0 && (
                <>
                  <CustomInput
                    label="Nombre completo"
                    name="name"
                    placeholder="Ej. Tomas Echeverri"
                  />
                  <CustomInput
                    label="Documento de identidad"
                    name="identity"
                    placeholder="115968523"
                  />
                  <CustomInput
                    label="Número de contacto"
                    name="tel"
                    placeholder="3196894111"
                  />
                </>
              )}

              <CustomButton
                type="submit"
                isDisabled={isSubmitting || !isValid || !dirty}
              >
                {currentTab == 0 ? "Iniciar Sesión" : "Crear Cuenta"}
              </CustomButton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthPage;
