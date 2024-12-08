import { IoMdCart } from "react-icons/io";
import { TProduct } from "../../types";
import { Link } from "react-router-dom";

const ProductCard = ({ products }: { products: TProduct[] }) => {
  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: TProduct) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  <Link to={`/product-details/${product?.id}`}>
                    {product.name}
                  </Link>
                </h3>
                <p className="text-gray-600 mt-1">
                  ${product.price}{" "}
                  {product.discount > 0 && (
                    <span className="text-red-500 text-sm ml-2">
                      -{product.discount}% Off
                    </span>
                  )}
                </p>
                <button className="flex items-center justify-center gap-2 mt-4 w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition">
                  <IoMdCart />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products available.</p>
      )}
    </div>
  );
};

export default ProductCard;
