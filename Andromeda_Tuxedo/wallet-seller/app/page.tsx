"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Filter, ShoppingBag, X } from 'lucide-react';

interface Wallet {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  isPopular: boolean;
  image: string;
  brand: string;
  material: string;
  description: string;
  selectedColor: string;
}

interface CartItem {
  wallet: Wallet;
  color: string;
  size: string;
  quantity: number;
}

interface Favorite {
  wallet: Wallet;
  color: string;
  size: string;
}

const wallets: Wallet[] = [
  {
    id: 1,
    name: 'Classic Leather Wallet',
    price: 59.99,
    originalPrice: 79.99,
    colors: ['Black', 'Red', 'Tan'],
    sizes: ['Regular', 'Large'],
    rating: 4.5,
    reviews: 12,
    isPopular: true,
    image: 'https://c.media-amazon.com/images/I/71lYcx3Qa3L._AC_UL320_.jpg',
    brand: 'Luxury Leathers',
    material: 'Genuine Leather',
    description: 'A timeless leather wallet designed to age beautifully. Features multiple card slots and a cash compartment.',
    selectedColor: 'Black',
  },
  {
    id: 2,
    name: 'Modern Slim Wallet',
    price: 39.99,
    colors: ['Black', 'Gray', 'Blue'],
    sizes: ['Regular', 'Slim'],
    rating: 4.0,
    reviews: 8,
    isPopular: false,
    image: 'https://c.media-amazon.com/images/I/61BTXVwzbEL._AC_UL320_.jpg',
    brand: 'Modern Wallet Co.',
    material: 'Synthetic Leather',
    description: 'A sleek and minimalist wallet perfect for carrying the essentials. RFID blocking technology included.',
    selectedColor: 'Black',
  },
  {
    id: 3,
    name: 'Travel Wallet',
    price: 79.99,
    originalPrice: 99.99,
    colors: ['Red', 'Black'],
    sizes: ['Regular', 'Large'],
    rating: 5.0,
    reviews: 5,
    isPopular: true,
    image: 'https://c.media-amazon.com/images/I/81twK7zD5oL._AC_UL320_.jpg',
    brand: 'TravelPro',
    material: 'Durable Nylon',
    description: 'A premium travel wallet with enhanced security features. Includes passport holder and travel card slots.',
    selectedColor: 'Red',
  },
  {
    id: 4,
    name: 'Designer Wallet',
    price: 99.99,
    originalPrice: 149.99,
    colors: ['Black', 'Red'],
    sizes: ['Regular'],
    rating: 4.0,
    reviews: 3,
    isPopular: true,
    image: 'https://c.media-amazon.com/images/I/51p7XidyCnL._AC_UL320_.jpg',
    brand: 'Designer Luxe',
    material: 'Exotic Leather',
    description: 'A luxurious wallet with premium materials and exquisite craftsmanship. Signature logo detail.',
    selectedColor: 'Black',
  },
];

const colorOptions: string[] = ['Black', 'Red', 'Tan', 'Gray', 'Blue'];
const sizeOptions: string[] = ['Slim', 'Regular', 'Large'];
const priceRanges: string[] = ['Under $50', '$50-$100', 'Over $100'];
const ratingOptions: string[] = ['5+ stars', '4+ stars', '3+ stars'];

const App: React.FC = () => {
  const [filteredWallets, setFilteredWallets] = useState<Wallet[]>(wallets);
  const [selectedFilters, setSelectedFilters] = useState({
    colors: [] as string[],
    sizes: [] as string[],
    priceRange: '' as string,
    rating: '' as string,
    sortBy: '' as string,
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isFavoriteModalOpen, setIsFavoriteModalOpen] = useState<boolean>(false);
  const [favoriteWallet, setFavoriteWallet] = useState<Wallet | null>(null);
  const [favoriteColor, setFavoriteColor] = useState<string>('');
  const [favoriteSize, setFavoriteSize] = useState<string>('');
  const [, setRefresh] = useState(0);

  const total = useMemo<number>(() => {
    return cart.reduce((acc, item) => acc + item.wallet.price * item.quantity, 0);
  }, [cart]);

  const handleFilterChange = (category: keyof typeof selectedFilters, value: string): void => {
    if (category === 'colors' || category === 'sizes') {
      const isSelected = selectedFilters[category].includes(value);
      const updatedValues = isSelected
        ? selectedFilters[category].filter((item) => item !== value)
        : [...selectedFilters[category], value];

      setSelectedFilters({
        ...selectedFilters,
        [category]: updatedValues,
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        [category]: selectedFilters[category] === value ? '' : value,
      });
    }
  };

  const applyFilters = (): void => {
    let filtered = [...wallets];

    if (selectedFilters.colors.length > 0) {
      filtered = filtered.filter((wallet) =>
        wallet.colors.some((color) => selectedFilters.colors.includes(color)),
      );
    }

    if (selectedFilters.sizes.length > 0) {
      filtered = filtered.filter((wallet) =>
        wallet.sizes.some((size) => selectedFilters.sizes.includes(size)),
      );
    }

    if (selectedFilters.priceRange) {
      switch (selectedFilters.priceRange) {
        case 'Under $50':
          filtered = filtered.filter((wallet) => wallet.price < 50);
          break;
        case '$50-$100':
          filtered = filtered.filter((wallet) => wallet.price >= 50 && wallet.price <= 100);
          break;
        case 'Over $100':
          filtered = filtered.filter((wallet) => wallet.price > 100);
          break;
      }
    }

    if (selectedFilters.rating) {
      const ratingValue = parseFloat(selectedFilters.rating);
      filtered = filtered.filter((wallet) => wallet.rating >= ratingValue);
    }

    if (selectedFilters.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedFilters.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (selectedFilters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredWallets(filtered);
  };

  const handleAddToCart = (wallet: Wallet, color: string, size: string, quantity: number): void => {
    const existingItemIndex = cart.findIndex(
      (item) => item.wallet.id === wallet.id && item.color === color && item.size === size,
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { wallet, color, size, quantity }]);
    }

    setIsCartOpen(true);
  };

  const updateCartQuantity = (index: number, newQuantity: number): void => {
    if (newQuantity < 1) return;

    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  const removeFromCart = (index: number): void => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleCheckout = (): void => {
    console.log('Checkout:', cart);
    setCart([]);
    setIsCartOpen(false);
  };

  const handleAddFavoriteToCart = (): void => {
    if (favoriteWallet && favoriteColor && favoriteSize) {
      handleAddToCart(favoriteWallet, favoriteColor, favoriteSize, 1);
      setIsFavoriteModalOpen(false);
    }
  };

  const handleViewProductDetails = (wallet: Wallet): void => {
    setSelectedWallet(wallet);
    setSelectedColor(wallet.colors[0]);
    setSelectedSize(wallet.sizes[0]);
  };

  const handleAddToCartFromDetails = (): void => {
    if (selectedWallet && selectedColor && selectedSize) {
      handleAddToCart(selectedWallet, selectedColor, selectedSize, quantity);
      setQuantity(1);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [selectedFilters]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsCartOpen(false);
        setIsFavoriteModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-extralight tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
              MINIMALISTA
            </h1>

            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-3 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 dark:bg-indigo-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                    {cart.length}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-light text-gray-900 dark:text-gray-100">Wallets</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{filteredWallets.length} products</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <motion.div
              className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <Filter className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-gray-300">Filters: </span>

            </motion.div>

            <div className={"flex flex-col md:flex-row gap-4 transition-all duration-300 overflow-hidden 'max-h-0 md:max-h-full opacity-100 md:opacity-100"}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFilterChange('colors', color)}
                      className={`
                        px-3 py-1 rounded-full text-sm transition-all duration-200 shadow-sm
                        ${selectedFilters.colors.includes(color)
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:shadow-md'}
                      `}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Size</label>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFilterChange('sizes', size)}
                      className={`
                        px-3 py-1 rounded-full text-sm transition-all duration-200 shadow-sm
                        ${selectedFilters.sizes.includes(size)
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:shadow-md'}
                      `}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Price Range</label>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <motion.button
                      key={range}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFilterChange('priceRange', range)}
                      className={`
                        px-3 py-1 rounded-full text-sm transition-all duration-200 shadow-sm
                        ${selectedFilters.priceRange === range
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:shadow-md'}
                      `}
                    >
                      {range}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
                <div className="flex flex-wrap gap-2">
                  {ratingOptions.map((rating) => (
                    <motion.button
                      key={rating}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFilterChange('rating', rating)}
                      className={`
                        px-3 py-1 rounded-full text-sm transition-all duration-200 shadow-sm
                        ${selectedFilters.rating === rating
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:shadow-md'}
                      `}
                    >
                      {rating}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort By</label>
                <div className="flex flex-wrap gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFilterChange('sortBy', 'price-asc')}
                    className={`
                      px-3 py-1 rounded-full text-sm transition-all duration-200 shadow-sm
                      ${selectedFilters.sortBy === 'price-asc'
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:shadow-md'}
                    `}
                  >
                    Price: Low to High
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFilterChange('sortBy', 'price-desc')}
                    className={`
                      px-3 py-1 rounded-full text-sm transition-all duration-200 shadow-sm
                      ${selectedFilters.sortBy === 'price-desc'
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:shadow-md'}
                    `}
                  >
                    Price: High to Low
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFilterChange('sortBy', 'rating')}
                    className={`
                      px-3 py-1 rounded-full text-sm transition-all duration-200 shadow-sm
                      ${selectedFilters.sortBy === 'rating'
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:shadow-md'}
                    `}
                  >
                    Rating
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWallets.map((wallet) => (
            <motion.div
              key={wallet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-72 overflow-hidden">
                {wallet.originalPrice && (
                  <span className="absolute top-4 left-4 bg-indigo-600/90 dark:bg-indigo-500/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md z-10">
                    SALE
                  </span>
                )}
                <img
                  src={wallet.image}
                  alt={wallet.name}
                  className="w-full h-full object-contain transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewProductDetails(wallet)}
                    className="flex-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-normal text-gray-900 dark:text-gray-100">{wallet.name}</h3>
                  <div className="flex items-center bg-white/80 dark:bg-gray-800/80 rounded-lg px-2 py-1 shadow-sm">
                    <Star className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-1" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{wallet.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{wallet.brand}</p>

                <div className="flex gap-2 mb-4">
                  {wallet.colors.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => { wallet.selectedColor = color; setRefresh((r) => r + 1); }}
                      className={`w-6 h-6 rounded-full shadow-sm cursor-pointer transition-all duration-200 ring-2 ${wallet.selectedColor === color ? 'ring-blue-500 ring-offset-2' : 'ring-transparent'
                        }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}

                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xl font-light text-gray-900 dark:text-gray-100">${wallet.price}</span>
                    {wallet.originalPrice && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                        ${wallet.originalPrice}
                      </span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(wallet, wallet.selectedColor, wallet.sizes[0], 1)}
                    className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Bag</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-screen w-full sm:w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 shadow-2xl border-l border-gray-200 dark:border-gray-800"
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-xl font-light text-gray-900 dark:text-gray-100">Shopping Bag</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
                >
                  <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center gap-4 text-gray-500 dark:text-gray-400">
                    <ShoppingBag className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                    <p>Your bag is empty</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cart.map((item, index) => (
                      <li
                        key={`${item.wallet.id}-${item.color}-${item.size}`}
                        className="flex gap-4 bg-white/80 dark:bg-gray-800/80 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                          <img
                            src={item.wallet.image}
                            alt={item.wallet.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-base font-normal text-gray-900 dark:text-gray-100">
                            {item.wallet.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Color: {item.color} | Size: {item.size}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white/80 dark:bg-gray-800/80">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateCartQuantity(index, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                              >
                                <span className="text-lg">-</span>
                              </motion.button>
                              <span className="w-8 text-center text-gray-800 dark:text-gray-200">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateCartQuantity(index, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                              >
                                <span className="text-lg">+</span>
                              </motion.button>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-gray-100 ml-auto">
                              ${(item.wallet.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeFromCart(index)}
                          className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </motion.button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-800/80">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-base font-light text-gray-900 dark:text-gray-100">Total</span>
                    <span className="text-xl font-light text-gray-900 dark:text-gray-100">${total.toFixed(2)}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Checkout</span>
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFavoriteModalOpen && favoriteWallet && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-200 dark:border-gray-800"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-light text-gray-900 dark:text-gray-100">Select Options</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFavoriteModalOpen(false)}
                  className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
                >
                  <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {favoriteWallet.colors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFavoriteColor(color)}
                        className={`
                          px-3 py-1 rounded-full text-sm transition-all duration-200 shadow-sm
                          ${favoriteColor === color
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:shadow-md'}
                        `}
                      >
                        {color}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {favoriteWallet.sizes.map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFavoriteSize(size)}
                        className={`
                          px-3 py-1 rounded-full text-sm transition-all duration-200 shadow-sm
                          ${favoriteSize === size
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:shadow-md'}
                        `}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddFavoriteToCart}
                    className="flex-1 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                    disabled={!favoriteColor || !favoriteSize}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Bag</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsFavoriteModalOpen(false)}
                    className="flex-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedWallet && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl p-6 w-full max-w-2xl shadow-xl border border-gray-200 dark:border-gray-800"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-light text-gray-900 dark:text-gray-100">Product Details</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedWallet(null)}
                  className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
                >
                  <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={selectedWallet.image}
                    alt={selectedWallet.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-normal text-gray-900 dark:text-gray-100 mb-2">
                    {selectedWallet.name}
                  </h3>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center bg-white/80 dark:bg-gray-800/80 rounded-lg px-2 py-1 shadow-sm">
                      <Star className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-1" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {selectedWallet.rating}
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      {selectedWallet.reviews} reviews
                    </span>
                  </div>

                  <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    {selectedWallet.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Color
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedWallet.colors.map((color) => (
                          <motion.button
                            key={color}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedColor(color)}
                            className={`
                              px-3 py-1 rounded-full text-sm transition-all duration-200 shadow-sm
                              ${selectedColor === color
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:shadow-md'}
                            `}
                          >
                            {color}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Size
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedWallet.sizes.map((size) => (
                          <motion.button
                            key={size}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedSize(size)}
                            className={`
                              px-3 py-1 rounded-full text-sm transition-all duration-200 shadow-sm
                              ${selectedSize === size
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:shadow-md'}
                            `}
                          >
                            {size}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white/80 dark:bg-gray-800/80">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-lg">-</span>
                      </motion.button>
                      <span className="w-8 text-center text-gray-800 dark:text-gray-200">{quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-lg">+</span>
                      </motion.button>
                    </div>

                    <span className="text-xl font-light text-gray-900 dark:text-gray-100">
                      ${(selectedWallet.price * quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCartFromDetails}
                      className="flex-1 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Bag</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedWallet(null)}
                      className="flex-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;