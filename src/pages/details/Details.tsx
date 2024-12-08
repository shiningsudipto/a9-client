import { Link, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/features/product";
import CustomButton from "../../components/ui/CustomButton";

const Details = () => {
  const { id } = useParams();
  const { data } = useGetProductDetailsQuery(id);

  const productData = data?.data;

  return (
    <div className="container mx-auto py-8 px-4">
      {productData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="relative">
            <img
              src={productData.images?.[0]}
              alt={productData.name}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
            {productData.flashSale && (
              <div className="absolute top-4 left-4 bg-primary-400 text-white px-4 py-1 rounded-full text-sm font-bold">
                Flash Sale
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-text">{productData.name}</h1>
            <p className="text-xl font-semibold text-secondary-500">
              ${productData.price}
            </p>
            <p className="">{productData.description}</p>

            {/* Additional Details */}
            <div className="space-y-2">
              <p className="">
                <span className="font-semibold">Category:</span>{" "}
                {productData.category}
              </p>
              <p className="">
                <span className="font-semibold">Stock:</span>{" "}
                {productData.stock}
              </p>
              {productData.discount && (
                <p className="text-primary-500">
                  Discount: {productData.discount}%
                </p>
              )}
              <div className="w-fit">
                <CustomButton label="Add to cart" />
              </div>
            </div>

            {/* Shop Information */}
            <div className="flex items-center gap-4 mt-4 p-4 border rounded-lg shadow-sm">
              <img
                src={productData.shop?.logo}
                alt={productData.shop?.name}
                className="w-20 h-20 object-cover rounded-full"
              />
              <div>
                <p className="font-semibold text-secondary-600">
                  <Link to={`/shop-details/${productData?.shop?.id}`}>
                    {productData.shop?.name}
                  </Link>
                </p>
                <p className="mb-5">{productData.shop?.description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">Loading...</p>
      )}
    </div>
  );
};

export default Details;
