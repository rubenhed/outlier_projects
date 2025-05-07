"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-10 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 dark:bg-green-500">
      {message}
    </div>
  );
};

const Navbar = () => (
  <nav className="bg-green-700 text-white px-6 py-4 shadow-md dark:bg-green-900">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">SaveEndangeredSpecies</h1>
      <ul className="flex space-x-6 items-center">
        <li><Link href="#" className="hover:underline">Home</Link></li>
        <li><Link href="#about" className="hover:underline">About</Link></li>
        <li><Link href="#donate" className="hover:underline">Donate</Link></li>
      </ul>
    </div>
  </nav>
);

const MainContent = ({ showToast }: { showToast: (msg: string) => void }) => {
  const handleDonate = (amount: string) => {
    showToast(`Thanks for your donation of ${amount}.`);
  };

  return (
    <main className="flex-grow bg-gray-50 py-12 px-4 dark:bg-gray-900">
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-6 dark:text-green-300">Protect endangered species</h2>
        <p className="text-lg text-gray-700 mb-10 dark:text-gray-300">
          Every donation helps us conserve habitats and save endangered animals from extinction.
        </p>
        <Link href="#donate">
          <button className="bg-green-600 text-white text-lg px-6 py-3 rounded-xl hover:bg-green-700 transition">
            Make a Donation
          </button>
        </Link>
      </section>

      <section id="about" className="mt-20 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-green-700 mb-4 dark:text-green-400">We need your help</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Endangered species suffer from the threat of extinction, please help them by donating🙂
        </p>
      </section>

      <section id="donate" className="mt-20 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-green-700 mb-4 dark:text-green-400">Donation Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "$10", description: "Feeds one animal for a week" },
            { label: "$30", description: "Feeds three animal for a week" },
            { label: "$50", description: "Feeds five animal for a week" },
          ].map((donation) => (
            <div key={donation.label} className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-800">
              <h4 className="text-xl font-bold text-green-700 mb-2 dark:text-green-300">{donation.label}</h4>
              <p className="text-gray-600 dark:text-gray-300">{donation.description}</p>
              <button
                onClick={() => handleDonate(donation.label)}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Donate {donation.label}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

const Footer = () => (
  <footer className="bg-green-800 text-white py-6 dark:bg-green-900">
    <div className="max-w-4xl mx-auto text-center">
      <p>&copy; 2025 SaveEndangeredSpecies. All rights reserved.</p>
    </div>
  </footer>
);

const App = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <MainContent showToast={(msg) => setToastMessage(msg)} />
      <Footer />
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
};

export default App;
