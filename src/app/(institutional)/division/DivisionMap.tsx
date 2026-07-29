"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import Link from "next/link";
import {
  BICOL_CENTER,
  BICOL_ZOOM,
  severityColor,
  statusStyles,
  type School,
} from "@/lib/schools";
import { useLocale } from "@/lib/i18n/LocaleContext";

const iconCache = new Map<string, L.DivIcon>();

function getIcon(color: string, active: boolean, faded: boolean): L.DivIcon {
  const key = `${color}-${active}-${faded}`;
  const cached = iconCache.get(key);
  if (cached) return cached;

  const size = active ? 26 : 20;
  const opacityStyle = faded ? "opacity:0.25; filter:grayscale(1);" : "";
  const icon = L.divIcon({
    className: "",
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:9999px;background:${color};border:2px solid #fff;box-shadow:0 1px 4px rgba(28,35,51,.4)${
      active ? ";outline:3px solid #0038A8;outline-offset:1px" : ""
    };${opacityStyle}"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 2],
    tooltipAnchor: [0, -size / 2],
  });
  iconCache.set(key, icon);
  return icon;
}

function MapController({
  schools,
  selectedSchoolId,
  focusDivision,
}: {
  schools: School[];
  selectedSchoolId: string | null;
  focusDivision: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedSchoolId) {
      const school = schools.find((s) => s.id === selectedSchoolId);
      if (school) {
        map.flyTo([school.lat, school.lng], 12, { duration: 0.75 });
      }
      return;
    }
    if (focusDivision) {
      const matches = schools.filter((s) => s.division === focusDivision);
      if (matches.length === 1) {
        map.flyTo([matches[0].lat, matches[0].lng], 12, { duration: 0.75 });
      } else if (matches.length > 1) {
        const bounds = L.latLngBounds(matches.map((s) => [s.lat, s.lng]));
        map.flyToBounds(bounds, { padding: [48, 48], duration: 0.75 });
      }
    } else {
      map.flyTo(BICOL_CENTER, BICOL_ZOOM, { duration: 0.75 });
    }
  }, [map, schools, selectedSchoolId, focusDivision]);

  return null;
}

interface DivisionMapProps {
  schools: School[];
  selectedSchoolId: string | null;
  onSelectSchool: (id: string) => void;
  focusDivision: string | null;
  disruptionFilter: string;
}

export default function DivisionMap({
  schools: schoolList,
  selectedSchoolId,
  onSelectSchool,
  focusDivision,
  disruptionFilter,
}: DivisionMapProps) {
  const { t } = useLocale();
  const [scrollZoomEnabled, setScrollZoomEnabled] = useState(false);

  return (
    <div
      className="h-72 w-full overflow-hidden rounded-card border border-border md:h-105"
      onMouseEnter={() => setScrollZoomEnabled(true)}
      onMouseLeave={() => setScrollZoomEnabled(false)}
    >
      <MapContainer
        center={BICOL_CENTER}
        zoom={BICOL_ZOOM}
        scrollWheelZoom={scrollZoomEnabled}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController
          schools={schoolList}
          selectedSchoolId={selectedSchoolId}
          focusDivision={focusDivision}
        />
        {schoolList.map((school) => {
          const isFaded = disruptionFilter !== "lahat" && (!school.type || school.type.toLowerCase() !== disruptionFilter);
          return (
            <Marker
              key={school.id}
              position={[school.lat, school.lng]}
              icon={getIcon(severityColor(school.days), school.id === selectedSchoolId, isFaded)}
              eventHandlers={{ click: () => onSelectSchool(school.id) }}
            >
            <Tooltip direction="top" offset={[0, -4]}>
              <span className="font-semibold">{school.name}</span> · {school.days} {t.divisionDashboard.tableHeaders.days.toLowerCase()}
            </Tooltip>
            <Popup>
              <div className="flex min-w-40 flex-col gap-1 text-sm">
                <span className="font-semibold text-ink">{school.name}</span>
                <span className="text-muted">{school.division} {t.divisionDashboard.divisionLabel}</span>
                <span className="text-muted">{t.divisionDashboard.tableHeaders.type}: {school.type ? t.reasons[school.type] : "—"}</span>
                <span className="text-muted">{school.days} {t.divisionDashboard.daysLostSuffix}</span>
                <span
                  className={`inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyles[school.status]}`}
                >
                  {school.status}
                </span>
                <Link
                  href={`/division/school/${school.id}`}
                  className="mt-1 font-semibold text-brand hover:text-link-hover"
                >
                  {t.divisionDashboard.viewDetails}
                </Link>
              </div>
            </Popup>
          </Marker>
        )})}
      </MapContainer>
    </div>
  );
}
