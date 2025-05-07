"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Eye, MoveLeft } from "lucide-react"
import { Titillium_Web } from "next/font/google"

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  variable: "--font-titillium",
})

interface ClothingItem {
  id: number
  name: string
  category: "top" | "bottom" | "shoe" | "accessory" | "outerwear" | "bag"
  image: string
  color: string
  season: "spring" | "summer" | "fall" | "winter" | "all"
  favorite: boolean
    brand?: string
  size?: string
  material?: string
  description?: string
}

const clothingItems: ClothingItem[] = [
  {
    id: 1,
    name: "Casual White T-Shirt",
    category: "top",
    image:
      "https://c.media-amazon.com/images/I/51L0eEglXfL._AC_UL320_.jpg",
    color: "white",
    season: "summer",
    favorite: false,
       brand: "H&M",
    size: "M",
    material: "Cotton",
    description: "Lightweight casual t-shirt perfect for everyday wear.",
  },
  {
    id: 2,
    name: "Denim Jeans",
    category: "bottom",
    image:
      "https://c.media-amazon.com/images/I/61Mj2D9jriL._AC_UL320_.jpg",
    color: "blue",
    season: "all",
    favorite: false,
      brand: "Levi's",
    size: "32x32",
    material: "Denim",
    description: "Classic straight-fit jeans for everyday wear.",
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "shoe",
    image:
      "https://c.media-amazon.com/images/I/51I5FF+cEmL._AC_UL320_.jpg",
    color: "black",
    season: "all",
    favorite: false,
       brand: "Nike",
    size: "10",
    material: "Synthetic",
    description: "High-performance running shoes with excellent cushioning.",
  },
  {
    id: 4,
    name: "Minimalist Watch",
    category: "accessory",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "silver",
    season: "all",
    favorite: false,
      brand: "Fossil",
    material: "Stainless Steel",
    description: "Sleek minimalist watch for formal or casual occasions.",
  },
  {
    id: 5,
    name: "Wool Sweater",
    category: "top",
    image:
      "https://c.media-amazon.com/images/I/61-uVFHG0pL._AC_UL320_.jpg",
    color: "gray",
    season: "winter",
    favorite: false,
       brand: "Gap",
    size: "L",
    material: "Wool",
    description: "Warm and cozy wool sweater for cold weather.",
  },
  {
    id: 6,
    name: "Leather Jacket",
    category: "outerwear",
    image:
      "https://c.media-amazon.com/images/I/71rqyShS8UL._AC_UL320_.jpg",
    color: "black",
    season: "fall",
    favorite: false,
      brand: "Schott NYC",
    size: "M",
    material: "Leather",
    description: "Classic leather jacket for a timeless cool look.",
  },
  {
    id: 7,
    name: "Canvas Backpack",
    category: "bag",
    image:
      "https://c.media-amazon.com/images/I/51hrRcEYxKL._AC_UL320_.jpg",
    color: "beige",
    season: "all",
    favorite: false,
       brand: "JanSport",
    material: "Canvas",
    description: "Durable canvas backpack for school or travel.",
  },
  {
    id: 8,
    name: "Sunglasses",
    category: "accessory",
    image:
      "https://c.media-amazon.com/images/I/61THflUERtL._AC_UL320_.jpg",
    color: "black",
    season: "summer",
    favorite: false,
      brand: "Ray-Ban",
    material: "Acetate",
    description: "Classic aviator sunglasses with UV protection.",
  },
  {
    id: 9,
    name: "Running Shorts",
    category: "bottom",
    image:
      "https://c.media-amazon.com/images/I/61BhWUZMfCL._AC_UL320_.jpg",
    color: "navy",
    season: "summer",
    favorite: false,
       brand: "Under Armour",
    size: "M",
    material: "Polyester",
    description: "Lightweight and breathable running shorts.",
  },
  {
    id: 10,
    name: "Winter Boots",
    category: "shoe",
    image:
      "https://c.media-amazon.com/images/I/71azYFYF5qS._AC_UL320_.jpg",
    color: "brown",
    season: "winter",
    favorite: false,
      brand: "Sorel",
    size: "9",
    material: "Leather/Rubber",
    description: "Waterproof winter boots with excellent traction.",
  },
  {
    id: 11,
    name: "Floral Dress",
    category: "top",
    image:
      "https://c.media-amazon.com/images/I/61CP8oqDL-L._AC_UL320_.jpg",
    color: "multicolor",
    season: "spring",
    favorite: false,
       brand: "Zara",
    size: "S",
    material: "Rayon",
    description: "Beautiful floral dress perfect for spring occasions.",
  },
  {
    id: 12,
    name: "Tote Bag",
    category: "bag",
    image:
      "https://c.media-amazon.com/images/I/61OJ-bkugaL._AC_UL320_.jpg",
    color: "tan",
    season: "all",
    favorite: false,
      brand: "Longchamp",
    material: "Leather",
    description: "Spacious tote bag for work or everyday use.",
  },
]

interface WardrobeProps {
  items: ClothingItem[]
}

const Wardrobe: React.FC<WardrobeProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null)
  const [likedItems, setLikedItems] = useState<number[]>([])
  const [views, setViews] = useState<Record<number, number>>({})

  const handleLike = (itemId: number) => {
    const newLikedItems = likedItems.includes(itemId)
      ? likedItems.filter((id) => id !== itemId)
      : [...likedItems, itemId]
    setLikedItems(newLikedItems)
  }

  const handleViewItem = (item: ClothingItem) => {
    setSelectedItem(item)
    setViews((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }))
  }

  const handleCloseDetails = () => {
    setSelectedItem(null)
  }

  const getColorClass = (color: string) => {
    const map = {
      white: "bg-white shadow-sm",
      black: "bg-black",
      blue: "bg-blue-500",
      gray: "bg-gray-400",
      green: "bg-green-500",
      red: "bg-red-500",
      yellow: "bg-yellow-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
      pink: "bg-pink-500",
      brown: "bg-orange-800",
      beige: "bg-orange-300",
      multicolor: "bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500",
    };
    return map[color as keyof typeof map] || "bg-gray-200";
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 ${titillium.variable} font-sans text-gray-900 dark:text-gray-100`}
    >
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseDetails}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-full p-2 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm"
              >
                <MoveLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              </button>
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/2 h-96 overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                  {likedItems.includes(selectedItem.id) && (
                    <span className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800 backdrop-blur-sm text-rose-500 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                      FAV
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-between flex-1 p-6">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {selectedItem.category}
                    </span>
                    <h2 className="text-3xl font-bold mt-3 mb-4">{selectedItem.name}</h2>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <div className="flex items-center bg-slate-50 dark:bg-gray-800 rounded-full px-3 py-1.5">
                        <span className={`w-3 h-3 rounded-full mr-2 ${getColorClass(selectedItem.color)}`} />
                        <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-200">
                          {selectedItem.color}
                        </span>
                      </div>
                      <div className="flex items-center bg-slate-50 dark:bg-gray-800 rounded-full px-3 py-1.5">
                        <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-200">
                          {selectedItem.season}
                        </span>
                      </div>
                      {selectedItem.brand && (
                        <div className="flex items-center bg-slate-50 dark:bg-gray-800 rounded-full px-3 py-1.5">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {selectedItem.brand}
                          </span>
                        </div>
                      )}
                      {selectedItem.size && (
                        <div className="flex items-center bg-slate-50 dark:bg-gray-800 rounded-full px-3 py-1.5">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Size: {selectedItem.size}
                          </span>
                        </div>
                      )}
                      {selectedItem.material && (
                        <div className="flex items-center bg-slate-50 dark:bg-gray-800 rounded-full px-3 py-1.5">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {selectedItem.material}
                          </span>
                        </div>
                      )}
                    </div>
                    {selectedItem.description && (
                      <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedItem.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleLike(selectedItem.id)}
                      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 shadow-sm ${likedItems.includes(selectedItem.id)
                        ? "bg-rose-500 text-white"
                        : "bg-slate-100 text-gray-700 hover:bg-slate-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        }`}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${likedItems.includes(selectedItem.id) ? "fill-current" : ""}`} />
                      <span className="text-sm font-medium">
                        {likedItems.includes(selectedItem.id) ? "Favorited" : "Like"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              My Wardrobe
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage your clothing collection</p>
          </div>
        </header>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent dark:from-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                  <button
                    onClick={() => handleLike(item.id)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full shadow-md transition-all duration-200 ${likedItems.includes(item.id)
                      ? "bg-rose-500 text-white"
                      : "bg-white/80 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-gray-700"
                      }`}
                  >
                    <Heart className={`w-4 h-4 ${likedItems.includes(item.id) ? "fill-current" : ""}`} />
                  </button>
                </div>
  
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent dark:from-black/70 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg">{item.name}</h3>
                  </div>
                  <div className="flex items-center mt-1 text-white/90 text-sm">
                    <span className={`w-2 h-2 rounded-full mr-1.5 ${getColorClass(item.color)}`} />
                    <span className="capitalize">{item.color}</span>
                    <span className="mx-1">•</span>
                    <span className="capitalize">{item.season}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl rounded-t-none border-t-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {item.category}
                  </span>
                  <div className="flex items-center">
                    {views[item.id] > 0 && (
                      <span className="inline-flex items-center mr-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                        <Eye className="w-3 h-3 mr-1" />
                        {views[item.id]}
                      </span>
                    )}
                    <button
                      onClick={() => handleViewItem(item)}
                      className="text-xs font-medium text-gray-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Wardrobe items={clothingItems} />
    </main>
  )
}
