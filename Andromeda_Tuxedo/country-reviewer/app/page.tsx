"use client";

import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Country {
  id: number;
  name: string;
  easeOfLiving: number;
  safety: number;
  welfare: number;
  comments: string[];
}

function SortableItem({
  country,
  onComment,
}: {
  country: Country;
  onComment: (id: number, comment: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: country.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const [newComment, setNewComment] = useState("");

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border rounded-lg shadow-lg p-6 mb-6 bg-yellow-50"
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          {country.name}
        </h2>
      </div>
      <p className="text-gray-800">Ease of Living: {country.easeOfLiving}/10</p>
      <p className="text-gray-800">Safety: {country.safety}/10</p>
      <p className="text-gray-800">Welfare: {country.welfare}/10</p>

      <div className="mt-4">
        <h3 className="font-semibold text-lg text-gray-800">Comments:</h3>
        <ul className="mb-3 list-disc list-inside">
          {country.comments.map((c, i) => (
            <li key={i} className="text-gray-600">{c}</li>
          ))}
        </ul>
        <textarea
          className="w-full p-3 border rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (newComment.trim()) {
                onComment(country.id, newComment);
                setNewComment("");
              }
            }
          }}
          placeholder="Add a comment (press Enter to submit)"
        />

        <button
          className="mt-3 px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
          onClick={() => {
            if (newComment.trim()) {
              onComment(country.id, newComment);
              setNewComment("");
            }
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([
    {
      id: 1,
      name: "England🇬🇧",
      easeOfLiving: 7,
      safety: 8,
      welfare: 8,
      comments: [],
    },
    {
      id: 2,
      name: "Japan🇯🇵",
      easeOfLiving: 8,
      safety: 9,
      welfare: 7,
      comments: [],
    },
    {
      id: 3,
      name: "France🇫🇷",
      easeOfLiving: 6,
      safety: 7,
      welfare: 7,
      comments: ["Love the culture!", "Amazing food and history."],
    },
    {
      id: 4,
      name: "Germany🇩🇪",
      easeOfLiving: 8,
      safety: 8,
      welfare: 9,
      comments: ["Great public services.", "Efficient transportation system."],
    },
  ]);

  const handleComment = (id: number, comment: string) => {
    if (comment.trim()) {
      setCountries((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, comments: [...c.comments, comment] } : c
        )
      );
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = countries.findIndex((c) => c.id === active.id);
      const newIndex = countries.findIndex((c) => c.id === over?.id);
      setCountries(arrayMove(countries, oldIndex, newIndex));
    }
  };

  return (
    <div className="bg-amber-100">
      <main className="p-6 max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-800 mb-6">Country Review Site</h1>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={countries.map((c) => c.id)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {countries.map((country) => (
                <SortableItem
                  key={country.id}
                  country={country}
                  onComment={handleComment}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </main>
    </div>
  );
}
