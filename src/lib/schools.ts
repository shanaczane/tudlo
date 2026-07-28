export type SchoolStatus =
  | "Nahuhuli"
  | "Medyo nahuhuli"
  | "Na-recover"
  | "Walang naitalang disruption";

export interface School {
  id: string;
  name: string;
  division: string;
  type: string;
  days: number;
  status: SchoolStatus;
  action: string;
  lat: number;
  lng: number;
}

export const DIVISIONS = ["Albay", "Sorsogon", "Camarines Sur", "Catanduanes"] as const;

export const BICOL_CENTER: [number, number] = [13.42, 123.6];
export const BICOL_ZOOM = 8;

export const statusStyles: Record<SchoolStatus, string> = {
  Nahuhuli: "bg-danger-bg text-danger",
  "Medyo nahuhuli": "bg-warning-bg text-warning-ink",
  "Na-recover": "bg-tint text-brand",
  "Walang naitalang disruption": "bg-[#F0F1F4] text-muted",
};

/** Marker color bucketed by days lost, matching the map legend. */
export function severityColor(days: number): string {
  if (days >= 8) return "#CE1126";
  if (days >= 4) return "#E8823A";
  if (days >= 1) return "#FCD116";
  return "#B6BCC7";
}

export const schools: School[] = [
  {
    id: "bacacay-central-es",
    name: "Bacacay Central ES",
    division: "Albay",
    type: "Bagyo",
    days: 14,
    status: "Nahuhuli",
    action: "Karagdagang guro",
    lat: 13.2865,
    lng: 123.7729,
  },
  {
    id: "malilipot-es",
    name: "Malilipot ES",
    division: "Albay",
    type: "Bagyo",
    days: 11,
    status: "Nahuhuli",
    action: "Aprubal sa extension",
    lat: 13.3634,
    lng: 123.7239,
  },
  {
    id: "legazpi-city-central-es",
    name: "Legazpi City Central ES",
    division: "Albay",
    type: "Bagyo",
    days: 9,
    status: "Nahuhuli",
    action: "Karagdagang guro",
    lat: 13.1391,
    lng: 123.7438,
  },
  {
    id: "tabaco-city-es",
    name: "Tabaco City ES",
    division: "Albay",
    type: "Bagyo",
    days: 6,
    status: "Medyo nahuhuli",
    action: "Sundan sa susunod na linggo",
    lat: 13.3568,
    lng: 123.7333,
  },
  {
    id: "daraga-es",
    name: "Daraga ES",
    division: "Albay",
    type: "Bagyo",
    days: 5,
    status: "Medyo nahuhuli",
    action: "Sundan sa susunod na linggo",
    lat: 13.1517,
    lng: 123.6864,
  },
  {
    id: "sorsogon-east-es",
    name: "Sorsogon East ES",
    division: "Sorsogon",
    type: "Baha",
    days: 6,
    status: "Medyo nahuhuli",
    action: "Sundan sa susunod na linggo",
    lat: 12.9743,
    lng: 124.0058,
  },
  {
    id: "naga-city-es-ii",
    name: "Naga City ES II",
    division: "Camarines Sur",
    type: "Bagyo",
    days: 3,
    status: "Na-recover",
    action: "Wala",
    lat: 13.6218,
    lng: 123.1948,
  },
  {
    id: "iriga-city-es",
    name: "Iriga City ES",
    division: "Camarines Sur",
    type: "Bagyo",
    days: 2,
    status: "Na-recover",
    action: "Wala",
    lat: 13.4174,
    lng: 123.4131,
  },
  {
    id: "catanduanes-north-es",
    name: "Catanduanes North ES",
    division: "Catanduanes",
    type: "—",
    days: 0,
    status: "Walang naitalang disruption",
    action: "Wala",
    lat: 13.9613,
    lng: 124.232,
  },
  {
    id: "san-andres-es",
    name: "San Andres ES",
    division: "Catanduanes",
    type: "—",
    days: 0,
    status: "Walang naitalang disruption",
    action: "Wala",
    lat: 13.9911,
    lng: 124.1503,
  },
];
