import { useState, useEffect } from "react";
import { deliveryService } from "../../utils/services/delivery";
import {
  Package,
  Ship,
  Truck,
  Calendar,
  Clock,
  DollarSign,
} from "lucide-react";
import type { IDeliveryResponse } from "../../types/delivery";

export const UserDeliveries = () => {
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const localUser = localStorage.getItem("user");
        if (localUser) {
          const data = await deliveryService.getAllByUser(
            JSON.parse(localUser).user_id,
          );
          setDeliveries(data);
        }
      } catch (error) {
        console.error("Error cargando envíos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  if (isLoading)
    return <div className="animate-pulse space-y-4">Cargando...</div>;

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="px-6 py-2 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold ">Mis Envíos</h3>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-primary">
            {deliveries.length}
          </span>
          <p className=" font-bold uppercase">Paquetes</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {deliveries.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 size-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-gray-300 size-10" />
            </div>
            <p className="font-medium">No se encontraron envíos</p>
          </div>
        ) : (
          deliveries.map((delivery) => (
            <DeliveryCard key={delivery.id} delivery={delivery} />
          ))
        )}
      </div>
    </div>
  );
};

interface DeliveryCardProp {
  delivery: IDeliveryResponse;
}

const DeliveryCard = ({ delivery }: DeliveryCardProp) => {
  return (
    <div className="group border border-primary rounded-2xl p-5 hover:border-primary hover:shadow-lg hover:shadow-primary transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="size-12 rounded-xl flex items-center justify-center">
            {delivery.delivery_type_id !== 1 ? (
              <Ship size={50} className="text-primary-hover" />
            ) : (
              <Truck size={50} className="text-secondary-hover" />
            )}
          </div>
          <div>
            <h4 className="font-bold group-hover:text-primary transition-colors">
              Código de seguimiento:
            </h4>
            <p className="text-lg font-mono">{delivery.tracking_code}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 ">
        {/* <div className="flex items-center gap-3 ">
          <MapPin size={25} className="text-error" />
          <div className="text-lg">
            <p className="font-medium">Destino</p>
            <p className="font-bold">{delivery.destination_id}</p>
          </div>
        </div> */}
        <div className="flex items-center gap-3 ">
          <Calendar size={25} className="text-primary" />
          <div className="text-lg">
            <p className="font-medium">Fecha Pedido</p>
            <p className="font-bold">
              {new Date(delivery.registry_date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 ">
          <Clock size={25} className="text-secondary-hover" />
          <div className="text-lg">
            <p className="font-medium">Entrega Estimada</p>
            <p className="font-bold text-secondary-hover">
              {new Date(delivery.delivery_date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DollarSign size={25} className="text-secondary-hover" />
          <div className="text-lg">
            <p className="font-medium">Inversión</p>
            <p className="text-xl font-black">
              <span className="text-xl font-bold mr-1">$</span>
              {(
                delivery.price +
                delivery.ship_cost -
                delivery.discount
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
