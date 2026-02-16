import { useEffect } from "react";
import { CustomButton } from "../commons/CustomButton";
import { Formik, Form, useFormikContext } from "formik";
import { Ship, Truck, Plus, Minus } from "lucide-react";
import { useProducts } from "../../../providers/ProductProvider";
import { deliverySchema } from "../../utils/validations/deliveryValidations";

const FormObserver = () => {
  const { values } = useFormikContext<any>();
  const { setAmount, setDeliveryType, setDestination } = useProducts();

  useEffect(() => {
    setAmount(values.amount);
    setDeliveryType(values.deliveryType);
    setDestination(values.destination);
  }, [values, setAmount, setDeliveryType, setDestination]);

  return null;
};

const DESTINATIONS = [
  "Argentina",
  "Chile",
  "Perú",
  "Colombia",
  "México",
  "Uruguay",
  "Paraguay",
  "Venezuela",
];

export const DeliveryForm = () => {
  const { selectedProduct } = useProducts();

  if (!selectedProduct) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center py-8">
        Selecciona un producto del carrusel
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-6">
        Configurar Pedido
      </h3>

      <Formik
        initialValues={{
          amount: 1,
          deliveryType: "mar",
          destination: DESTINATIONS[0],
        }}
        validationSchema={deliverySchema}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            <FormObserver />

            <div className="grid grid-cols-2 itemce">
              <div>
                <label className="block font-medium ">Producto</label>
                <div className="p-4 rounded-xl  text-primary-hover">
                  <p className="font-bold">{selectedProduct.name}</p>
                  <p className="text-sm">
                    ${selectedProduct.price.toFixed(2)} / unidad
                  </p>
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2">
                  Cantidad
                </label>
                <div className="flex items-center ">
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue("amount", Math.max(1, values.amount - 1))
                    }
                    className="p-2  rounded-l-lg hover:bg-error-focus"
                  >
                    <Minus size={20} />
                  </button>
                  <input
                    readOnly
                    className="w-16 text-center py-2 border-2 border-gray-1 font-bold"
                    value={values.amount}
                  />
                  <button
                    type="button"
                    onClick={() => setFieldValue("amount", values.amount + 1)}
                    className="p-2  rounded-r-lg hover:bg-error-focus"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Método de envío
              </label>
              <div className="grid grid-cols-2 gap-4">
                <CustomButton
                  type="button"
                  variant="border"
                  isSelected={values.deliveryType === "mar"}
                  onClick={() => setFieldValue("deliveryType", "mar")}
                >
                  <div className="flex flex-col items-center py-2">
                    <Ship className="mb-1" />
                    <span className="">Mar (15d)</span>
                  </div>
                </CustomButton>

                <CustomButton
                  type="button"
                  variant="border"
                  isSelected={values.deliveryType === "tierra"}
                  onClick={() => setFieldValue("deliveryType", "tierra")}
                >
                  <div className="flex flex-col items-center py-2">
                    <Truck className="mb-1" />
                    <span className="">Tierra (10d)</span>
                  </div>
                </CustomButton>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Seleccione el Destino
              </label>
              <select
                name="destination"
                value={values.destination}
                onChange={(e) => setFieldValue("destination", e.target.value)}
                className="w-full px-4 py-3 border border-gray-1 rounded-xl focus:ring-2 focus:ring-primary outline-none"
              >
                {DESTINATIONS.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
