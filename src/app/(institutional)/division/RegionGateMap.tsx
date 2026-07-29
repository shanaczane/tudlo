"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import type { RegionData } from "@/lib/regions";
import { REGIONS } from "@/lib/regions";

const iconCache = new Map<string, L.DivIcon>();

function getRegionIcon(active: boolean): L.DivIcon {
  const key = `region-${active}`;
  const cached = iconCache.get(key);
  if (cached) return cached;

  const size = active ? 36 : 28;
  const color = active ? "#0038A8" : "#6B7280"; // Brand color or muted
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="${size}" height="${size}" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3" fill="#fff"></circle>
    </svg>
  `;
  
  const icon = L.divIcon({
    className: "bg-transparent border-none",
    html: svg,
    iconSize: [size, size],
    iconAnchor: [size / 2, size], // anchor at the bottom tip of the pin
  });
  
  iconCache.set(key, icon);
  return icon;
}

function MapController({ selectedRegionId }: { selectedRegionId: string }) {
  const map = useMap();

  useEffect(() => {
    const region = REGIONS.find((r) => r.id === selectedRegionId);
    if (region) {
      map.flyTo(region.center, region.zoom, { duration: 1.5 });
    }
  }, [map, selectedRegionId]);

  return null;
}

export default function RegionGateMap({ selectedRegionId }: { selectedRegionId: string }) {
  const [scrollZoomEnabled, setScrollZoomEnabled] = useState(false);
  const currentRegion = REGIONS.find((r) => r.id === selectedRegionId) || REGIONS[0];

  return (
    <div
      className="h-full w-full overflow-hidden rounded-card border border-border"
      onMouseEnter={() => setScrollZoomEnabled(true)}
      onMouseLeave={() => setScrollZoomEnabled(false)}
    >
      <MapContainer
        center={currentRegion.center}
        zoom={currentRegion.zoom}
        scrollWheelZoom={scrollZoomEnabled}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController selectedRegionId={selectedRegionId} />
        <Marker 
          position={currentRegion.center} 
          icon={getRegionIcon(currentRegion.status === "active")} 
        />
      </MapContainer>
    </div>
  );
}
