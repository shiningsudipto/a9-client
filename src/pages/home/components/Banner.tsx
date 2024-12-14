import { Carousel } from "@material-tailwind/react";
import img1 from "../../../assets/carousel/electronic-shop.jpg";
import img2 from "../../../assets/carousel/cart-products.jpg";
import img3 from "../../../assets/carousel/laptop-cart.jpg";
import SearchProducts from "../../../components/shared/SearchProducts";
const Banner = () => {
  const promotionalOffers = [
    {
      title: "Flash Sale - 50% Off",
      subtitle: "Grab the best deals on select electronics.",
      img: img1,
    },
    {
      title: "New Arrivals",
      subtitle: "Explore the latest gadgets in our collection.",
      img: img2,
    },
    {
      title: "Free Shipping",
      subtitle: "On all orders over $100. Shop now!",
      img: img3,
    },
  ];

  return (
    <section>
      <Carousel
        // autoplay={true}
        loop={true}
        className="z-0"
      >
        {promotionalOffers.map((item, index) => {
          return (
            <div
              key={index}
              className="relative lg:h-[80vh] h-[40vh] w-full z-0"
            >
              <img
                src={item.img}
                alt="image 1"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 grid h-full w-full bg-black/35">
                <div className="flex flex-col items-center justify-center text-white">
                  <h2 className="lg:text-6xl text-3xl font-bold">
                    {item.title}
                  </h2>
                  <h4 className="lg:text-4xl text-2xl lg:text-start text-center font-semibold">
                    {item.subtitle}
                  </h4>
                  <div className="mt-5">
                    <SearchProducts />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </section>
  );
};

export default Banner;
