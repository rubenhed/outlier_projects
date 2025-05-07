'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dayjs, { Dayjs } from 'dayjs';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { FiEdit2, FiTrash2, FiCalendar, FiGithub, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

interface CalendarEvent {
  id: string;
  text: string;
  location?: string;
  people?: string[];
  description?: string;
  imageUrl?: string;
  tag?: string;
}

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

function DraggableEvent({
  event,
  slotKey,
  isOverlay,
  isDragging,
  onEditClick,
  onDeleteClick,
  onViewDetails,
}: {
  event: CalendarEvent;
  slotKey?: string;
  isOverlay?: boolean;
  isDragging: boolean;
  onEditClick: (e: React.MouseEvent) => void;
  onDeleteClick: (e: React.MouseEvent) => void;
  onViewDetails: (e: React.MouseEvent) => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: event.id,
    data: { slotKey },
    disabled: isOverlay,
  });

  let style: React.CSSProperties = {
    zIndex: isDragging && !isOverlay ? 9999 : 'auto',
    transform: !isOverlay ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging && !isOverlay ? 0 : 1,
  };
  if (isOverlay) {
    style = { zIndex: 9999 };
  }

  const handleEventClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOverlay) {
      onViewDetails(e);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleEventClick}
      className={`relative flex flex-col p-1 sm:p-2 mb-1 text-sm rounded-lg font-medium text-gray-900 dark:text-gray-100 shadow-sm transition-all duration-200 cursor-pointer
        ${isOverlay
          ? 'bg-teal-500 text-white scale-[1.03]'
          : !isDragging
            ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            : ''
        }
      `}
    >
      <div className="flex justify-between items-start w-full">
        <div
          className="flex-grow cursor-grab overflow-hidden whitespace-nowrap overflow-ellipsis pr-2 font-semibold"
          {...(!isOverlay ? listeners : {})}
          {...(!isOverlay ? attributes : {})}
        >
          {event.text}
          {event.tag && (
            <span className="ml-1 sm:ml-2 px-1 py-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
              {event.tag}
            </span>
          )}
        </div>

        {!isOverlay && (
          <div className="flex items-center gap-1 sm:gap-1.5 pl-1 sm:pl-2 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(e);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="p-1 sm:p-1.5 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
              aria-label="Edit Event"
              title="Edit"
            >
              <FiEdit2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(e);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="p-1 sm:p-1.5 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-red-400 dark:hover:bg-red-500 text-gray-600 dark:text-gray-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Delete Event"
              title="Delete"
            >
              <FiTrash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
          </div>
        )}
      </div>

      {(event.location || event.people?.length || event.description) && (
        <div className="mt-0.5 sm:mt-1 pt-0.5 sm:pt-1 border-t border-gray-200 dark:border-gray-600 text-xs font-normal">
          {event.location && (
            <div className="flex items-center mt-0.5 sm:mt-1">
              <span className="mr-0.5 sm:mr-1">📍</span> {event.location}
            </div>
          )}
          {event.people && event.people.length > 0 && (
            <div className="flex items-center mt-0.5 sm:mt-1">
              <span className="mr-0.5 sm:mr-1">👥</span>
              <span className="truncate">{event.people.join(', ')}</span>
            </div>
          )}
          {event.description && (
            <div className="flex items-start mt-0.5 sm:mt-1 overflow-hidden">
              <span className="mr-0.5 sm:mr-1 flex-shrink-0">📝</span>
              <span className="truncate">{event.description}</span>
            </div>
          )}
          {event.imageUrl && (
            <div className="mt-0.5 sm:mt-1">
              <img
                src={event.imageUrl}
                alt="Event"
                className="h-8 sm:h-12 w-full object-cover rounded opacity-90 mt-0.5 sm:mt-1"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DroppableSlot({
  day,
  hour,
  slotEvents,
  isSelected,
  onClickSlot,
  onEditEvent,
  onDeleteEvent,
  activeDragId,
  isWeekView,
  onViewEventDetails,
}: {
  day: string;
  hour: string;
  colIndex: number;
  slotEvents: CalendarEvent[];
  isSelected: boolean;
  onClickSlot: (key: string) => void;
  onEditEvent: (event: CalendarEvent, key: string) => void;
  onDeleteEvent: (eventId: string, key: string) => void;
  onViewEventDetails: (event: CalendarEvent) => void;
  activeDragId: string | null;
  isWeekView: boolean;
}) {
  const key = `${day}-${hour}`;
  const { setNodeRef, isOver } = useDroppable({
    id: key,
  });

  return (
    <div
      ref={setNodeRef}
      onClick={() => onClickSlot(key)}
      className={`h-20 sm:h-24 ${isWeekView ? 'aspect-[4/3]' : ''} rounded-lg p-1 sm:p-2 overflow-auto transition cursor-pointer
        ${isSelected ? 'ring-2 ring-teal-300 dark:ring-teal-500 border border-teal-400 dark:border-teal-600 bg-teal-50 dark:bg-teal-900/50' : 'bg-gray-50 dark:bg-gray-700'}
        ${isOver ? 'ring-2 ring-teal-400 dark:ring-teal-500 bg-teal-100 dark:bg-teal-700' : ''}
        hover:shadow-sm hover:scale-[1.02] duration-150 ease-in-out
      `}
    >
      {slotEvents.map((evt) => {
        const isCurrentlyDragging = activeDragId === evt.id;
        return (
          <DraggableEvent
            key={evt.id}
            event={evt}
            slotKey={key}
            isDragging={isCurrentlyDragging}
            onEditClick={(e) => {
              e.stopPropagation();
              onEditEvent(evt, key);
            }}
            onDeleteClick={(e) => {
              e.stopPropagation();
              onDeleteEvent(evt.id, key);
            }}
            onViewDetails={(e) => {
              e.stopPropagation();
              onViewEventDetails(evt);
            }}
          />
        );
      })}
    </div>
  );
}

function MonthViewSlot({
  day,
  slotEvents,
  onClickSlot,
  onViewEventDetails,
  isToday,
}: {
  day: string;
  slotEvents: CalendarEvent[];
  onClickSlot: (day: string) => void;
  onViewEventDetails: (event: CalendarEvent) => void;
  isToday: boolean;
}) {
  const { setNodeRef } = useDroppable({
    id: day,
  });

  const sortedEvents = slotEvents.sort((a, b) => {
    const timeA = a.id.split('-')[1] || '00:00';
    const timeB = b.id.split('-')[1] || '00:00';
    return timeA.localeCompare(timeB);
  });

  return (
    <div
      ref={setNodeRef}
      onClick={() => onClickSlot(day)}
      className={`h-24 sm:h-28 p-1 sm:p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer
        ${isToday ? 'ring-2 ring-teal-300 dark:ring-teal-500 bg-teal-50 dark:bg-teal-900/50' : ''}`}
    >
      <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {dayjs(day).format('D')}
      </div>
      <div className="space-y-1 overflow-y-auto max-h-16 sm:max-h-20">
        {sortedEvents.slice(0, 3).map((evt) => (
          <div
            key={evt.id}
            onClick={(e) => {
              e.stopPropagation();
              onViewEventDetails(evt);
            }}
            className="text-xs truncate bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
          >
            {evt.text}
          </div>
        ))}
        {sortedEvents.length > 3 && (
          <div className="text-xs text-teal-600 dark:text-teal-400">+{sortedEvents.length - 3} more</div>
        )}
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [events, setEvents] = useState<{ [key: string]: CalendarEvent[] }>({});
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [eventText, setEventText] = useState('');
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editingEventText, setEditingEventText] = useState('');
  const [modalError, setModalError] = useState<string | null>(null);
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [eventLocation, setEventLocation] = useState('');
  const [eventPeople, setEventPeople] = useState<string[]>([]);
  const [eventDescription, setEventDescription] = useState('');
  const [eventImageUrl, setEventImageUrl] = useState('');
  const [eventTag, setEventTag] = useState('');
  const [newPersonInput, setNewPersonInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [viewingEvent, setViewingEvent] = useState<CalendarEvent | null>(null);

  const displayedDay = currentDate;
  const displayedWeek = Array.from({ length: 7 }, (_, i) =>
    currentDate.startOf('week').add(i, 'day')
  );
  const displayedMonth = (() => {
    const startOfMonth = currentDate.startOf('month').startOf('week');
    const endOfMonth = currentDate.endOf('month').endOf('week');
    const days: Dayjs[] = [];
    let current = startOfMonth;
    while (current.isBefore(endOfMonth) || current.isSame(endOfMonth)) {
      days.push(current);
      current = current.add(1, 'day');
    }
    return days;
  })();
  const daysToDisplay = view === 'day' ? [displayedDay] : view === 'week' ? displayedWeek : displayedMonth;

  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem('timeblocks-events');
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
      }
    } catch (error) {
      console.error('Error loading events from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('timeblocks-events', JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events to localStorage:', error);
    }
  }, [events]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleAddEvent = () => {
    if (!selectedSlot || !eventText.trim()) {
      toast.error('Event title cannot be empty.');
      setModalError('Event title cannot be empty.');
      return;
    }
    setModalError(null);

    const newEvent: CalendarEvent = {
      id: `${selectedSlot}-${Date.now()}-${Math.random()}`,
      text: eventText.trim(),
      location: eventLocation.trim() || undefined,
      people: eventPeople.length > 0 ? [...eventPeople] : undefined,
      description: eventDescription.trim() || undefined,
      imageUrl: eventImageUrl.trim() || undefined,
      tag: eventTag.trim() || undefined,
    };

    setEvents((prev) => ({
      ...prev,
      [selectedSlot]: [...(prev[selectedSlot] || []), newEvent],
    }));
    clearEventForm();
    setSelectedSlot(null);
    toast.success('Event added successfully!');
  };

  const handleEditClick = (event: CalendarEvent, key: string) => {
    setEditingEventId(event.id);
    setEditingEventText(event.text);
    setEventLocation(event.location || '');
    setEventPeople(event.people || []);
    setEventDescription(event.description || '');
    setEventImageUrl(event.imageUrl || '');
    setEventTag(event.tag || '');
    setSelectedSlot(key);
    setModalError(null);
  };

  const handleEditEvent = () => {
    if (!editingEventId || !selectedSlot || !editingEventText.trim()) {
      toast.error('Event title cannot be empty.');
      setModalError('Event title cannot be empty.');
      return;
    }
    setModalError(null);

    setEvents((prev) => {
      const updatedSlotEvents = (prev[selectedSlot] || []).map((event) =>
        event.id === editingEventId
          ? {
            ...event,
            text: editingEventText.trim(),
            location: eventLocation.trim() || undefined,
            people: eventPeople.length > 0 ? [...eventPeople] : undefined,
            description: eventDescription.trim() || undefined,
            imageUrl: eventImageUrl.trim() || undefined,
            tag: eventTag.trim() || undefined,
          }
          : event
      );
      return {
        ...prev,
        [selectedSlot]: updatedSlotEvents,
      };
    });

    clearEventForm();
    setEditingEventId(null);
    setSelectedSlot(null);
    toast.success('Event updated successfully!');
  };

  const handleDeleteEvent = (eventId: string, key: string) => {
    setEvents((prev) => {
      const updatedSlotEvents = (prev[key] || []).filter((event) => event.id !== eventId);
      return {
        ...prev,
        [key]: updatedSlotEvents,
      };
    });
    if (editingEventId === eventId) {
      handleCancel();
    }
    toast.success('Event deleted successfully!');
  };

  const handleCancel = () => {
    setSelectedSlot(null);
    setEditingEventId(null);
    clearEventForm();
    setModalError(null);
  };

  const clearEventForm = () => {
    setEventText('');
    setEditingEventText('');
    setEventLocation('');
    setEventPeople([]);
    setEventDescription('');
    setEventImageUrl('');
    setEventTag('');
    setNewPersonInput('');
  };

  const handlePeopleInputChange = (value: string) => {
    setNewPersonInput(value);
    if (value.includes(',')) {
      const people = value
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);
      if (people.length > 0) {
        setEventPeople([...eventPeople, ...people]);
        setNewPersonInput('');
      }
    }
  };

  const addPerson = () => {
    if (newPersonInput.trim()) {
      setEventPeople([...eventPeople, newPersonInput.trim()]);
      setNewPersonInput('');
    }
  };

  const removePerson = (index: number) => {
    const updatedPeople = [...eventPeople];
    updatedPeople.splice(index, 1);
    setEventPeople(updatedPeople);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrevious = () => {
    const newDate =
      view === 'day'
        ? currentDate.subtract(1, 'day')
        : view === 'week'
          ? currentDate.subtract(1, 'week')
          : currentDate.subtract(1, 'month');
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate =
      view === 'day'
        ? currentDate.add(1, 'day')
        : view === 'week'
          ? currentDate.add(1, 'week')
          : currentDate.add(1, 'month');
    setCurrentDate(newDate);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 15,
      },
    }),
    useSensor(KeyboardSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 15,
      },
    })
  );

  const findEventById = (id: string): CalendarEvent | null => {
    for (const key in events) {
      const found = events[key].find((event) => event.id === id);
      if (found) return found;
    }
    return null;
  };

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const eventData = findEventById(active.id as string);
    setActiveEvent(eventData);
    setActiveDragId(active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveEvent(null);
    setActiveDragId(null);

    if (over && active.id !== over.id) {
      const sourceSlotKey = active.data.current?.slotKey as string;
      const destinationSlotKey = over.id as string;
      const draggedEventId = active.id as string;

      if (!sourceSlotKey || !destinationSlotKey) return;

      setEvents((prevEvents) => {
        if (sourceSlotKey === destinationSlotKey) {
          return prevEvents;
        }

        const sourceEvents = [...(prevEvents[sourceSlotKey] || [])];
        const destinationEvents = [...(prevEvents[destinationSlotKey] || [])];

        const eventIndex = sourceEvents.findIndex((e) => e.id === draggedEventId);
        if (eventIndex === -1) return prevEvents;

        const [movedEvent] = sourceEvents.splice(eventIndex, 1);
        destinationEvents.push(movedEvent);

        return {
          ...prevEvents,
          [sourceSlotKey]: sourceEvents,
          [destinationSlotKey]: destinationEvents,
        };
      });
    }
  }

  const handleSlotClick = (key: string) => {
    if (!editingEventId && !viewingEvent) {
      if (view === 'month') {
        setView('day');
        setCurrentDate(dayjs(key));
      } else {
        setSelectedSlot(key);
        setEventText('');
        setModalError(null);
      }
    }
  };

  const formatHeaderTitle = () => {
    if (view === 'day') {
      return currentDate.format('dddd, MMMM D, YYYY');
    } else if (view === 'week') {
      const startOfWeek = currentDate.startOf('week');
      const endOfWeek = currentDate.endOf('week');
      if (startOfWeek.month() === endOfWeek.month()) {
        return `${startOfWeek.format('MMMM D')} - ${endOfWeek.format('D, YYYY')}`;
      } else {
        return `${startOfWeek.format('MMMM D')} - ${endOfWeek.format('MMMM D, YYYY')}`;
      }
    } else {
      return currentDate.format('MMMM YYYY');
    }
  };

  const isModalOpen = selectedSlot !== null;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = dayjs(e.target.value);
    setCurrentDate(newDate);
  };

  const handleViewEventDetails = (event: CalendarEvent) => {
    setViewingEvent(event);
  };

  const handleCloseEventDetails = () => {
    setViewingEvent(null);
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Toaster position="top-center" reverseOrder={false} />

        <div className="min-h-screen flex flex-col font-inter bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <header className="bg-white dark:bg-gray-800 py-3 px-4 sm:px-6 border-b border-gray-100 dark:border-gray-700">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-teal-500 text-white p-2 rounded-lg">
                  <FiCalendar size={20} />
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">TimeBlocks</h1>
              </div>
            </div>
          </header>

          <main className="flex-grow p-4 sm:p-6 lg:p-8">
            <div className="max-w-[1400px] mx-auto mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevious}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      aria-label="Previous period"
                    >
                      &lt;
                    </button>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                      {formatHeaderTitle()}
                    </h2>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      aria-label="Next period"
                    >
                      &gt;
                    </button>
                  </div>
                  <div className="w-full sm:w-auto">
                    <input
                      type="date"
                      value={currentDate.format('YYYY-MM-DD')}
                      onChange={handleDateChange}
                      className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full sm:w-auto"
                      aria-label="Choose date"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center sm:justify-end">
                  <button
                    onClick={() => setView('day')}
                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition shadow-sm
                      ${view === 'day'
                        ? 'bg-teal-500 text-white'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setView('week')}
                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition shadow-sm
                      ${view === 'week'
                        ? 'bg-teal-500 text-white'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setView('month')}
                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition shadow-sm
                      ${view === 'month'
                        ? 'bg-teal-500 text-white'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                  >
                    Month
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 mx-auto max-w-[1400px] overflow-x-auto">
              {view === 'month' ? (
                <div
                  className="grid grid-cols-7 gap-2 sm:gap-4"
                  style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}
                >
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div
                      key={day}
                      className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 text-center"
                    >
                      {day}
                    </div>
                  ))}
                  {displayedMonth.map((d) => {
                    const dayStr = d.format('YYYY-MM-DD');
                    const slotEvents = Object.keys(events)
                      .filter((key) => key.startsWith(dayStr))
                      .flatMap((key) => events[key]);
                    const isToday = d.isSame(dayjs(), 'day');
                    return (
                      <MonthViewSlot
                        key={dayStr}
                        day={dayStr}
                        slotEvents={slotEvents}
                        onClickSlot={handleSlotClick}
                        onViewEventDetails={handleViewEventDetails}
                        isToday={isToday}
                      />
                    );
                  })}
                </div>
              ) : (
                <div
                  className={`grid ${view === 'week' ? 'min-w-[700px]' : ''}`}
                  style={{
                    gridTemplateColumns:
                      view === 'day'
                        ? '40px minmax(0, 1fr)'
                        : '40px repeat(7, minmax(120px, 1fr))',
                    gap: isMobile ? '8px' : '12px',
                  }}
                >
                  <div />
                  {daysToDisplay.map((d, colIndex) => (
                    <div
                      key={d.format('YYYY-MM-DD')}
                      className="flex items-end justify-start h-10 sm:h-12 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-0 pb-2"
                      style={{ gridColumn: colIndex + 2 }}
                    >
                      {d.format('ddd, MMM D')}
                    </div>
                  ))}
                  {hours.map((hour) => (
                    <React.Fragment key={hour}>
                      <div className="text-xs text-gray-500 dark:text-gray-400 pt-1 text-right pr-1">{hour}</div>
                      {daysToDisplay.map((d, colIndex) => {
                        const dayStr = d.format('YYYY-MM-DD');
                        const key = `${dayStr}-${hour}`;
                        const slotEvents = events[key] || [];
                        const isSelected = selectedSlot === key && !editingEventId;
                        return (
                          <DroppableSlot
                            key={key}
                            day={dayStr}
                            hour={hour}
                            colIndex={colIndex}
                            slotEvents={slotEvents}
                            isSelected={isSelected}
                            onClickSlot={handleSlotClick}
                            onEditEvent={handleEditClick}
                            onDeleteEvent={handleDeleteEvent}
                            onViewEventDetails={handleViewEventDetails}
                            activeDragId={activeDragId}
                            isWeekView={view === 'week'}
                          />
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </main>

          <footer className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-6 px-4 sm:px-6 border-t border-gray-100 dark:border-gray-700">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="bg-teal-500 text-white p-2 rounded-lg">
                      <FiCalendar size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">TimeBlocks</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                    TimeBlocks is a modern calendar application designed to help you manage your schedule effectively.
                    Drag and drop events, set details, and stay organized with our intuitive interface.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-teal-100 dark:hover:bg-teal-600 text-teal-600 dark:text-teal-400 rounded-full transition-colors"
                    >
                      <FiGithub size={18} />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-teal-100 dark:hover:bg-teal-600 text-teal-600 dark:text-teal-400 rounded-full transition-colors"
                    >
                      <FiTwitter size={18} />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-teal-100 dark:hover:bg-teal-600 text-teal-600 dark:text-teal-400 rounded-full transition-colors"
                    >
                      <FiLinkedin size={18} />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-teal-100 dark:hover:bg-teal-600 text-teal-600 dark:text-teal-400 rounded-full transition-colors"
                    >
                      <FiInstagram size={18} />
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                    © {new Date().getFullYear()} TimeBlocks. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center p-4 z-50 font-inter">
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl p-6 w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {editingEventId ? 'Edit Event' : 'Add Event'}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{selectedSlot}</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Event Title*
                    </label>
                    <input
                      value={editingEventId ? editingEventText : eventText}
                      onChange={(e) => {
                        setModalError(null);
                        if (editingEventId) {
                          setEditingEventText(e.target.value);
                        } else {
                          setEventText(e.target.value);
                        }
                      }}
                      placeholder="Event title"
                      className={`w-full px-3 py-2 text-gray-900 dark:text-gray-100 border rounded-md focus:outline-none focus:ring-2 transition
                        ${modalError ? 'border-red-400 dark:border-red-500 ring-red-200 dark:ring-red-700' : 'border-gray-200 dark:border-gray-600 focus:ring-teal-400 dark:focus:ring-teal-500'}
                        bg-white dark:bg-gray-900`}
                      autoFocus
                    />
                    {modalError && (
                      <p className="text-red-500 dark:text-red-400 text-xs mt-1">{modalError}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location
                    </label>
                    <input
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="Add location"
                      className="w-full px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 bg-white dark:bg-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      People Involved
                    </label>
                    <div className="flex space-x-2">
                      <input
                        value={newPersonInput}
                        onChange={(e) => handlePeopleInputChange(e.target.value)}
                        placeholder="Add people"
                        className="flex-grow px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 bg-white dark:bg-gray-900"
                        onKeyPress={(e) => e.key === 'Enter' && addPerson()}
                      />
                      <button
                        onClick={addPerson}
                        className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 dark:hover:bg-teal-400"
                        type="button"
                      >
                        Add
                      </button>
                    </div>
                    {eventPeople.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {eventPeople.map((person, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-teal-100 dark:bg-teal-700 px-3 py-1 rounded-full"
                          >
                            <span className="text-sm text-teal-800 dark:text-teal-200">{person}</span>
                            <button
                              onClick={() => removePerson(index)}
                              className="ml-2 text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200"
                              type="button"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      placeholder="Add description"
                      className="w-full px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 bg-white dark:bg-gray-900"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="w-full px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 bg-white dark:bg-gray-900"
                    />
                    {eventImageUrl && (
                      <div className="mt-2">
                        <img
                          src={eventImageUrl}
                          alt="Event preview"
                          className="h-24 w-auto object-cover rounded-md"
                        />
                        <button
                          onClick={() => setEventImageUrl('')}
                          className="mt-1 text-xs text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                          type="button"
                        >
                          Remove image
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tag
                    </label>
                    <select
                      value={eventTag}
                      onChange={(e) => setEventTag(e.target.value)}
                      className="w-full px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 bg-white dark:bg-gray-900"
                    >
                      <option value="">Select a tag</option>
                      <option value="work">Work</option>
                      <option value="personal">Personal</option>
                      <option value="important">Important</option>
                      <option value="vacation">Vacation</option>
                      <option value="meeting">Meeting</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingEventId ? handleEditEvent : handleAddEvent}
                    className="px-4 py-2 rounded-md text-sm bg-teal-500 text-white hover:bg-teal-600 dark:hover:bg-teal-400"
                  >
                    {editingEventId ? 'Save' : 'Add Event'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {viewingEvent && (
            <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center p-4 z-50 font-inter">
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl max-w-md sm:max-w-lg w-full overflow-hidden">
                <div className="bg-teal-500 p-4 sm:p-6 text-white">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg sm:text-xl font-bold">{viewingEvent.text}</h2>
                    <button
                      onClick={handleCloseEventDetails}
                      className="p-1 sm:p-1.5 hover:bg-teal-600 text-white transition"
                    >
                      ✕
                    </button>
                  </div>
                  {viewingEvent.tag && (
                    <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-teal-600 text-white">
                      {viewingEvent.tag}
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
                  {viewingEvent.location && (
                    <div className="flex items-start mb-4">
                      <span className="text-lg mr-3 text-teal-500">📍</span>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</h3>
                        <p className="text-base text-gray-900 dark:text-gray-100">{viewingEvent.location}</p>
                      </div>
                    </div>
                  )}

                  {viewingEvent.people && viewingEvent.people.length > 0 && (
                    <div className="flex items-start mb-4">
                      <span className="text-lg mr-3 text-teal-500">👥</span>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">People</h3>
                        <p className="text-base text-gray-900 dark:text-gray-100">{viewingEvent.people.join(', ')}</p>
                      </div>
                    </div>
                  )}

                  {viewingEvent.description && (
                    <div className="flex items-start mb-4">
                      <span className="text-lg mr-3 text-teal-500">📝</span>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</h3>
                        <p className="text-base text-gray-900 dark:text-gray-100 whitespace-pre-line">
                          {viewingEvent.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {viewingEvent.imageUrl && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Image</h3>
                      <img
                        src={viewingEvent.imageUrl}
                        alt="Event"
                        className="w-full h-auto rounded-lg object-cover max-h-48"
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      handleCloseEventDetails();
                      for (const key in events) {
                        const eventInSlot = events[key].find((e) => e.id === viewingEvent.id);
                        if (eventInSlot) {
                          handleEditClick(eventInSlot, key);
                          break;
                        }
                      }
                    }}
                    className="px-4 py-2 bg-teal-100 dark:bg-teal-700 text-teal-600 dark:text-teal-200 rounded-md hover:bg-teal-200 dark:hover:bg-teal-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleCloseEventDetails}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeEvent ? (
            <DraggableEvent
              event={activeEvent}
              isOverlay
              isDragging={true}
              onEditClick={() => { }}
              onDeleteClick={() => { }}
              onViewDetails={() => { }}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      <style jsx>{`
        :global(html) {
          font-family: 'Inter', 'Roboto', sans-serif;
        }
        .calendar-scrollbar-hide {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }
        .calendar-scrollbar-hide::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
      `}</style>
    </>
  );
}