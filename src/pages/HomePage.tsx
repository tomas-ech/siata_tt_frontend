import { ProductProvider } from "../../providers/ProductProvider";
import { HomePageContent } from "../components/home/HomePageContent";

const HomePage = () => {
  return (
    <ProductProvider>
      <HomePageContent />
    </ProductProvider>
  );
};

export default HomePage;
