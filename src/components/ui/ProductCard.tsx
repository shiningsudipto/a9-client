import { IoMdCart } from "react-icons/io";
import { TProduct } from "../../types";
import { Link } from "react-router-dom";
import {
  addProduct,
  replaceCart,
  useCartOptions,
} from "../../redux/slices/cart";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "sonner";

const ProductCard = ({
  products,
  cols = 4,
}: {
  products: TProduct[];
  cols?: number;
}) => {
  const dispatch = useAppDispatch();
  const { vendorId } = useAppSelector(useCartOptions);

  // Function to handle adding product to the cart
  const handleAddToCart = (product: TProduct) => {
    const productData = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      vendorId: product.shopId,
      image: product.images[0],
    };

    // If vendorId exists and is different, show warning
    if (vendorId && vendorId !== product.shopId) {
      // Replace or cancel logic
      const confirmReplace = window.confirm(
        "Your cart contains items from another vendor. Do you want to replace the cart?"
      );
      if (confirmReplace) {
        dispatch(replaceCart([productData]));
        toast.success("Cart replaced with the new product!");
      } else {
        toast.info("Action canceled. Cart remains unchanged.");
      }
    } else {
      // Add product to cart
      dispatch(addProduct(productData));
      toast.success(`${product.name} added to cart!`);
    }
  };

  return (
    <div>
      {products?.length > 0 ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${cols} gap-6`}
        >
          {products.map((product: TProduct) => {
            const titleLengthCount = product?.name?.length;
            return (
              <div
                key={product?.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={product?.images[0]}
                  alt={product?.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    <Link to={`/product-details/${product?.id}`}>
                      {titleLengthCount > 40 ? (
                        <>{product?.name.slice(0, 40)}...</>
                      ) : (
                        product?.name
                      )}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mt-1">
                    ${product?.price}{" "}
                    {product?.discount > 0 && (
                      <span className="text-red-500 text-sm ml-2">
                        -{product?.discount}% Off
                      </span>
                    )}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center justify-center gap-2 mt-4 w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition"
                  >
                    <IoMdCart />
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600">No products available.</p>
      )}
    </div>
  );
};

export default ProductCard;
