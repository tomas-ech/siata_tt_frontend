import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { productService } from "../src/utils/services/products";
import type { IProduct } from "../src/types/product";

interface userInfo {
  user_id: number;
  user_name: string;
}

interface IProductContext {
  products: IProduct[];
  isLoading: boolean;
  userInfo: userInfo | undefined;
  selectedProduct: IProduct | null;
  amount: number;
  deliveryType: "mar" | "tierra";
  destination: string;

  setSelectedProduct: (product: IProduct | null) => void;
  setAmount: (qty: number) => void;
  setDeliveryType: (method: "mar" | "tierra") => void;
  setDestination: (dest: string) => void;
  resetOrder: () => void;
}

const ProductContext = createContext<IProductContext | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [amount, setAmount] = useState(1);
  const [deliveryType, setDeliveryType] = useState<"mar" | "tierra">("mar");
  const [destination, setDestination] = useState("Buenos Aires, Argentina");
  const [userInfo, setUserInfo] = useState();

  const resetOrder = () => {
    setAmount(1);
    setDeliveryType("mar");
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localUser = localStorage.getItem("user");

        if (localUser) {
          const userObj = JSON.parse(localUser);
          setUserInfo(userObj);
        }
        setIsLoading(true);
        const productsData = await productService();
        setProducts(productsData);
      } catch (err) {
        alert("Error cargando los productos");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        userInfo,
        isLoading,
        selectedProduct,
        setSelectedProduct,
        amount,
        setAmount,
        deliveryType,
        setDeliveryType,
        destination,
        setDestination,
        resetOrder,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("Estas fuera del rango de ProductProvider");
  return context;
};
