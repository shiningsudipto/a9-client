import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import CategorySection from "./components/CategorySection";
import FlashSale from "./components/FlashSale";
import { IoIosArrowUp } from "react-icons/io";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      <FlashSale />
      <CategorySection />
    </div>
  );
};

export default Home;
