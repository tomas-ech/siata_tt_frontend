import { useState } from "react";
import { DeliveryForm } from "./DeliveryForm";
import { useNavigate } from "react-router-dom";
import { ProductSlider } from "./ProductSlider";
import { UserDeliveries } from "./UserDeliveries";
import { DeliverySummary } from "./DeliverySummary";
import { LogOut, Package, User } from "lucide-react";
import { CustomButton } from "../commons/CustomButton";
import { useProducts } from "../../../providers/ProductProvider";

export const HomePageContent = () => {
  const { isLoading, userInfo } = useProducts();
  const [currentTab, setCurrentTab] = useState(0);
  const navigate = useNavigate();

  if (isLoading) return <p>Cargando sistema...</p>;

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      className={`h-full min-h-screen w-screen transition-colors duration-150 ${currentTab === 0 ? "bg-primary" : "bg-secondary"}`}
    >
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
            </button>
          </div>
          <div className="flex items-center gap-4 text-nowrap">
            <div className="flex items-center gap-2">
              <User className="size-5" />
              <span>{userInfo?.user_name ?? ""}</span>
            </div>
            <CustomButton onClick={handleLogOut} variant="alert">
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
