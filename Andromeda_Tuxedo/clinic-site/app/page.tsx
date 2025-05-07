'use client'

import { useState } from 'react'

type Page = 'home' | 'appointments' | 'medicines'

const medicines = [
  { id: 1, name: 'Paracetamol', price: 5 },
  { id: 2, name: 'Ibuprofen', price: 7 },
  { id: 3, name: 'Amoxicillin', price: 12 },
]

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [name, setName] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [submittedAppointment, setSubmittedAppointment] = useState<boolean>(false)
  const [shoppingCart, setShoppingCart] = useState<number[]>([])

  const addToCart = (id: number) => {
    setShoppingCart([...shoppingCart, id])
  }

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedAppointment(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar setCurrentPage={setCurrentPage} />
      <main className="p-8">
        {currentPage === 'home' && <Home />}
        {currentPage === 'appointments' && (
          <Appointments
            name={name}
            setName={setName}
            date={date}
            setDate={setDate}
            submitted={submittedAppointment}
            handleSubmit={handleAppointmentSubmit}
          />
        )}
        {currentPage === 'medicines' && (
          <Medicines
            medicines={medicines}
            cart={shoppingCart}
            addToCart={addToCart}
          />
        )}
      </main>
    </div>
  )
}

type NavigationProps = {
  setCurrentPage: (page: Page) => void
}

const Navbar = ({ setCurrentPage }: NavigationProps) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">🏥 Hospital Clinic</h1>
        <div className="flex gap-4">
          <button onClick={() => setCurrentPage('home')} className="hover:underline">Home</button>
          <button onClick={() => setCurrentPage('appointments')} className="hover:underline">Appointments</button>
          <button onClick={() => setCurrentPage('medicines')} className="hover:underline">Medicines</button>
        </div>
      </div>
    </nav>
  )
}

function Home() {
  return (
    <div className="text-center mt-20">
      <h2 className="text-4xl font-bold mb-4">Welcome to Our Clinic</h2>
      <p className="text-lg">Book your appointment easily or buy medicines online!</p>
    </div>
  )
}

type AppointmentsProps = {
  name: string
  setName: (name: string) => void
  date: string
  setDate: (date: string) => void
  submitted: boolean
  handleSubmit: (e: React.FormEvent) => void
}

const Appointments = ({ name, setName, date, setDate, submitted, handleSubmit }: AppointmentsProps) => {
  const today = new Date().toLocaleDateString('en-CA')

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>
      {submitted ? (
        <div className="p-4 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded">
          Appointment booked for <strong>{name}</strong> on <strong>{date}</strong>.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Preferred Date</label>
            <input
              type="date"
              className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={today}
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Book Appointment
          </button>
        </form>
      )}
    </div>
  )
}

type MedicinesProps = {
  medicines: { id: number; name: string; price: number }[]
  cart: number[]
  addToCart: (id: number) => void
}

const Medicines = ({ medicines, cart, addToCart }: MedicinesProps) => {
  const total = cart.reduce((sum, id) => {
    const item = medicines.find(m => m.id === id)
    return sum + (item?.price || 0)
  }, 0)

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Buy Medicines</h2>
      <div className="grid gap-4">
        {medicines.map(med => (
          <div key={med.id} className="border p-4 rounded shadow flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
            <div>
              <h3 className="font-medium">{med.name}</h3>
              <p className="text-sm">${med.price}</p>
            </div>
            <button
              onClick={() => addToCart(med.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <h3 className="text-lg font-bold mb-2">Your Cart</h3>
          <ul className="list-disc list-inside">
            {cart.map((id, idx) => {
              const item = medicines.find(m => m.id === id)
              return <li key={idx}>{item?.name} - ${item?.price}</li>
            })}
          </ul>
          <p className="font-bold mt-4">Total: ${total}</p>
        </div>
      )}
    </div>
  )
}

export default HomePage;