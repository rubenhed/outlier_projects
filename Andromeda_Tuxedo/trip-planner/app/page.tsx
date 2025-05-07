"use client";

import { useState } from 'react';

type Event = {
  name: string;
  date: string;
};

const TripTodo = () => {
  const arrivalDate = new Date("2025-04-20");
  const returnDate = new Date("2025-04-30");

  return (
    <div className="min-h-screen bg-purple-100 dark:bg-purple-950 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-purple-700">Trip To-Do List</h1>

        <TripDetails arrivalDate={arrivalDate} returnDate={returnDate} />

        <div className="my-6">
          <h2 className="text-xl font-medium text-purple-600">Planned Events</h2>
          <EventInputList arrivalDate={arrivalDate} returnDate={returnDate} />
        </div>
      </div>
    </div>
  );
};

const TripDetails = ({ arrivalDate, returnDate }: { arrivalDate: Date; returnDate: Date }) => (
  <div className="my-6">
    <h2 className="text-xl font-medium text-purple-600">Trip Details</h2>
    <div className="space-y-4 mt-4">
      <div className="flex space-x-4">
        <div className="flex-1 shadow-sm p-3 rounded">
          <span className="text-gray-800">Arrival Date:</span>
          <div className="font-semibold text-purple-700">{arrivalDate.toDateString()}</div>
        </div>
        <div className="flex-1 shadow-sm p-3 rounded">
          <span className="text-gray-800">Return Date:</span>
          <div className="font-semibold text-purple-700">{returnDate.toDateString()}</div>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 shadow-sm p-3 rounded">
          <span className="text-gray-800">Hotel Check-in:</span>
          <div className="font-semibold text-purple-700">{arrivalDate.toDateString()}</div>
        </div>
        <div className="flex-1 shadow-sm p-3 rounded">
          <span className="text-gray-800">Hotel Check-out:</span>
          <div className="font-semibold text-purple-700">{returnDate.toDateString()}</div>
        </div>
      </div>
    </div>
  </div>
);

const EventInputList = ({ arrivalDate, returnDate }: { arrivalDate: Date; returnDate: Date }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');

  const addEvent = () => {
    const eventDateObj = new Date(eventDate);

    if (eventName && eventDate && eventDateObj >= arrivalDate && eventDateObj <= returnDate) {
      const newEvent = { name: eventName, date: eventDate };

      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents, newEvent];
        updatedEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        return updatedEvents;
      });

      setEventName('');
      setEventDate('');
    } else {
      alert(`Event date must be between ${arrivalDate.toDateString()} and ${returnDate.toDateString()}`);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
          className="p-2 border border-purple-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={addEvent}
          className="bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Add Event
        </button>
      </div>

      <ul className="space-y-2">
        {events.map((event, index) => (
          <li key={index} className="flex justify-between items-center p-2 border-b border-purple-200">
            <span className="text-gray-800">{event.name}</span>
            <span className="font-semibold text-purple-600">{event.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripTodo;
