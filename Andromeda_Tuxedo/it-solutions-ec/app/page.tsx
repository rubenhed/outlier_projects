"use client"

import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiCheckCircle, FiArrowRight, FiMenu, FiX, FiGlobe, FiShield, FiZap, FiMonitor, FiCode, FiCloud, FiSearch } from "react-icons/fi";

interface PartnerLogoProps {
  src: string;
  alt: string;
}

const PartnerLogo = ({ src, alt }: PartnerLogoProps) => (
  <div className="h-12 flex items-center justify-center px-4">
    <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
  </div>
);

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay: number;
}

const ServiceCard = ({ title, description, icon, delay }: ServiceCardProps) => (
  <motion.div
    className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-100 dark:border-gray-700"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 opacity-0 group-hover:opacity-100 dark:group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10"
 />
    <div className="relative">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white mb-6 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-sans">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-sm font-medium text-purple-600 transition-colors">Learn more</span>
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 group-hover:bg-blue-100 transition-all">
          <FiArrowRight className="text-purple-600" />
        </div>
      </div>
    </div>
  </motion.div>
);

interface SolutionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay: number;
}

const SolutionCard = ({ title, description, icon, delay }: SolutionCardProps) => (
  <motion.div
    className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-100 dark:border-gray-700"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 opacity-0 group-hover:opacity-100 dark:group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10" />
    <div className="relative">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white mb-6 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-sans">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-sm font-medium text-purple-600 transition-colors">Learn more</span>
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 group-hover:bg-blue-100 transition-all">
          <FiArrowRight className="text-purple-600" />
        </div>
      </div>
    </div>
  </motion.div>
);

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => (
  <motion.div
    className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
  >
    <div className="flex items-center mb-6">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-4">
        <img
          src={testimonial.avatar || "/api/placeholder/120/120"}
          alt={testimonial.author}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.author}</h4>
        <p className="text-sm text-gray-500">
          {testimonial.position} at {testimonial.company}
        </p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">"{testimonial.quote}"</p>
  </motion.div>
);

interface Partner {
  id: number;
  name: string;
  logo: string;
}

interface PartnerCarouselProps {
  partners: Partner[];
}

const PartnerCarousel = ({ partners }: PartnerCarouselProps) => {
  return (
    <div className="relative overflow-hidden py-8">
      <div className="flex justify-around items-center">
        {partners.map((partner) => (
          <PartnerLogo key={partner.id} src={partner.logo} alt={partner.name} />
        ))}
      </div>
    </div>
  );
};

const ITCompanyWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<{ id: number; title: string; url: string }[]>([]);
  const [showPopup, setShowPopup] = useState("");

  const servicesRef = React.createRef<HTMLDivElement>();
  const solutionsRef = React.createRef<HTMLDivElement>();
  const aboutRef = React.createRef<HTMLDivElement>();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        "Their IT solutions have transformed our business operations. The team's expertise and professionalism are top-notch.",
      author: "Sarah Johnson",
      position: "COO",
      company: "TechGlobe",
      avatar: "/api/placeholder/120/120",
    },
    {
      id: 2,
      quote:
        "We were impressed by their ability to understand our needs and deliver customized solutions that exceeded our expectations.",
      author: "Michael Chen",
      position: "CTO",
      company: "DataFlow",
      avatar: "/api/placeholder/120/120",
    },
    {
      id: 3,
      quote:
        "Their support team is always available and responsive. They've helped us maintain peak performance and security.",
      author: "Emily Rodriguez",
      position: "IT Manager",
      company: "SecureNet",
      avatar: "/api/placeholder/120/120",
    },
  ];

  const partners: Partner[] = [
    { id: 1, name: "Microsoft", logo: "https://placehold.co/200x100/00008B/white?text=Microsoft" },
    { id: 2, name: "Amazon", logo: "https://placehold.co/200x100/00008B/white?text=Amazon" },
    { id: 3, name: "Google", logo: "https://placehold.co/200x100/00008B/white?text=Google" },
    { id: 4, name: "IBM", logo: "https://placehold.co/200x100/00008B/white?text=IBM" },
    { id: 5, name: "Cisco", logo: "https://placehold.co/200x100/00008B/white?text=Cisco" },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const filteredResults = [
        { id: 1, title: "Managed IT Services", url: "/services/managed-it" },
        { id: 2, title: "Cybersecurity Solutions", url: "/services/cybersecurity" },
        { id: 3, title: "Cloud Computing", url: "/services/cloud" },
        { id: 4, title: "IT Consulting", url: "/services/consulting" },
        { id: 5, title: "About Us", url: "/about" },
      ].filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className={`relative min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden`}>
      <header
        className={"sticky top-0 z-40 w-full transition-all duration-300 bg-transparent"}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-[1px] -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-shrink-0">
                <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  IT Solutions
                </span>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                {[
                  { name: "Home", id: "home" },
                  { name: "Services", id: "services" },
                  { name: "Solutions", id: "solutions" },
                  { name: "About", id: "about" },
                ].map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={"text-sm font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-purple-600"}>
                      {item.name}
                    </button>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
                >
                  {isSearchOpen ? <FiX size={20} /> : <FiSearch size={20} />}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                >
                  Contact
                </button>
              </motion.div>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600 dark:text-gray-300 hover:text-purple-600 hover:bg-white dark:bg-gray-900 transition-all duration-300"
              >
                {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                className="pb-6 pt-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services, solutions..."
                    className="w-full bg-gray-50 border-0 rounded-xl pl-4 pr-10 h-12 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : <FiSearch size={18} />}
                  </button>
                </form>

                {searchResults.length > 0 && (
                  <div className="mt-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                    {searchResults.map((result) => (
                      <a
                        key={result.id}
                        href={result.url}
                        className="block px-6 py-3 hover:bg-gray-50 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors"
                      >
                        {result.title}
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4 space-y-6">
                <div className="flex flex-col space-y-6">
                  {[
                    { name: "Home", id: "home" },
                    { name: "Services", id: "services" },
                    { name: "Solutions", id: "solutions" },
                    { name: "About", id: "about" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.3 }}
                    >
                      <button
                        onClick={() => {
                          scrollToSection(item.id);
                          setIsMenuOpen(false);
                        }}
                        className={"text-base font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-purple-600"}>
                        {item.name}
                      </button>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <button
                    onClick={() => {
                      scrollToSection("contact");
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                  >
                    Contact
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section
          id="home"
          className="relative h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 overflow-hidden"

        >
          <div className="absolute inset-0 -z-10">
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)] [animation:bg-pulse_8s_infinite]"
              style={{
                animation: "bg-pulse 8s infinite",
              }}
            />
            <div
              className="absolute right-0 top-0 h-[500px] w-[500px] bg-[radial-gradient(circle,_rgba(147,51,234,0.1)_0%,_transparent_70%)] rounded-full blur-3xl [animation:float_12s_infinite]"
              style={{
                animation: "float 12s infinite",
              }}
            />
            <div
              className="absolute left-0 bottom-0 h-[400px] w-[400px] bg-[radial-gradient(circle,_rgba(37,99,235,0.1)_0%,_transparent_70%)] rounded-full blur-3xl [animation:float_8s_infinite]"
              style={{
                animation: "float 8s infinite",
              }}
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
              <motion.div
                className="max-w-2xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-block mb-6">
                  <div className="flex items-center">
                    <span className="h-px w-12 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                    <span className="ml-4 text-sm font-medium text-purple-600 uppercase tracking-wider">Transform Your Business</span>
                  </div>
                  <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight mt-4">
                    Cutting-Edge IT Solutions
                  </h1>
                  <div className="flex items-center mt-4">
                    <span className="text-gray-600 dark:text-gray-300 text-lg">Empowering growth through innovation</span>
                  </div>
                </div>

                <motion.p
                  className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Discover how our comprehensive IT solutions can revolutionize your business operations, boost efficiency, and drive growth in the digital age.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <motion.button
                    onClick={() => scrollToSection("contact")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection("services")}
                    className="bg-white dark:bg-gray-900 text-black dark:text-white px-8 py-4 rounded-full font-medium border-2 border-blue-200 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Services
                  </motion.button>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative hidden lg:block"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="relative bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="absolute -top-6 -right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg">
                    <FiZap size={24} />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-purple-500 text-white p-4 rounded-full shadow-lg">
                    <FiCloud size={24} />
                  </div>

                  <div className="mb-6">
                    <div className="h-2 bg-gray-200 rounded-full w-64 mb-2">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-1">
                      <span className="flex items-center">
                        <FiMonitor size={16} className="mr-1 text-blue-500" /> System Performance
                      </span>
                      <span>75%</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm font-medium text-gray-700">Security Status</span>
                    </div>
                    <div className="flex items-center">
                      <FiShield size={16} className="text-blue-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">All systems secure</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm font-medium text-gray-700">Network Activity</span>
                    </div>
                    <div className="flex items-center">
                      <FiGlobe size={16} className="text-purple-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Monitoring 5 connected devices</span>
                    </div>
                  </div>

                  <div className="absolute top-1/2 left-full -translate-y-1/2 -translate-x-12 bg-white dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center">
                      <FiCode size={16} className="text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">API Status</span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">All services operational</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-4 bg-gray-50 dark:bg-gray-800" ref={servicesRef} id="services">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Our Services
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Comprehensive IT solutions designed to optimize your business operations and drive growth.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                title="Managed IT Services"
                description="Proactive IT management to ensure your systems are always running at peak performance."
                icon={<FiMonitor />}
                delay={0.1}
              />
              <ServiceCard
                title="Cybersecurity Solutions"
                description="State-of-the-art security measures to protect your business from cyber threats."
                icon={<FiShield />}
                delay={0.2}
              />
              <ServiceCard
                title="Cloud Computing"
                description="Scalable cloud solutions to enhance flexibility and reduce infrastructure costs."
                icon={<FiCloud />}
                delay={0.3}
              />
              <ServiceCard
                title="IT Consulting"
                description="Expert guidance to help you make informed decisions about your IT infrastructure."
                icon={<FiGlobe />}
                delay={0.4}
              />
              <ServiceCard
                title="Network Solutions"
                description="Design and implementation of robust network infrastructures for your business."
                icon={<FiCode />}
                delay={0.5}
              />
              <ServiceCard
                title="Data Analytics"
                description="Transform your data into actionable insights with our advanced analytics solutions."
                icon={<FiCode />}
                delay={0.6}
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-800" ref={solutionsRef} id="solutions">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Our Solutions
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Innovative solutions tailored to address your unique business challenges.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <SolutionCard
                title="Enterprise IT Solutions"
                description="Comprehensive IT solutions designed for large organizations with complex IT requirements."
                icon={<FiMonitor />}
                delay={0.1}
              />
              <SolutionCard
                title="SMB Technology Solutions"
                description="Tailored IT solutions to help small and medium businesses compete with larger enterprises."
                icon={<FiCode />}
                delay={0.2}
              />
              <SolutionCard
                title="Industry-Specific Solutions"
                description="Customized IT solutions that cater to the unique needs of different industries."
                icon={<FiGlobe />}
                delay={0.3}
              />
              <SolutionCard
                title="Digital Transformation"
                description="End-to-end solutions to help businesses embrace digital transformation and stay ahead in the market."
                icon={<FiZap />}
                delay={0.4}
              />
              <SolutionCard
                title="IT Infrastructure Optimization"
                description="Solutions to optimize your IT infrastructure for better performance and efficiency."
                icon={<FiMonitor />}
                delay={0.5}
              />
              <SolutionCard
                title="Cloud Migration Services"
                description="Seamless migration to cloud environments with minimal disruption to your business operations."
                icon={<FiCloud />}
                delay={0.6}
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden" ref={aboutRef} id="about">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative">
                  <img
                    src="https://placehold.co/600x400/00008B/white?text=Company+Overview"
                    alt="Company Overview"
                    className="rounded-xl shadow-xl w-full"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-xl font-bold mb-2">25+</h4>
                    <p className="text-sm">Years of IT Excellence</p>
                  </div>
                </div>

                <div className="absolute -top-10 -left-10 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hidden lg:block">
                  <div className="flex items-center">
                    <FiCheckCircle className="text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">ISO 27001 Certified</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-purple-600 uppercase tracking-wider mb-2">About Us</h3>
                  <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                    Pioneering IT Solutions for a Digital World
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    At IT Solutions, we're passionate about harnessing the power of technology to drive business success. With over two decades of experience in the IT industry, we've established ourselves as a trusted partner for businesses looking to leverage cutting-edge technology solutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <motion.div
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-4 flex-shrink-0">
                      <FiZap className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">Our Mission</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        To empower businesses with innovative IT solutions that drive growth, efficiency, and success in the digital age.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-4 flex-shrink-0">
                      <FiGlobe className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">Our Vision</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        To be the leading provider of IT solutions, recognized for our expertise, innovation, and commitment to customer satisfaction.
                      </p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                  >
                    Contact Us
                  </button>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="bg-white dark:bg-gray-900 text-black dark:text-white px-8 py-4 rounded-full font-medium border-2 border-blue-200 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    Explore Services
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Hear from the businesses that have transformed with our IT solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                Our Trusted Partners
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We collaborate with industry leaders to deliver exceptional IT solutions
              </p>
            </motion.div>

            <PartnerCarousel partners={partners} />
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900" id="contact">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Ready to revolutionize your business with IT excellence?
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Take the first step towards transforming your business operations and staying ahead in the digital landscape
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h3>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-4 flex-shrink-0">
                        <FiGlobe className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium text-gray-900 dark:text-white">123 Tech Drive, Innovation Hub, Silicon Valley, CA</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-4 flex-shrink-0">
                        <FiGlobe className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">contact@itsolutions.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-4 flex-shrink-0">
                        <FiGlobe className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900 dark:text-white">+1 (800) 555-TECH (8324)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h3>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full bg-gray-50 border-0 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-800"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full bg-gray-50 border-0 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-800"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full bg-gray-50 border-0 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-800"
                        placeholder="john.doe@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full bg-gray-50 border-0 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-800"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full bg-gray-50 border-0 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-800"
                        placeholder="Tell us about your IT needs..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPopup("✅ Message recieved!");
                        setTimeout(() => setShowPopup(""), 2000);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-extrabold mb-6">IT Solutions</h3>
              <p className="text-gray-400 mb-6">
                Empowering businesses with cutting-edge technology solutions for a digital world.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:mx-auto">
              <div>
                <h4 className="text-sm font-medium mb-6">Services</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}>Managed IT</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}>Cybersecurity</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}>Cloud Computing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}>IT Consulting</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-6">Company</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>Contact</a></li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest IT insights and updates.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-gray-800 border-0 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
                <button
                  onClick={() => { setShowPopup("✅ Subscribed!"); setTimeout(() => setShowPopup(""), 2000); }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/20">
                  Subscribe
                </button>


              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} IT Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in z-50">
          {showPopup}
        </div>
      )}
    </div>
  );
};

export default ITCompanyWebsite;