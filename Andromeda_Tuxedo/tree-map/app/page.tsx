"use client";

import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const treeCuttingData = [
  { id: 1, location: [51.505, -0.09], treesCut: 100, materialExtracted: "500 tons", costOfExtraction: "$10000" },
  { id: 2, location: [51.507, -0.08], treesCut: 50, materialExtracted: "200 tons", costOfExtraction: "$5000" },
  { id: 3, location: [51.509, -0.07], treesCut: 200, materialExtracted: "800 tons", costOfExtraction: "$20000" },
];

function TreeCuttingMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    if (mapContainer.current && !map) {
      const mapInstance = L.map(mapContainer.current).setView([51.505, -0.09], 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);
  
      setMap(mapInstance);
    }
  
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);
  

  useEffect(() => {
    if (map) {
      treeCuttingData.forEach((tree) => {

        const circle = L.circle(tree.location, {
          radius: 200,  
          color: 'orange', 
          fillColor: 'orange', 
          fillOpacity: 0.7,  
          weight: 2,
        }).addTo(map);

        circle.bindPopup(`
          <div class="p-3 rounded-lg shadow-lg" style="background-color: #f4f1ee;">
            <h2 class="text-base font-bold mb-1 text-green-700">🌲 Tree Cutting Location ${tree.id}</h2>
            <p class="text-sm text-amber-900">Trees cut: <span class="font-semibold">${tree.treesCut}</span></p>
            <p class="text-sm text-amber-900">Material: <span class="font-semibold">${tree.materialExtracted}</span></p>
            <p class="text-sm text-amber-900">Cost: <span class="font-semibold">${tree.costOfExtraction}</span></p>
          </div>
        `);
        
      });
    }
  }, [map]); 

  return (
    <div className="h-screen w-screen p-4">
      <div ref={mapContainer} style={{ height: '80vh', width: '100%' }}></div>
    </div>
  );
}

export default TreeCuttingMap;