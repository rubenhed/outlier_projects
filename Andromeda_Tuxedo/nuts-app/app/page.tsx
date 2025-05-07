"use client";

import { useState } from 'react';

type Nut = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type NutCardProps = {
  nut: Nut;
  favorites: number[];
  toggleFavorite: (id: number) => void;
};


const nuts: Nut[] = [
  { id: 1, name: 'Peanuts', price: 5.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMr-hRAva6p55_kV6L28cBjnbKulWFms6blg&s' },
  { id: 2, name: 'Walnuts', price: 7.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWnE_XMTjv2j9PxiYBkXSV9-T07tXB4DmVpA&s' },
  { id: 3, name: 'Almonds', price: 6.99, image: 'https://www.health.com/thmb/xklPFBrlPpwcHND_ov5EZwLHAwc=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/almonds-GettyImages-683814187-2000-44a06e730fac4c60a10cbb5f9642b589.jpg' },
  { id: 4, name: 'Cashews', price: 8.99, image: 'https://assets.clevelandclinic.org/transform/ec440b31-4766-4167-81b5-fb4eece02c16/cashews-511301902' },
  { id: 5, name: 'Pecans', price: 9.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpmrbCakiNhA3sSQUcy_vQmNIc8fv65ptvCA&s' },
  { id: 6, name: 'Hazelnuts', price: 10.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0bY0qZHFrBcP75EtZmhEbL8XH-f9q0Mus1w&s' },
  { id: 7, name: 'Pistachios', price: 11.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXAr_rHQimf41erbvRogOml3dupLi-MWphg&s' },
  { id: 8, name: 'Macadamia Nuts', price: 12.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb26DXyGchynjCOXF8kiu-lSuGXhfwvm13Qg&s' },
];

const NutCard = ({ nut, favorites, toggleFavorite }: NutCardProps) => {
  const isFavorite = favorites.includes(nut.id);

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-4">
      <div className="relative bg-[#fdf6f0] rounded-2xl shadow-lg p-4 pb-0 border border-[#d8bfa6]">

        <button
          onClick={() => toggleFavorite(nut.id)}
          className="absolute top-3 right-3 text-2xl"
        >
          {isFavorite ? '❤️' : '🖤'}
        </button>

        <div className="flex justify-center mb-4">
          <img
            src={nut.image}
            alt={nut.name}
            className="w-24 h-24 object-cover rounded-full border-4 border-[#c69c6d]"
          />
        </div>
        <h2 className="text-xl font-semibold text-[#5e3b1f] mb-2 text-center">{nut.name}</h2>
        <p className="text-[#7c5e42] mb-4 text-center">${nut.price.toFixed(2)}</p>
      </div>
    </div>

  );
};

const App = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };
  

  return (
    <div className="min-h-screen bg-[#fffaf5] p-6">
      <h1 className="text-4xl font-bold text-center text-[#4b2e18] mb-10">Nuts for Sale</h1>
      <div className="flex flex-wrap justify-center -mx-4">
        {nuts.map((nut) => (
          <NutCard key={nut.id} nut={nut} favorites={favorites} toggleFavorite={toggleFavorite} />
        ))}
      </div>
    </div>
  );
};

export default App;
