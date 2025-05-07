"use client"

import { useState } from "react"
import { Star, ArrowLeft, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

interface Comment {
  id: number
  author: string
  text: string
  rating: number
}

interface Headset {
  id: number
  brand: string
  price: number
  performance: number
  image: string
  comments: Comment[]
}

const startHeadsets: Headset[] = [
  {
    id: 1,
    brand: "HyperX Cloud II",
    price: 99.99,
    performance: 4.8,
    image: "https://c.media-amazon.com/images/I/518DajvvIVL._AC_UL320_.jpg",
    comments: [
      { id: 1, author: "Alex", text: "Great sound quality and comfortable", rating: 5 },
      { id: 2, author: "Jordan", text: "Good value for money", rating: 4 },
    ],
  },
  {
    id: 2,
    brand: "SteelSeries Arctis 7",
    price: 149.99,
    performance: 4.5,
    image: "https://c.media-amazon.com/images/I/71KVelY6CxL._AC_UL320_.jpg",
    comments: [
      { id: 1, author: "Taylor", text: "Excellent wireless connectivity", rating: 5 },
      { id: 2, author: "Casey", text: "Stylish design but pricey", rating: 4 },
    ],
  },
  {
    id: 3,
    brand: "Razer Kraken X",
    price: 79.99,
    performance: 4.3,
    image: "https://c.media-amazon.com/images/I/61X7CMOjcNL._AC_UL320_.jpg",
    comments: [
      { id: 1, author: "Jamie", text: "Good for the price", rating: 4 },
      { id: 2, author: "Drew", text: "Could be more comfortable", rating: 3 },
    ],
  },
  {
    id: 4,
    brand: "Logitech G Pro X",
    price: 69.99,
    performance: 4.0,
    image: "https://c.media-amazon.com/images/I/51wwGHhv+lL._AC_UL320_.jpg",
    comments: [
      { id: 1, author: "Sam", text: "Decent quality but not impressive", rating: 3 },
      { id: 2, author: "Taylor", text: "Good for casual gaming", rating: 4 },
    ],
  },
  {
    id: 5,
    brand: "Corsair HS70 Wireless",
    price: 109.99,
    performance: 4.6,
    image: "https://c.media-amazon.com/images/I/81kGY1KvdWL._AC_UL320_.jpg",
    comments: [
      { id: 1, author: "Jordan", text: "Great wireless performance", rating: 5 },
      { id: 2, author: "Casey", text: "Good build quality", rating: 4 },
    ],
  },
]

const calculateCostPerformance = (price: number, performance: number): number => {
  const normalizedPerformance = performance / 5
  const costEffectiveness = normalizedPerformance / price
  return parseFloat((costEffectiveness * 100).toFixed(2))
}

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: i * 0.05,
            type: "spring",
            stiffness: 300,
          }}
        >
          <Star
            className={`w-5 h-5 ${i < fullStars
                ? "fill-emerald-500 text-emerald-500"
                : i === fullStars && hasHalfStar
                  ? "fill-emerald-500 text-emerald-500 fill-opacity-50"
                  : "text-gray-300"
              }`}
          />
        </motion.div>
      ))}
      <motion.span
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {rating.toFixed(1)}
      </motion.span>
    </div>
  )
}

const CommentCard = ({ comment }: { comment: Comment; }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.3 }}
      layout
      className="group relative bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium shadow-inner mr-3">
            {comment.author[0].toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{comment.author}</h3>
            <div className="flex items-center mt-1">
              <RatingStars rating={comment.rating} />
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-2 italic">{comment.text}</p>
    </motion.div>
  )
}

const HeadsetCard = ({ headset, detailed = false }: { headset: Headset; detailed?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false)

  const costPerformance = calculateCostPerformance(headset.price, headset.performance)

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-72 overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.5, ease: "easeOut" } }}
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${headset.image})`,
            opacity: 1,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          >
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-2xl font-bold text-white mb-2"
              >
                {headset.brand}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex items-center justify-between"
              >
                <div>
                  <span className="text-white/90">Price:</span>{" "}
                  <span className="text-white font-bold">${headset.price.toFixed(2)}</span>
                </div>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="bg-emerald-500 px-3 py-1 rounded-full text-white font-medium"
                >
                  {costPerformance}/100
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Performance:</span>
            <RatingStars rating={headset.performance} />
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Value:</span>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center ml-2"
            >
              <Star className={`w-4 h-4 ${costPerformance >= 80
                  ? "fill-emerald-500 text-emerald-500"
                  : costPerformance >= 60
                    ? "fill-teal-500 text-teal-500"
                    : costPerformance >= 40
                      ? "fill-yellow-500 text-yellow-500"
                      : costPerformance >= 20
                        ? "fill-orange-500 text-orange-500"
                        : "fill-red-500 text-red-500"
                }`} />
              <span className="ml-1 font-medium text-gray-700 dark:text-gray-300">
                {costPerformance}
              </span>
            </motion.div>
          </div>
        </div>

        {detailed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">User Reviews</h4>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              <AnimatePresence>
                {headset.comments.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-6 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    No reviews yet
                  </motion.div>
                ) : (
                  headset.comments.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>

  )
}

const HeadsetReviewSite = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedHeadset, setSelectedHeadset] = useState<Headset | null>(null)
  const [commentText, setCommentText] = useState("")
  const [commentRating, setCommentRating] = useState(5)
  const [authorName, setAuthorName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [selectedHeadsetId, setSelectedHeadsetId] = useState<number | null>(null)
  const [headsets, setHeadsets] = useState<Headset[]>(startHeadsets);

  const handleHeadsetClick = (headset: Headset) => {
    setSelectedHeadset(headset)
    setSelectedHeadsetId(headset.id)
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now(),
        author: authorName.trim() || "Anonymous",
        text: commentText.trim(),
        rating: commentRating,
      };

      setSelectedHeadset((prev) => {
        if (!prev) return null;

        const updatedComments = [...prev.comments, newComment];

        const updatedHeadsets = headsets.map((headset) =>
          headset.id === prev.id ? { ...headset, comments: updatedComments } : headset
        );

        setHeadsets(updatedHeadsets);

        return { ...prev, comments: updatedComments };
      });

      setCommentText("");
      setCommentRating(5);
      setAuthorName("");
      setIsSubmitting(false);
      setIsCommentModalOpen(false);
    }, 500);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${isDarkMode
          ? "from-gray-900 via-gray-800 to-gray-900"
          : "from-emerald-50 via-teal-50 to-emerald-50"
        } transition-colors duration-300`}
    >
      <AnimatePresence>
        {selectedHeadset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            onClick={() => setSelectedHeadset(null)}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 w-full ${isDarkMode ? "bg-gray-900/90 backdrop-blur-md" : "bg-white/90 backdrop-blur-md"
          } shadow-lg transition-all duration-300 ${scrollY > 50 ? "shadow-lg" : "shadow-sm"
          }`}
      >
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? "bg-emerald-600" : "bg-emerald-500"
                  }`}>
                  <Star className="w-6 h-6 text-white fill-current" />
                </div>
                <h1 className={`text-xl font-bold text-gray-900 ${isDarkMode ? "text-white" : "text-black"} transition-colors duration-300`}>
                  Headset Reviews
                </h1>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-emerald-100 hover:bg-emerald-200 text-emerald-600"
                  } transition-colors duration-300`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-[30vh] rounded-2xl overflow-hidden shadow-xl"
          >
            <AnimatePresence mode="wait">
              {isHeroLoaded && (
                <motion.div
                  key="hero-image"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1509391366360-6a3c4068a1b4?w=1920&h=1080&fit=crop)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1509391366360-6a3c4068a1b4?w=1920&h=1080&fit=crop"
                    alt="Hero background"
                    className="opacity-0 w-full h-full"
                    onLoad={() => setIsHeroLoaded(true)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-3xl md:text-5xl font-bold text-center mb-4 drop-shadow-lg"
              >
                Premium Headsets
                <br />
                <span className="text-emerald-300">Exceptional Quality</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-lg md:text-xl text-center max-w-2xl mb-8 text-gray-200 drop-shadow-md"
              >
                Discover our curated selection of top-tier headsets, meticulously chosen for
                unparalleled sound quality and comfort
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex space-x-4"
              >
                <button
                  onClick={() => window.scrollBy({ top: window.innerHeight / 2, behavior: "smooth" })}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Explore Collection
                </button>
              </motion.div>
            </div>


          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold text-gray-900 ${isDarkMode ? "text-white" : "text-black"} transition-colors duration-300`}>
              Featured Headsets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {headsets.slice(0, 3).map((headset) => (
              <motion.div
                key={headset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              ><div onClick={() => handleHeadsetClick(headset)} className="cursor-pointer">
                  <HeadsetCard headset={headset} /></div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Top Rated Headsets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {headsets
              .sort((a, b) => b.performance - a.performance)
              .slice(0, 3)
              .map((headset) => (
                <motion.div
                  key={headset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div onClick={() => handleHeadsetClick(headset)} className="cursor-pointer"><HeadsetCard headset={headset} /></div>
                </motion.div>
              ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Best Value Headsets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {headsets
              .sort((a, b) => calculateCostPerformance(b.price, b.performance) - calculateCostPerformance(a.price, a.performance))
              .slice(0, 3)
              .map((headset) => (
                <motion.div
                  key={headset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div onClick={() => handleHeadsetClick(headset)} className="cursor-pointer"><HeadsetCard headset={headset} /></div>
                </motion.div>
              ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              All Headsets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {headsets.map((headset) => (
              <motion.div
                key={headset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div onClick={() => handleHeadsetClick(headset)} className="cursor-pointer"><HeadsetCard headset={headset} detailed={true} /></div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <AnimatePresence>
        {selectedHeadset && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`max-w-4xl mx-auto h-full rounded-2xl shadow-2xl overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-white"
                } transition-colors duration-300`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="relative h-64 md:h-full md:w-1/2">
                  <img
                    src={selectedHeadset.image}
                    alt={selectedHeadset.brand}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedHeadset(null)}
                      className="text-white/90 hover:text-white transition-colors duration-300"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </motion.button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{selectedHeadset.brand}</h3>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < Math.floor(selectedHeadset.performance)
                                  ? "fill-emerald-500 text-emerald-500"
                                  : "text-gray-300"
                                }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-lg text-white/90">
                          {selectedHeadset.performance.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-emerald-500 px-3 py-1 rounded-full text-white font-medium">
                      ${selectedHeadset.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between flex-1 p-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      User Reviews
                    </h4>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Write a Review
                    </h4>
                    <form onSubmit={handleAddComment} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your name (optional)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Rating
                        </label>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() => setCommentRating(star)}
                              className={`p-1 rounded-full transition-all duration-300 ${commentRating >= star
                                  ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30"
                                  : "text-gray-300 dark:text-gray-600"
                                }`}
                            >
                              <Star
                                className={`w-6 h-6 ${commentRating >= star
                                    ? "fill-emerald-500 text-emerald-500"
                                    : "text-gray-300 dark:text-gray-600"
                                  }`}
                              />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Your Review
                        </label>
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                          rows={4}
                          placeholder="Share your experience with this headset"
                          required
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Posting..." : "Post Review"}
                      </motion.button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeadsetReviewSite

