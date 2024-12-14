import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import CategorySection from "./components/CategorySection";
import FlashSale from "./components/FlashSale";
import { IoIosArrowUp } from "react-icons/io";
import FollowingProducts from "./components/FollowingProducts";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import AllProducts from "./components/AllProducts";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const user = useAppSelector(useCurrentUser) as TUser;

  // Show button when scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="relative">
      {/* Scroll-to-Top Button */}
      {isVisible && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={scrollToTop}
            className="border p-2 rounded-full bg-secondary-300 hover:bg-secondary-500 text-white transition duration-300"
          >
            <IoIosArrowUp className="text-xl" />
          </button>
        </div>
      )}
      {/* Page Content */}
      <Banner />
      <AllProducts />
      <FlashSale />
      <CategorySection />
      {user && <FollowingProducts />}
    </div>
  );
};

export default Home;
