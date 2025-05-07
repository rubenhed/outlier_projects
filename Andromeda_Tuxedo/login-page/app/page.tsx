'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

type FormData = {
  username: string;
  password: string;
};

type User = {
  username: string;
  password: string;
};

type Page = 'home' | 'login' | 'register';

type NavbarProps = {
  isLoggedIn: boolean;
  formData: FormData;
  handleLogout: () => void;
  setPage: (page: Page) => void;
};

type LoginPageProps = {
  handleLogin: (e: FormEvent) => void;
  formData: FormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
};

type RegisterPageProps = {
  handleRegister: (e: FormEvent) => void;
  formData: FormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
};

const Navbar = ({
  isLoggedIn,
  formData,
  handleLogout,
  setPage
}: NavbarProps) => (
  <nav className="bg-indigo-600 p-4">
    <div className="flex justify-between items-center container mx-auto text-white">
      <h1 className="text-2xl font-bold">MyApp</h1>
      <div className="flex items-center space-x-6">
        {isLoggedIn ? (
          <>
            <span className="text-lg"><strong>Welcome, {formData.username}!</strong></span>
            <button onClick={handleLogout} className="text-lg hover:text-indigo-200">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setPage('login')} className="text-lg hover:text-indigo-200">
              Login
            </button>
            <button onClick={() => setPage('register')} className="text-lg hover:text-indigo-200">
              Register
            </button>
          </>
        )}
        <button onClick={() => setPage('home')} className="text-lg hover:text-indigo-200">
          Home
        </button>
      </div>
    </div>
  </nav>
);

const HomePage = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center items-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-indigo-600">Welcome to MyApp</h1>
      <p className="mt-4 text-xl text-gray-700">This is the main page of the app.</p>
    </div>
  </div>
);

const LoginPage = ({
  handleLogin,
  formData,
  handleInputChange,
  errorMessage
}: LoginPageProps) => (
  <div className="flex justify-center items-center min-h-screen bg-gray-50">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-describedby="username-helper-text"
          />
          <small id="username-helper-text" className="text-gray-500">
            Enter your username
          </small>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-describedby="password-helper-text"
          />
          <small id="password-helper-text" className="text-gray-500">
            Enter your password
          </small>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
);

const RegisterPage = ({
  handleRegister,
  formData,
  handleInputChange,
  errorMessage
}: RegisterPageProps) => (
  <div className="flex justify-center items-center min-h-screen bg-gray-50">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-describedby="username-helper-text"
          />
          <small id="username-helper-text" className="text-gray-500">
            Enter your username
          </small>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-describedby="password-helper-text"
          />
          <small id="password-helper-text" className="text-gray-500">
            Enter your password
          </small>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>

    </div>
  </div>
);

const App = () => {
  const [page, setPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [users, setUsers] = useState<Record<string, User>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      if (users[formData.username]) {
        setErrorMessage('Username already exists.');
      } else {
        const newUser: User = { username: formData.username, password: formData.password };
        setUsers((prevUsers) => ({ ...prevUsers, [formData.username]: newUser }));
        setErrorMessage('');
        setFormData({ username: '', password: '' });
        setPage('login');
        setShowToast(true);
      }
    } else {
      setErrorMessage('Both fields are required.');
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const user = users[formData.username];
    if (user && user.password === formData.password) {
      setIsLoggedIn(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({ username: '', password: '' });
  };

  useEffect(() => {
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  }, [showToast]);

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        formData={formData}
        handleLogout={handleLogout}
        setPage={setPage}
      />
      {page === 'home' && <HomePage />}
      {page === 'login' && (
        <LoginPage
          handleLogin={handleLogin}
          formData={formData}
          handleInputChange={handleInputChange}
          errorMessage={errorMessage}
        />
      )}
      {page === 'register' && (
        <RegisterPage
          handleRegister={handleRegister}
          formData={formData}
          handleInputChange={handleInputChange}
          errorMessage={errorMessage}
        />
      )}

      {showToast && (
        <div className="fixed top-10 right-10 transform -translate-x-1/2 bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg">
          <p>Thanks for registering!</p>
        </div>
      )}
    </div>
  );
};

export default App;
