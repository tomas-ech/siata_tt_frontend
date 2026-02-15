import { Package, TrendingDown, DollarSign, CheckCircle, Truck, Ship } from 'lucide-react';
import { useMemo } from 'react';
import { CustomButton } from '../commons/CustomButton';

// --- Lógica de Negocio fuera del componente ---
const calculateOrderDetails = (price: number, amount: number, method: 'mar' | 'tierra') => {
  const subtotal = price * amount;
  const shippingRate = method === 'mar' ? 0.10 : 0.20;
  const shippingCost = subtotal * shippingRate;

  let discountPercent = 0;
  if (amount >= 10) discountPercent = 15;
  else if (amount >= 5) discountPercent = 10;
  else if (amount >= 3) discountPercent = 5;

  const discount = subtotal * (discountPercent / 100);
  const total = subtotal + shippingCost - discount;

  return { subtotal, shippingCost, discount, total, discountPercent };
};

export const DeliverySummary = ({ selectedProduct, amount, type, destination }: OrderSummaryProps) => {
  // Memorizamos los cálculos para que solo cambien si cambian las dependencias
  const { subtotal, shippingCost, discount, total, discountPercent } = useMemo(() => {
    if (!selectedProduct) return { subtotal: 0, shippingCost: 0, discount: 0, total: 0, discountPercent: 0 };
    return calculateOrderDetails(selectedProduct.price, amount, type);
  }, [selectedProduct, amount, type]);

  if (!selectedProduct) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 text-center">
        <Package className="mx-auto size-12 text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Resumen del Pedido</h3>
        <p className="text-gray-500">Selecciona un producto para ver el desglose de costos.</p>
      </div>
    );
  }

  const handleCheckout = () => {
    // Aquí podrías llamar a tu API de FastAPI para crear la orden
    alert(`¡Pedido confirmado! Total: $${total.toFixed(2)}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-50 overflow-hidden">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Resumen del Pedido</h3>

      {/* Card del Producto Seleccionado */}
      <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl mb-6 border border-gray-100">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="w-20 h-20 object-cover rounded-lg shadow-sm"
        />
        <div className="flex-1">
          <p className="font-bold text-gray-800 leading-tight">{selectedProduct.name}</p>
          <div className="flex gap-3 mt-1">
             <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded">x{amount}</span>
             <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-0.5 rounded uppercase">
                {type}
             </span>
          </div>
        </div>
      </div>

      {/* Desglose de Precios */}
      <div className="space-y-4 mb-8">
        <SummaryLine icon={<Package size={16}/>} label="Subtotal" value={subtotal} />
        <SummaryLine icon={<DollarSign size={16}/>} label="Envío" value={shippingCost} />
        
        {discount > 0 && (
          <SummaryLine 
            icon={<TrendingDown size={16}/>} 
            label={`Descuento (${discountPercent}%)`} 
            value={-discount} 
            className="text-green-600 font-medium" 
          />
        )}

        <div className="pt-4 border-t border-dashed border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">Total a pagar</span>
            <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Info de Entrega */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 mb-6">
        <div className="flex items-start gap-3">
          {type === 'mar' ? <Ship className="text-blue-600 shrink-0" /> : <Truck className="text-blue-600 shrink-0" />}
          <div>
            <p className="text-sm font-bold text-blue-900 leading-none mb-1">Entrega en {destination}</p>
            <p className="text-xs text-blue-700 italic">
              Tiempo estimado: {type === 'mar' ? '15-30 días hábiles' : '5-10 días hábiles'}
            </p>
          </div>
        </div>
      </div>

      <CustomButton onClick={handleCheckout} variant="primary">
        <CheckCircle className="size-5" />
        Confirmar y Pagar
      </CustomButton>

      <p className="text-[10px] text-gray-400 text-center mt-4 leading-tight uppercase tracking-widest">
        Transacción segura • Mar y Tierra Logística
      </p>
    </div>
  );
}

// Componente interno para las líneas del resumen (Dry Principle)
function SummaryLine({ icon, label, value, className = "text-gray-600" }: any) {
  return (
    <div className={`flex justify-between items-center text-sm ${className}`}>
      <span className="flex items-center gap-2">
        {icon} {label}
      </span>
      <span className="font-mono">${Math.abs(value).toFixed(2)}</span>
    </div>
  );
}