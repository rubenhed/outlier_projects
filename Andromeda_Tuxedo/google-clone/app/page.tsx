'use client';

import { useState, FormEvent } from 'react';

interface Props {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: (e: FormEvent) => void;
  handleLucky: () => void;
}

const Navbar = () => (
  <header className="flex justify-end items-center p-4 text-sm space-x-4">
    <a href="https://mail.google.com" className="hover:underline">Gmail</a>
    <a href="https://www.google.com/imghp" className="hover:underline">Images</a>
    <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
      <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24">
        <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
      </svg>
    </button>
    <img
      src="https://lh3.googleusercontent.com/ogw/AGvuzYZXXXXXXXXXX=s32-c-mo"
      alt="Profile"
      className="w-8 h-8 rounded-full"
    />
  </header>
);

const SearchForm = ({ query, setQuery, handleSearch, handleLucky }: Props) => (
  <form onSubmit={handleSearch} className="w-full max-w-xl">
    <div className="flex items-center border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#303134] rounded-full px-4 py-2 hover:shadow-md transition">
      <svg className="w-5 h-5 text-gray-500 mr-3 dark:text-gray-400" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.48-5.34C15.01 5.01 12 2 8.5 2S2 5.01 2 8.5 5.01 15 8.5 15c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-7 0C5.46 14 3 11.54 3 8.5S5.46 3 8.5 3 14 5.46 14 8.5 11.54 14 8.5 14z" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-transparent focus:outline-none"
      />
    </div>
    <div className="flex justify-center space-x-4 mt-8">
      <button
        type="submit"
        className="bg-gray-100 dark:bg-[#303134] px-4 py-2 rounded text-sm text-gray-800 dark:text-gray-100 hover:shadow transition"
      >
        Google Search
      </button>
      <button
        type="button"
        onClick={handleLucky}
        className="bg-gray-100 dark:bg-[#303134] px-4 py-2 rounded text-sm text-gray-800 dark:text-gray-100 hover:shadow transition"
      >
        I'm Feeling Lucky
      </button>
    </div>
  </form>
);

const Footer = () => (
  <footer className="bg-gray-100 dark:bg-[#171717] text-sm text-gray-600 dark:text-gray-400 w-full">
    <div className="px-6 py-3 border-b dark:border-gray-700">Canada</div>
    <div className="flex flex-col sm:flex-row justify-between px-6 py-3">
      <div className="flex space-x-4 mb-2 sm:mb-0">
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Advertising</a>
        <a href="#" className="hover:underline">Business</a>
        <a href="#" className="hover:underline">How Search works</a>
      </div>
      <div className="flex space-x-4">
        <a href="#" className="hover:underline">Privacy</a>
        <a href="#" className="hover:underline">Terms</a>
        <a href="#" className="hover:underline">Settings</a>
      </div>
    </div>
  </footer>
);

const Main = ({ query, setQuery, handleSearch, handleLucky }: Props) => (
  <main className="flex flex-col items-center justify-center flex-grow">
    <img
      src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
      alt="Google"
      className="w-[272px] h-auto mb-8"
    />
    <SearchForm query={query} setQuery={setQuery} handleSearch={handleSearch} handleLucky={handleLucky} />
  </main>
);

const App = () => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  };

  const handleLucky = () => {
    if (!query.trim()) return;
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 dark:bg-[#202124] dark:text-gray-100">
      <Navbar />
      <Main query={query} setQuery={setQuery} handleSearch={handleSearch} handleLucky={handleLucky} />
      <Footer />
    </div>
  );
};

export default App;
