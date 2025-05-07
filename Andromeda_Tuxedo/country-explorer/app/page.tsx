
"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion"
import {
  Sun, Moon, Star, Shield, Heart, MessageSquare, Plus, X, Globe, Info,
  ArrowUp, ArrowDown, Search, Filter, RefreshCw
} from "lucide-react"

interface Country {
  id: number
  name: string
  easeOfLiving: number
  safety: number
  welfare: number
  comments: string[]
  image: string
  region?: string
}

type Theme = "light" | "dark"
type SortOption = "name" | "easeOfLiving" | "safety" | "welfare"

const unsplashCountryImages = [
  "https://images.unsplash.com/photo-1543832923-44667a44c804?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529061503549-c4442996e7c3?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?q=80&w=1000&auto=format&fit=crop",
]

function ThemeToggle({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  const variants = {
    light: { rotate: 0 },
    dark: { rotate: 180 }
  }

  return (
    <motion.button
      initial={false}
      animate={theme}
      variants={variants}
      transition={{ duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`fixed top-6 right-6 p-4 rounded-full shadow-xl z-50 backdrop-blur-md
        ${theme === "light"
          ? "bg-gradient-to-tr from-amber-300 to-orange-400 text-white"
          : "bg-gradient-to-br from-indigo-900 to-purple-900 text-white"}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ?
        <Sun className="drop-shadow-md" size={24} /> :
        <Moon className="drop-shadow-md" size={24} />
      }
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          boxShadow: theme === "light"
            ? "0 0 15px 3px rgba(251, 191, 36, 0.7)"
            : "0 0 15px 3px rgba(139, 92, 246, 0.7)"
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  )
}

function RatingStars({
  value,
  onChange,
  max = 5,
  readOnly = false,
  size = "md",
}: {
  value: number
  onChange?: (value: number) => void
  max?: number
  readOnly?: boolean
  size?: "sm" | "md" | "lg"
}) {
  const sizes = {
    sm: { star: 14, container: "w-5 h-5" },
    md: { star: 18, container: "w-6 h-6" },
    lg: { star: 22, container: "w-7 h-7" }
  }

  const starSize = sizes[size].star
  const containerClass = sizes[size].container

  return (
    <div className="flex gap-1" aria-label={`Rating: ${value} out of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <motion.button
          key={i}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange && onChange(i + 1)}
          whileHover={!readOnly ? { scale: 1.2 } : {}}
          whileTap={!readOnly ? { scale: 0.9 } : {}}
          className={`${containerClass} flex items-center justify-center rounded-full transition-all
            ${!readOnly && "cursor-pointer"}`}
          aria-label={`Rate ${i + 1} out of ${max}`}
        >
          <Star
            size={starSize}
            fill={i < value ? "currentColor" : "none"}
            className={i < value
              ? "text-amber-400 drop-shadow-md"
              : "text-gray-400"}
          />
        </motion.button>
      ))}
    </div>
  )
}

function AddCountryDialog({
  onAdd,
  open,
  setOpen,
  theme
}: {
  onAdd: (country: Omit<Country, "id" | "comments">) => void
  open: boolean
  setOpen: (open: boolean) => void
  theme: Theme
}) {
  const [name, setName] = useState("")
  const [region, setRegion] = useState("")
  const [easeOfLiving, setEaseOfLiving] = useState(3)
  const [safety, setSafety] = useState(3)
  const [welfare, setWelfare] = useState(3)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const controls = useAnimation()

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onAdd({
        name,
        region,
        easeOfLiving,
        safety,
        welfare,
        image: unsplashCountryImages[selectedImageIndex],
      })
      resetForm()
      setOpen(false)
    }
  }

  const resetForm = () => {
    setName("")
    setRegion("")
    setEaseOfLiving(3)
    setSafety(3)
    setWelfare(3)
    setSelectedImageIndex(0)
    setCurrentStep(1)
  }

  const handleClose = () => {
    resetForm()
    setOpen(false)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0
    })
  }

  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={controls}
        className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden
          ${theme === "light"
            ? "bg-gradient-to-b from-white to-amber-50"
            : "bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700"}`}
      >
        <div className={`p-6 border-b ${theme === "light" ? "border-amber-100" : "border-gray-700"}`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-2xl font-bold flex items-center gap-2
              ${theme === "light" ? "text-gray-800" : "text-white"}`}>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Plus className={theme === "light" ? "text-amber-500" : "text-amber-400"} size={24} />
              </motion.div>
              Add New Country
            </h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className={`p-2 rounded-full hover:bg-opacity-80
                ${theme === "light"
                  ? "text-gray-500 hover:bg-gray-100"
                  : "text-gray-400 hover:bg-gray-700"}`}
              aria-label="Close"
            >
              <X size={20} />
            </motion.button>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 rounded-full w-8 ${index + 1 === currentStep
                      ? theme === "light" ? "bg-amber-500" : "bg-amber-400"
                      : index + 1 < currentStep
                        ? theme === "light" ? "bg-amber-300" : "bg-amber-700"
                        : theme === "light" ? "bg-gray-200" : "bg-gray-700"
                    }`}
                  initial={false}
                  animate={{
                    width: index + 1 === currentStep ? 24 : 16
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              ))}
            </div>
            <p className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 overflow-hidden">
            <AnimatePresence initial={false} custom={currentStep}>
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="country-name"
                      className={`block text-sm font-medium mb-1
                        ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      Country Name
                    </label>
                    <div className="relative">
                      <Globe
                        className={`absolute left-3 top-1/2 -translate-y-1/2
                          ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                        size={18}
                      />
                      <input
                        id="country-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full p-3 pl-10 rounded-lg shadow-sm focus:ring-2
                          ${theme === "light"
                            ? "bg-white text-gray-800 border-gray-200 focus:ring-amber-400"
                            : "bg-gray-700 text-white border-gray-600 focus:ring-amber-500"}`}
                        placeholder="e.g., Switzerland🇨🇭"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country-region"
                      className={`block text-sm font-medium mb-1
                        ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      Region
                    </label>
                    <div className="relative">
                      <Filter
                        className={`absolute left-3 top-1/2 -translate-y-1/2
                          ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                        size={18}
                      />
                      <input
                        id="country-region"
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className={`w-full p-3 pl-10 rounded-lg shadow-sm focus:ring-2
                          ${theme === "light"
                            ? "bg-white text-gray-800 border-gray-200 focus:ring-amber-400"
                            : "bg-gray-700 text-white border-gray-600 focus:ring-amber-500"}`}
                        placeholder="e.g., Europe, Asia, Americas"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="space-y-6"
                >
                  <h3 className={`text-lg font-medium ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                    Rating Metrics
                  </h3>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className={`flex items-center gap-2 text-sm font-medium
                        ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                        <Star className={theme === "light" ? "text-amber-500" : "text-amber-400"} size={18} />
                        Ease of Living
                      </label>
                      <span className={`font-medium text-sm
                        ${theme === "light" ? "text-amber-600" : "text-amber-400"}`}>
                        {easeOfLiving}/5
                      </span>
                    </div>
                    <motion.div
                      initial={false}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg
                        ${theme === "light" ? "bg-amber-50" : "bg-gray-700"}`}
                    >
                      <RatingStars
                        value={easeOfLiving}
                        onChange={setEaseOfLiving}
                        size="lg"
                      />
                      <div className="h-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full mt-3 overflow-hidden">
                        <motion.div
                          initial={false}
                          animate={{ width: `${(easeOfLiving / 5) * 100}%` }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className="h-full bg-amber-500 dark:bg-amber-400 rounded-full"
                        />
                      </div>
                    </motion.div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className={`flex items-center gap-2 text-sm font-medium
                        ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                        <Shield className={theme === "light" ? "text-amber-500" : "text-amber-400"} size={18} />
                        Safety
                      </label>
                      <span className={`font-medium text-sm
                        ${theme === "light" ? "text-amber-600" : "text-amber-400"}`}>
                        {safety}/5
                      </span>
                    </div>
                    <motion.div
                      initial={false}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg
                        ${theme === "light" ? "bg-amber-50" : "bg-gray-700"}`}
                    >
                      <RatingStars
                        value={safety}
                        onChange={setSafety}
                        size="lg"
                      />
                      <div className="h-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full mt-3 overflow-hidden">
                        <motion.div
                          initial={false}
                          animate={{ width: `${(safety / 5) * 100}%` }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className="h-full bg-amber-500 dark:bg-amber-400 rounded-full"
                        />
                      </div>
                    </motion.div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className={`flex items-center gap-2 text-sm font-medium
                        ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                        <Heart className={theme === "light" ? "text-amber-500" : "text-amber-400"} size={18} />
                        Welfare
                      </label>
                      <span className={`font-medium text-sm
                        ${theme === "light" ? "text-amber-600" : "text-amber-400"}`}>
                        {welfare}/5
                      </span>
                    </div>
                    <motion.div
                      initial={false}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg
                        ${theme === "light" ? "bg-amber-50" : "bg-gray-700"}`}
                    >
                      <RatingStars
                        value={welfare}
                        onChange={setWelfare}
                        size="lg"
                      />
                      <div className="h-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full mt-3 overflow-hidden">
                        <motion.div
                          initial={false}
                          animate={{ width: `${(welfare / 5) * 100}%` }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className="h-full bg-amber-500 dark:bg-amber-400 rounded-full"
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <h3 className={`text-lg font-medium mb-3 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                    Select a country image
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {unsplashCountryImages.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative rounded-lg overflow-hidden cursor-pointer
                          ${selectedImageIndex === index
                            ? "ring-2 ring-offset-2 " + (theme === "light" ? "ring-amber-500" : "ring-amber-400")
                            : ""}`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Country option ${index + 1}`}
                          className="w-full h-24 object-cover"
                        />
                        {selectedImageIndex === index && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              className="bg-white bg-opacity-90 rounded-full p-1"
                            >
                              <CheckIcon className="w-4 h-4 text-amber-500" />
                            </motion.div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className={`text-lg font-medium mb-3 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                      Review your country
                    </h3>
                    <div className={`p-4 rounded-lg ${theme === "light" ? "bg-amber-50" : "bg-gray-700"}`}>
                      <div className="flex items-center gap-3">
                        <div className="h-16 w-16 rounded-lg overflow-hidden">
                          <img
                            src={unsplashCountryImages[selectedImageIndex] || "/placeholder.svg"}
                            alt={name || "Country"}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className={`font-bold ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                            {name || "Country name"}
                          </h4>
                          {region && (
                            <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                              {region}
                            </p>
                          )}
                          <div className="flex gap-2 mt-1">
                            <span className="flex items-center text-amber-500">
                              <Star size={14} fill="currentColor" />
                              <span className="text-xs ml-1">{easeOfLiving}</span>
                            </span>
                            <span className="flex items-center text-amber-500">
                              <Shield size={14} fill="currentColor" />
                              <span className="text-xs ml-1">{safety}</span>
                            </span>
                            <span className="flex items-center text-amber-500">
                              <Heart size={14} fill="currentColor" />
                              <span className="text-xs ml-1">{welfare}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={`px-6 py-4 border-t flex justify-between
            ${theme === "light" ? "border-amber-100" : "border-gray-700"}`}>
            {currentStep > 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={prevStep}
                className={`px-4 py-2 rounded-lg flex items-center gap-1
                  ${theme === "light"
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              >
                <ArrowLeft size={16} />
                Back
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleClose}
                className={`px-4 py-2 rounded-lg
                  ${theme === "light"
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              >
                Cancel
              </motion.button>
            )}

            {currentStep < totalSteps ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={nextStep}
                disabled={currentStep === 1 && !name.trim()}
                className={`px-4 py-2 rounded-lg flex items-center gap-1
                  ${name.trim() || currentStep > 1
                    ? theme === "light"
                      ? "bg-amber-500 text-white hover:bg-amber-600"
                      : "bg-amber-600 text-white hover:bg-amber-700"
                    : theme === "light"
                      ? "bg-amber-300 text-white cursor-not-allowed"
                      : "bg-amber-800 text-gray-300 cursor-not-allowed"}`}
              >
                Continue
                <ArrowRight size={16} />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`px-5 py-2 rounded-lg flex items-center gap-1
                  ${theme === "light"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                    : "bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:from-amber-700 hover:to-amber-600"}`}
              >
                <Plus size={16} />
                Add Country
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

function CountryDetails({
  country,
  onClose,
  theme,
  onAddComment
}: {
  country: Country
  onClose: () => void
  onRatingChange: (id: number, field: keyof Pick<Country, "easeOfLiving" | "safety" | "welfare">, value: number) => void
  theme: Theme
  onAddComment: (id: number, comment: string) => void
}) {
  const [newComment, setNewComment] = useState("")
  const [activeTab, setActiveTab] = useState<"info" | "comments">("info")

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(country.id, newComment)
      setNewComment("")
    }
  }

  if (!country) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden
          ${theme === "light"
            ? "bg-white"
            : "bg-gray-800 border border-gray-700"}`}
      >
        {/* Image header */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={country.image || "/placeholder.svg"}
            alt={country.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {country.name}
            </h2>
            {country.region && (
              <p className="text-amber-200 font-medium mt-1">
                {country.region}
              </p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm"
            aria-label="Close"
          >
            <X size={20} />
          </motion.button>
        </div>

        {/* Tabs (Info / Comments) */}
        <div className="border-b border-gray-200 dark:border-gray-700 flex px-6">
          <button
            className={`px-4 py-3 font-medium text-sm ${activeTab === "info" ? "text-amber-500" : "text-gray-500"
              }`}
            onClick={() => setActiveTab("info")}
          >
            Information
          </button>
        </div>

        {/* Tab content */}
        <div className="p-6">
          {activeTab === "info" ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Ratings</h3>
              <p>Ease of Living: {country.easeOfLiving}/5</p>
              <p>Safety: {country.safety}/5</p>
              <p>Welfare: {country.welfare}/5</p>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">Comments</h3>
              <div className="space-y-2 mb-4">
                {country.comments.length > 0 ? (
                  country.comments.map((comment, i) => (
                    <div key={i} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {comment}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic">No comments yet.</p>
                )}
              </div>
              <textarea
                className="w-full p-3 mb-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <button
                onClick={handleSubmitComment}
                className="px-4 py-2 rounded-lg bg-amber-500 text-white"
                disabled={!newComment.trim()}
              >
                Post Comment
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}



function CountryCard({
  country,
  onComment,
  onViewDetails,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  theme,
  index
}: {
  country: Country
  onComment: (id: number, comment: string) => void
  onRatingChange: (id: number, field: keyof Pick<Country, "easeOfLiving" | "safety" | "welfare">, value: number) => void
  onViewDetails: (country: Country) => void
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
  theme: Theme
  index: number
}) {
  const [newComment, setNewComment] = useState("")
  const [showComments, setShowComments] = useState(false)
  const controls = useAnimation()

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onComment(country.id, newComment)
      setNewComment("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring" }}
      whileHover={{ y: -5 }}
      className={`rounded-xl shadow-xl overflow-hidden group
        ${theme === "light"
          ? "bg-white border border-amber-100"
          : "bg-gray-800 border border-gray-700"}`}
    >
      <div className="h-56 relative overflow-hidden">
        <img
          src={country.image || "/placeholder.svg"}
          alt={country.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex justify-between items-end">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 drop-shadow-md"
              >
                <Globe className="text-amber-400" size={20} />
                {country.name}
              </motion.h2>
              {country.region && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-amber-200 text-sm"
                >
                  {country.region}
                </motion.p>
              )}
            </div>

            <div className="flex gap-1">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.9 }}
                onClick={onMoveUp}
                disabled={isFirst}
                className={`p-2 rounded-full backdrop-blur-sm
                  ${isFirst
                    ? "bg-white/10 text-white/50 cursor-not-allowed"
                    : "bg-white/20 text-white hover:bg-white/30"}`}
                aria-label="Move up"
              >
                <ArrowUp size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.9 }}
                onClick={onMoveDown}
                disabled={isLast}
                className={`p-2 rounded-full backdrop-blur-sm
                  ${isLast
                    ? "bg-white/10 text-white/50 cursor-not-allowed"
                    : "bg-white/20 text-white hover:bg-white/30"}`}
                aria-label="Move down"
              >
                <ArrowDown size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-3 gap-2 mb-5">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-3 rounded-lg
              ${theme === "light"
                ? "bg-amber-50"
                : "bg-gray-700"}`}
          >
            <div className="flex items-center gap-1 mb-1">
              <Star className="text-amber-500" size={16} />
              <span className={`text-sm font-medium
                ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}>
                Living
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < country.easeOfLiving ? "currentColor" : "none"}
                    className={i < country.easeOfLiving
                      ? "text-amber-500"
                      : theme === "light" ? "text-gray-300" : "text-gray-600"}
                  />
                ))}
              </div>
              <span className={`text-xs font-bold
                ${theme === "light" ? "text-amber-600" : "text-amber-400"}`}>
                {country.easeOfLiving}
              </span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-3 rounded-lg
              ${theme === "light"
                ? "bg-amber-50"
                : "bg-gray-700"}`}
          >
            <div className="flex items-center gap-1 mb-1">
              <Shield className="text-amber-500" size={16} />
              <span className={`text-sm font-medium
                ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}>
                Safety
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < country.safety ? "currentColor" : "none"}
                    className={i < country.safety
                      ? "text-amber-500"
                      : theme === "light" ? "text-gray-300" : "text-gray-600"}
                  />
                ))}
              </div>
              <span className={`text-xs font-bold
                ${theme === "light" ? "text-amber-600" : "text-amber-400"}`}>
                {country.safety}
              </span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-3 rounded-lg
              ${theme === "light"
                ? "bg-amber-50"
                : "bg-gray-700"}`}
          >
            <div className="flex items-center gap-1 mb-1">
              <Heart className="text-amber-500" size={16} />
              <span className={`text-sm font-medium
                ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}>
                Welfare
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < country.welfare ? "currentColor" : "none"}
                    className={i < country.welfare
                      ? "text-amber-500"
                      : theme === "light" ? "text-gray-300" : "text-gray-600"}
                  />
                ))}
              </div>
              <span className={`text-xs font-bold
                ${theme === "light" ? "text-amber-600" : "text-amber-400"}`}>
                {country.welfare}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-between mt-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowComments(!showComments)}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm font-medium 
              ${theme === "light"
                ? "text-amber-700 bg-amber-50 hover:bg-amber-100"
                : "text-amber-300 bg-gray-700 hover:bg-gray-600"}`}
            aria-expanded={showComments}
            aria-controls={`comments-${country.id}`}
          >
            <MessageSquare size={16} />
            {country.comments.length} {country.comments.length === 1 ? "Comment" : "Comments"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewDetails(country)}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm font-medium
              ${theme === "light"
                ? "text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                : "text-white bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600"}`}
          >
            <Info size={16} />
            View Details
          </motion.button>
        </div>

        <AnimatePresence>
          {showComments && (
            <motion.div
              id={`comments-${country.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden"
            >
              {country.comments.length > 0 && (
                <div className="mb-3 space-y-2 max-h-40 overflow-y-auto pr-2">
                  {country.comments.map((comment, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`p-3 rounded-lg text-sm
                        ${theme === "light"
                          ? "bg-amber-50 text-gray-700 border border-amber-100"
                          : "bg-gray-700 text-gray-300 border border-gray-600"}`}
                    >
                      {comment}
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <textarea
                  className={`w-full p-3 rounded-lg text-sm resize-none focus:ring-2
                    ${theme === "light"
                      ? "bg-white border border-gray-200 text-gray-800 focus:ring-amber-400"
                      : "bg-gray-700 border border-gray-600 text-white focus:ring-amber-400"}`}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your comment..."
                  rows={2}
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-2 rounded-lg flex items-center justify-center gap-1.5 text-sm font-medium
                    ${newComment.trim()
                      ? theme === "light"
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-amber-600 text-white hover:bg-amber-700"
                      : theme === "light"
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"}`}
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                >
                  <MessageSquare size={14} />
                  Post Comment
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ArrowLeft({ size = 24, className = "" }: { size?: number, className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function ArrowRight({ size = 24, className = "" }: { size?: number, className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("name")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const regions = ["Europe", "Asia", "North America", "South America", "Africa", "Oceania"]

  // Apply theme changes to document
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme])

  const [countries, setCountries] = useState<Country[]>([
    {
      id: 1,
      name: "England🇬🇧",
      region: "Europe",
      easeOfLiving: 4,
      safety: 4,
      welfare: 4,
      comments: ["Great healthcare system", "High cost of living in London"],
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Japan🇯🇵",
      region: "Asia",
      easeOfLiving: 4,
      safety: 5,
      welfare: 3,
      comments: ["Extremely clean cities", "Excellent public transportation"],
      image: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "France🇫🇷",
      region: "Europe",
      easeOfLiving: 3,
      safety: 3,
      welfare: 4,
      comments: ["Love the culture!", "Amazing food and history."],
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Germany🇩🇪",
      region: "Europe",
      easeOfLiving: 4,
      safety: 4,
      welfare: 5,
      comments: ["Great public services.", "Efficient transportation system."],
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1000&auto=format&fit=crop",
    },
  ])

  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

  const handleComment = (id: number, comment: string) => {
    if (comment.trim()) {
      setCountries((prev) => prev.map((c) => (c.id === id ? { ...c, comments: [...c.comments, comment] } : c)))
    }
  }

  const handleRatingChange = (
    id: number,
    field: keyof Pick<Country, "easeOfLiving" | "safety" | "welfare">,
    value: number,
  ) => {
    setCountries((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
  }

  const moveCountryUp = (index: number) => {
    if (index > 0) {
      const newCountries = [...countries]
      const temp = newCountries[index]
      newCountries[index] = newCountries[index - 1]
      newCountries[index - 1] = temp
      setCountries(newCountries)
    }
  }

  const moveCountryDown = (index: number) => {
    if (index < countries.length - 1) {
      const newCountries = [...countries]
      const temp = newCountries[index]
      newCountries[index] = newCountries[index + 1]
      newCountries[index + 1] = temp
      setCountries(newCountries)
    }
  }

  const addCountry = (newCountry: Omit<Country, "id" | "comments">) => {
    const id = Math.max(0, ...countries.map((c) => c.id)) + 1
    setCountries([...countries, { ...newCountry, id, comments: [] }])
  }

  const viewCountryDetails = (country: Country) => {
    setSelectedCountry(country)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSortBy("name")
    setSelectedRegion(null)
    setShowFilters(false)
  }

  const filteredCountries = countries
    .filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (country.region && country.region.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesRegion = !selectedRegion || country.region === selectedRegion
      return matchesSearch && matchesRegion
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else {
        return b[sortBy] - a[sortBy]
      }
    })

  const hasActiveFilters = searchTerm || sortBy !== "name" || selectedRegion



  return (
    <div className={`min-h-screen transition-colors duration-500
      ${theme === 'light'
        ? 'bg-gradient-to-b from-amber-50 to-white'
        : 'bg-gradient-to-b from-gray-900 to-gray-800'}`}>

      <ThemeToggle theme={theme} setTheme={setTheme} />

      <div className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full 
            ${theme === "light"
              ? "bg-amber-400 opacity-5"
              : "bg-purple-600 opacity-10"}`}
          />
          <div className={`absolute top-1/3 -left-32 w-64 h-64 rounded-full 
            ${theme === "light"
              ? "bg-orange-400 opacity-5"
              : "bg-indigo-600 opacity-10"}`}
          />
        </div>

        <main className="relative p-6 max-w-7xl mx-auto">
          <div className="text-center mb-12 mt-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className={`text-5xl font-bold mb-4 flex items-center justify-center gap-3
                ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <Globe className={theme === 'light' ? 'text-amber-500' : 'text-amber-400'} size={42} />
                </motion.div>
                <span className="relative">
                  Global Explorer
                  <motion.div
                    className={`absolute -bottom-2 left-0 h-1 rounded-full
                      ${theme === 'light'
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                        : 'bg-gradient-to-r from-amber-400 to-amber-600'}`}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`text-lg mb-8 max-w-2xl mx-auto
                ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
            >
              Discover and review countries based on living standards, safety, and welfare systems.
              Share your experiences with the global community.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`mb-8 mx-auto max-w-3xl rounded-2xl shadow-lg p-4 
              ${theme === 'light'
                ? 'bg-white border border-amber-100'
                : 'bg-gray-800 border border-gray-700'}`}
          >
            <div className="flex items-center">
              <div className="relative flex-grow">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 
                  ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search countries..."
                  className={`w-full py-2.5 pl-10 pr-4 rounded-lg focus:ring-2 focus:ring-offset-1
                    ${theme === 'light'
                      ? 'bg-gray-50 border border-gray-200 text-gray-800 focus:ring-amber-400'
                      : 'bg-gray-700 border border-gray-600 text-white focus:ring-amber-500'}`}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full
                      ${theme === 'light' ? 'text-gray-400 hover:bg-gray-100' : 'text-gray-500 hover:bg-gray-600'}`}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`ml-2 p-2.5 rounded-lg flex items-center gap-2
                  ${hasActiveFilters
                    ? theme === 'light'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-amber-900 bg-opacity-50 text-amber-400'
                    : theme === 'light'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                <Filter size={18} />
                {hasActiveFilters && <span className="text-xs font-bold">Active</span>}
              </motion.button>
              {hasActiveFilters && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetFilters}
                  className={`ml-2 p-2.5 rounded-lg
                    ${theme === 'light'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  <RefreshCw size={18} />
                </motion.button>
              )}
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
                    <div>
                      <label className={`block text-sm font-medium mb-2
                        ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        Sort by
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "name", label: "Name" },
                          { id: "easeOfLiving", label: "Living" },
                          { id: "safety", label: "Safety" },
                          { id: "welfare", label: "Welfare" }
                        ].map((option) => (
                          <motion.button
                            key={option.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSortBy(option.id as SortOption)}
                            className={`py-2 px-3 rounded-lg text-sm font-medium
                              ${sortBy === option.id
                                ? theme === 'light'
                                  ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                  : 'bg-amber-900 bg-opacity-50 text-amber-400 border border-amber-800'
                                : theme === 'light'
                                  ? 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                                  : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'}`}
                          >
                            {option.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2
                        ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        Filter by region
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {regions.slice(0, 4).map((region) => (
                          <motion.button
                            key={region}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
                            className={`py-2 px-3 rounded-lg text-sm font-medium
                              ${selectedRegion === region
                                ? theme === 'light'
                                  ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                  : 'bg-amber-900 bg-opacity-50 text-amber-400 border border-amber-800'
                                : theme === 'light'
                                  ? 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                                  : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'}`}
                          >
                            {region}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {filteredCountries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center p-10 rounded-xl my-8
                ${theme === 'light' ? 'bg-white border border-amber-100' : 'bg-gray-800 border border-gray-700'}`}
            >
              <div className="flex flex-col items-center">
                <div className={`p-4 rounded-full mb-4
                  ${theme === 'light' ? 'bg-amber-50' : 'bg-gray-700'}`}>
                  <Search size={32} className={theme === 'light' ? 'text-amber-400' : 'text-amber-400'} />
                </div>
                <h3 className={`text-xl font-bold mb-2
                  ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                  No countries found
                </h3>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetFilters}
                  className={`mt-6 px-4 py-2 rounded-lg flex items-center gap-2
                    ${theme === 'light'
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-amber-600 text-white hover:bg-amber-700'}`}
                >
                  <RefreshCw size={16} />
                  Reset filters
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                  Showing {filteredCountries.length} {filteredCountries.length === 1 ? 'country' : 'countries'}
                </p>
                {hasActiveFilters && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetFilters}
                    className={`text-sm flex items-center gap-1
                      ${theme === 'light' ? 'text-amber-600' : 'text-amber-400'}`}
                  >
                    <RefreshCw size={14} />
                    Reset all filters
                  </motion.button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCountries.map((country, index) => (
                  <CountryCard
                    key={country.id}
                    country={country}
                    onComment={handleComment}
                    onRatingChange={handleRatingChange}
                    onViewDetails={viewCountryDetails}
                    onMoveUp={() => moveCountryUp(index)}
                    onMoveDown={() => moveCountryDown(index)}
                    isFirst={index === 0}
                    isLast={index === countries.length - 1}
                    theme={theme}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      <AddCountryDialog
        onAdd={addCountry}
        open={addDialogOpen}
        setOpen={setAddDialogOpen}
        theme={theme}
      />

      <AnimatePresence>
        {selectedCountry && (
          <CountryDetails
            country={selectedCountry}
            onClose={() => setSelectedCountry(null)}
            onRatingChange={handleRatingChange}
            theme={theme}
            onAddComment={handleComment}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
