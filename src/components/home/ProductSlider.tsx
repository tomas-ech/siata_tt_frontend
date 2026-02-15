import Slider from "react-slick";
import { useProducts } from "../../../providers/ProductProvider";

export const ProductSlider = ( ) => {

  const { products, selectedProduct, setSelectedProduct } = useProducts();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl mb-4 font-bold">Nuestros Productos</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="p-2">
            <div
              className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform  hover:scale-105 ${
                selectedProduct?.id === product.id ? 'ring-4 ring-secondary' : ''
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={"https://placehold.net/product.svg"}
                alt={product.name}
                className="h-fit w-full bg-black "
              />
              <div className="p-4">
                <h3 className="mb-2">{product.name}</h3>
                <p className=" text-sm mb-2">{product.description}</p>
                <p className="text-primary-hover text-xl">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}
