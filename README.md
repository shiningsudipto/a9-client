# E-Commerce Frontend - Fitness Tools

## Live URL

### [Visit the live site](https://electro-hub-bd.netlify.app)

### Admin

```
email: electrohub@info.com
pass: 123456
```

### Vendor

```
email: vendor2@gmail.com
pass: 123456
```

## Coupon

```
1/ BLACKFRIDAY5
2/ BLACKFRIDAY10
```

## Project Overview

This is a frontend application for an e-commerce platform specializing in Electric accessories. Built using React, Redux Toolkit, and TypeScript, this platform offers a seamless shopping experience for users, including easy navigation, product management, and secure checkout options.

## Key Features

### 1. **Product Display & Categories**

- **Product List**: Display a comprehensive list of fitness tools and accessories with pagination and filtering options.
- **Product Details**: Each product has a detailed page showcasing the description, price, and related images.
- **Product Search**: Users can search for products by name, category, or other attributes.

### 2. **User Authentication**

- **Login & Signup**: Users can register, log in, and access their accounts securely.
- **Forgot Password**: A simple process to reset forgotten passwords.
- **Change Password**: A simple process to change forgotten passwords.
- **JWT Authentication**: Using JSON Web Tokens for secure and stateless authentication.

### 3. **Shopping Cart & Checkout**

- **Add to Cart**: Users can add products to their cart, adjust quantities, and remove items.
- **Cart Overview**: Display total price, quantity, and a breakdown of the user's cart.
- **Checkout**: Users can enter payment details and proceed to checkout.
- **Order Summary**: After placing an order, users receive an order summary with details and a unique order ID.

### 4. **User Profile Management**

- **View Profile**: Users can view their account details and order history.
- **Edit Profile**: Users can update their personal information like name, email, and password.

### 5. **Admin Dashboard**

- **Order Management**: Admins can view all orders, change order statuses, and manage customer data.
- **User Management**: Admins can view and manage customer accounts and permissions.

### 6. **Vendor Dashboard**

- **Product Management**: Vendor can manage products (add, update, delete) and track inventory.
- **Order Management**: Vendor can view all orders, change order statuses, and manage customer data.
- **Review Management**: Vendor can review and manage customer accounts and permissions.

### 7. **Responsive Design**

- **Mobile-First Approach**: The site is fully responsive and optimized for all screen sizes.
- **User-Friendly Interface**: The design is simple, clean, and intuitive for all types of users.

### 8. **Search & Filter**

- **Product Search**: A search bar to filter products by name, category, or description.
- **Advanced Filters**: Filters for price, category, and stock availability to refine product searches.

### 9. **Pagination & Infinite Scroll**

- **Product Pagination**: Products are displayed in paginated format to improve performance.
- **Infinite Scroll**: The product list can be scrolled indefinitely, dynamically loading new items as the user scrolls.

### 10. **Customer Reviews & Ratings**

- **Product Reviews**: Customers can leave reviews and ratings on products.
- **Average Rating**: Each product displays an average rating based on customer feedback.

### 11. **Toast Notifications**

- **Real-time Alerts**: Uses the `Sonner` library for handling toast notifications, informing users about successful actions, errors, and warnings.

## Technologies Used

- **React**: For building the user interface and managing component states.
- **Redux Toolkit**: For state management, allowing easy handling of product data, user info, and cart state.
- **TypeScript**: Provides type safety and helps manage complex data structures.
- **Tailwind CSS**: For responsive and custom styling with utility-first design principles.
- **React Router**: To handle dynamic routing and navigation between different pages.
- **Formik & React-Quill**: For handling forms, including registration, login, and checkout,
