import { useState } from "react";
import { useProducts } from "../../../providers/ProductProvider";
import { DeliveryForm } from "./DeliveryForm";
import { DeliverySummary } from "./DeliverySummary";
import { ProductSlider } from "./ProductSlider";
import { UserDeliveries } from "./UserDeliveries";
import { LogOut, Package, User } from "lucide-react";
import { CustomButton } from "../commons/CustomButton";

export const HomePageContent = () => {
  const { isLoading } = useProducts();
  const [currentTab, setCurrentTab] = useState(0)

  if (isLoading) return <p>Cargando sistema...</p>;

  return (
    <div className={`h-full min-h-screen w-screen transition-colors duration-150 ${currentTab === 0 ? "bg-primary" : "bg-secondary"}`}>
      <header className="bg-white">
        <div className="max-w-7xl mx-auto py-2 flex items-end gap-x-2">
          <h1 className="text-2xl font-black">SIATA</h1>
          <p className="text-sm">Sistema de envios</p>
        </div>
      </header>

      <div className="bg-white">
        <div className="max-w-7xl flex justify-between mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setCurrentTab(0)}
              className={`py-2 px-5 rounded-t-xl transition-all duration-200 ${
                currentTab === 0
                  ? "bg-primary text-black font-bold"
                  : "bg-transparent hover:text-primary hover:font-bold"
              }`}
            >
              Productos
            </button>
            <button
              onClick={() => setCurrentTab(1)}
              className={`py-2 px-5 rounded-t-xl transition-all duration-200 flex items-center gap-2 ${
                currentTab === 1
                  ? "bg-secondary text-black font-bold"
                  : "bg-transparent hover:text-secondary hover:font-bold"
              }`}
            >
              <Package className="size-4" />
              Mis Envíos
              {/* {shipments.filter((s) => s.status !== "entregado").length > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                  {shipments.filter((s) => s.status !== "entregado").length}
                </span>
              )} */}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="size-5" />
              <span>Nombre</span>
            </div>
            <CustomButton onClick={() => {}} variant="alert">
              <LogOut className="size-5" />
              Log Out
            </CustomButton>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentTab == 0 ? (
          <>
            <ProductSlider /> 
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DeliveryForm />
              </div>
              <div>
                <DeliverySummary />
              </div>
            </div>
          </>
        ) : (
          <UserDeliveries />
        )}
      </main>
    </div>
  );
};