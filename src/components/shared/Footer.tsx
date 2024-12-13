import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const importantLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Recent Products", href: "/recent-products" },
    { name: "Comparison", href: "/comparison" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Section 1: Site Name & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Electro Hub</h2>
          <p className="text-gray-400">
            Discover the ultimate destination for amazing products and services.
            We bring quality to your doorstep with a touch of excellence.
          </p>
        </div>

        {/* Section 2: Follow */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-500">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-sky-400">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Section 3: Important Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Important Links</h3>
          <ul>
            {importantLinks.map((link, index) => (
              <li key={index} className="mb-2">
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-gray-200 transition"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Subscribe */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Subscribe</h3>
          <p className="text-gray-400 mb-3">
            Subscribe to our newsletter to get updates on our latest offers and
            news.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full rounded-l-md bg-gray-800 text-white outline-none"
            />
            <button className="bg-primary px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Electro Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
