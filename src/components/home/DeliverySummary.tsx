import {
  Package,
  TrendingDown,
  DollarSign,
  CheckCircle,
  Truck,
  Ship,
} from "lucide-react";
import { useMemo } from "react";
import { CustomButton } from "../commons/CustomButton";
import { useProducts } from "../../../providers/ProductProvider"; // Ajusta la ruta según tu proyecto

// --- Lógica de Negocio (Se mantiene igual, fuera para testabilidad) ---
const calculateOrderDetails = (
  price: number,
  amount: number,
  method: "mar" | "tierra",
) => {
  const subtotal = price * amount;
  const shippingRate = method === "mar" ? 0.1 : 0.2;
  const shippingCost = subtotal * shippingRate;

  let discountPercent = 0;
  if (amount >= 10) discountPercent = 15;
  else if (amount >= 5) discountPercent = 10;
  else if (amount >= 3) discountPercent = 5;

  const discount = subtotal * (discountPercent / 100);
  const total = subtotal + shippingCost - discount;

  return { subtotal, shippingCost, discount, total, discountPercent };
};

export const DeliverySummary = () => {
  const { selectedProduct, amount, deliveryType, destination } = useProducts();

  const { subtotal, shippingCost, discount, total, discountPercent } =
    useMemo(() => {
      if (!selectedProduct)
        return {
          subtotal: 0,
          shippingCost: 0,
          discount: 0,
          total: 0,
          discountPercent: 0,
        };

      return calculateOrderDetails(selectedProduct.price, amount, deliveryType);
    }, [selectedProduct, amount, deliveryType]);

  if (!selectedProduct) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <Package className="mx-auto size-12 text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Resumen del Pedido
        </h3>
        <p className="text-gray-500 italic">
          Selecciona un producto para calcular costos.
        </p>
      </div>
    );
  }

  const handleCheckout = () => {
    alert(`¡Pedido confirmado! Total: $${total.toFixed(2)}`);
  };

  return (
    <div className="bg-white rounded-xl p-6 overflow-hidden">
      <h3 className="text-xl font-bold mb-2">
        Resumen del Pedido
      </h3>

      <div className="flex items-center gap-4 p-3 rounded-xl mb-6">
        <img
          src={"https://placehold.net/product.svg"}
          alt={selectedProduct.name}
          className="w-20 h-20 object-cover rounded-lg "
        />
        <div className="flex-1">
          <p className="font-bold leading-tight">
            {selectedProduct.name}
          </p>
          <div className="flex gap-3 mt-1">
            <span className="text-md font-medium px-2 py-0.5 rounded">
              x{amount}
            </span>
            <span className="text-md font-medium px-2 py-0.5 rounded capitalize">
              {deliveryType}
            </span>
          </div>
        </div>
      </div>


      <div className="space-y-4 mb-2">
        <SummaryLine
          icon={<Package size={16} />}
          label="Subtotal"
          value={subtotal}
        />
        <SummaryLine
          icon={<DollarSign size={16} />}
          label="Envío"
          value={shippingCost}
        />

        {discount > 0 && (
          <SummaryLine
            icon={<TrendingDown size={16} />}
            label={`Descuento (${discountPercent}%)`}
            value={-discount}
            className="text-secondary-hover font-bold"
          />
        )}

          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">
              Total a pagar
            </span>
            <span className="text-2xl font-black text-primary-hover">
              ${total.toFixed(2)}
            </span>
          </div>
      </div>

      <div className="p-4 rounded-xl mb-2">
        <div className="flex items-start gap-3">
          {deliveryType === "mar" ? (
            <Ship className="text-primary-hover shrink-0" />
          ) : (
            <Truck className="text-secondary-hover shrink-0" />
          )}
          <div className={`${deliveryType === "mar" ? "text-primary-hover" : "text-secondary-hover"}`}>
            <p className="text-ms font-bold leading-none mb-1">
              Entrega en {destination}
            </p>
            <p className={`text-sm font-medium`}>
              Estimado: {deliveryType === "mar" ? "15-30 días" : "5-10 días"}
            </p>
          </div>
        </div>
      </div>

      <CustomButton onClick={handleCheckout} variant="primary">
        <div className="flex items-center justify-center gap-x-2">
          <CheckCircle className="size-5" />
          Confirmar Pedido
        </div>
      </CustomButton>
    </div>
  );
};

function SummaryLine({ icon, label, value, className = "text-black" }: any) {
  return (
    <div className={`flex justify-between items-center text-sm ${className}`}>
      <span className="flex items-center gap-2">
        {icon} {label}
      </span>
      <span className="font-mono">${Math.abs(value).toFixed(2)}</span>
    </div>
  );
}
