"use client"

import { useState, useEffect } from 'react';

type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  deliveryTime: string;
  rating: number;
  image: string;
};

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
};

type MenuItems = {
  [categoryId: number]: MenuItem[];
};

type CartItem = MenuItem & {
  quantity: number;
};

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Burger Palace',
    cuisine: 'American',
    deliveryTime: '20-30 min',
    rating: 4.5,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh6h-tkjTmMbcDCx8iSNCxuV9D-dBYNKUrtQ&s'
  },
  {
    id: 2,
    name: 'Pizza Heaven',
    cuisine: 'Italian',
    deliveryTime: '25-35 min',
    rating: 4.7,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Dft9P7WYfNAQj0tWH319hfHA6qURgaL7Aw&s'
  },
  {
    id: 3,
    name: 'Sushi World',
    cuisine: 'Japanese',
    deliveryTime: '30-45 min',
    rating: 4.8,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuRnx_YE3mEGV3-0ihn04IAq6kO9I36qwQvw&s'
  },
  {
    id: 4,
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    deliveryTime: '15-25 min',
    rating: 4.3,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9OJDe7hbGSjCaX8p8DICO-AzugqLsc9JzMg&s'
  },
];

const menuItems: MenuItems = {
  1: [
    { id: 101, name: 'Classic Burger', price: 8.99, description: 'Beef patty with lettuce, tomato, and special sauce' },
    { id: 102, name: 'Cheeseburger', price: 9.99, description: 'Classic burger with American cheese' },
    { id: 103, name: 'Bacon Burger', price: 10.99, description: 'Classic burger with crispy bacon' },
    { id: 104, name: 'French Fries', price: 3.99, description: 'Crispy golden fries with sea salt' },
  ],
  2: [
    { id: 201, name: 'Margherita Pizza', price: 12.99, description: 'Tomato sauce, mozzarella, and basil' },
    { id: 202, name: 'Pepperoni Pizza', price: 14.99, description: 'Tomato sauce, mozzarella, and pepperoni' },
    { id: 203, name: 'Veggie Pizza', price: 13.99, description: 'Tomato sauce, mozzarella, and mixed vegetables' },
  ],
  3: [
    { id: 301, name: 'California Roll', price: 7.99, description: 'Crab, avocado, and cucumber' },
    { id: 302, name: 'Spicy Tuna Roll', price: 8.99, description: 'Spicy tuna and scallions' },
    { id: 303, name: 'Dragon Roll', price: 12.99, description: 'Eel, crab, and avocado topped with eel sauce' },
  ],
  4: [
    { id: 401, name: 'Street Tacos', price: 9.99, description: 'Three corn tortillas with your choice of meat' },
    { id: 402, name: 'Quesadilla', price: 8.99, description: 'Flour tortilla with cheese and your choice of filling' },
    { id: 403, name: 'Nachos', price: 10.99, description: 'Tortilla chips with cheese, beans, and toppings' },
  ],
};


const FoodOrderingApp = () => {

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<"restaurants" | "menu" | "cart">('restaurants');

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== itemId);
      }
    });
  };

  const placeOrder = () => {
    alert(`Order placed! Total: $${totalPrice.toFixed(2)}`);
    setCart([]);
    setSelectedRestaurant(null);
    setActiveTab('restaurants');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-500 dark:text-orange-400">FoodExpress</h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search restaurants..."
              className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="relative p-2 text-gray-600 hover:text-orange-500"
              onClick={() => setActiveTab('cart')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-6 px-4 text-gray-900 dark:text-gray-100">
        <div className="flex mb-6">
          <button
            className={`cursor-pointer py-2 px-4 font-medium ${activeTab === 'restaurants' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 dark:text-gray-300'}`}
            onClick={() => setActiveTab('restaurants')}
          >
            Restaurants
          </button>
          {(
            <button
              className={`cursor-pointer py-2 px-4 font-medium ${activeTab === 'menu' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 dark:text-gray-300'}`}
              onClick={() => setActiveTab('menu')}
            >
              Menu
            </button>
          )}
          {(
            <button
              className={`cursor-pointer py-2 px-4 font-medium ${activeTab === 'cart' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 dark:text-gray-300'}`}
              onClick={() => setActiveTab('cart')}
            >
              Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
          )}
        </div>

        {activeTab === 'restaurants' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Nearby Restaurants</h2>
            {filteredRestaurants.length === 0 ? (
              <p className="text-gray-500">No restaurants found matching your search.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRestaurants.map(restaurant => (
                  <div
                    key={restaurant.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => {
                      setSelectedRestaurant(restaurant);
                      setActiveTab('menu');
                    }}
                  >
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-40 object-contain"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold">{restaurant.name}</h3>
                      <p className="text-gray-500 dark:text-gray-300">{restaurant.cuisine}</p>
                      <p className="text-gray-500 dark:text-gray-300">{restaurant.deliveryTime}</p>
                      <p className="text-orange-500 font-bold">{restaurant.rating} ★</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'menu' && selectedRestaurant && (
          <div>
            <h2 className="text-2xl font-bold mb-6">{selectedRestaurant.name} - Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems[selectedRestaurant.id].map(item => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.name}</h3>
                    <p className="text-gray-500 dark:text-gray-300">{item.description}</p>
                    <p className="text-orange-500 dark:text-orange-400 font-bold">${item.price.toFixed(2)}</p>

                    <button
                      className="cursor-pointer mt-2 bg-orange-500 text-white py-1 px-4 rounded-full hover:bg-orange-600"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div>
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.name}</h3>
                      <p className="text-gray-500 dark:text-gray-300">{item.description}</p>
                      <p className="text-orange-500 dark:text-orange-400 font-bold">${item.price.toFixed(2)}</p>

                    </div>
                    <div className="flex space-x-2">
                      <span className='py-1'>x{item.quantity}</span>
                      <button
                        className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full hover:bg-gray-300 cursor-pointer"
                        onClick={() => removeFromCart(item.id)}
                      >
                        -
                      </button>
                      <button
                        className="bg-orange-500 text-white py-1 px-3 rounded-full hover:bg-orange-600 cursor-pointer"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <div className="text-right">
                  <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
                  <button
                    className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 cursor-pointer"
                    onClick={placeOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default FoodOrderingApp;