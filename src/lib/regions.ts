export interface RegionData {
  id: string;
  name: string;
  fullName: string;
  status: "active" | "soon";
  center: [number, number];
  zoom: number;
  stats: {
    affectedSchools: number;
    activeDisruptions: string;
    riskLevel: "High" | "Moderate" | "Low";
  };
}

export const REGIONS: RegionData[] = [
  { id: "ncr", name: "NCR", fullName: "National Capital Region", status: "soon", center: [14.5995, 120.9842], zoom: 12, stats: { affectedSchools: 12, activeDisruptions: "Habagat", riskLevel: "Moderate" } },
  { id: "car", name: "CAR", fullName: "Cordillera Administrative Region", status: "soon", center: [17.3513, 121.1718], zoom: 10, stats: { affectedSchools: 0, activeDisruptions: "Wala", riskLevel: "Low" } },
  { id: "1", name: "Region I", fullName: "Ilocos Region", status: "soon", center: [16.6159, 120.3167], zoom: 10, stats: { affectedSchools: 5, activeDisruptions: "Heavy Rainfall", riskLevel: "Low" } },
  { id: "2", name: "Region II", fullName: "Cagayan Valley", status: "soon", center: [17.6148, 121.7269], zoom: 10, stats: { affectedSchools: 8, activeDisruptions: "Heavy Rainfall", riskLevel: "Moderate" } },
  { id: "3", name: "Region III", fullName: "Central Luzon", status: "soon", center: [15.4828, 120.7120], zoom: 10, stats: { affectedSchools: 24, activeDisruptions: "Baha", riskLevel: "High" } },
  { id: "4a", name: "Region IV-A", fullName: "CALABARZON", status: "soon", center: [14.1008, 121.0794], zoom: 10, stats: { affectedSchools: 2, activeDisruptions: "Localized Thunderstorms", riskLevel: "Low" } },
  { id: "mimaropa", name: "MIMAROPA", fullName: "Southwestern Tagalog Region", status: "soon", center: [10.4578, 119.3857], zoom: 10, stats: { affectedSchools: 0, activeDisruptions: "Wala", riskLevel: "Low" } },
  { id: "5", name: "Region V", fullName: "Bicol Region", status: "active", center: [13.25, 123.55], zoom: 10, stats: { affectedSchools: 38, activeDisruptions: "Bagyong Aghon", riskLevel: "High" } },
  { id: "6", name: "Region VI", fullName: "Western Visayas", status: "soon", center: [11.0050, 122.5373], zoom: 10, stats: { affectedSchools: 0, activeDisruptions: "Wala", riskLevel: "Low" } },
  { id: "7", name: "Region VII", fullName: "Central Visayas", status: "soon", center: [10.3157, 123.8854], zoom: 10, stats: { affectedSchools: 4, activeDisruptions: "Power Outage", riskLevel: "Low" } },
  { id: "8", name: "Region VIII", fullName: "Eastern Visayas", status: "soon", center: [11.9686, 125.0135], zoom: 10, stats: { affectedSchools: 15, activeDisruptions: "LPA", riskLevel: "Moderate" } },
  { id: "9", name: "Region IX", fullName: "Zamboanga Peninsula", status: "soon", center: [8.1541, 123.2573], zoom: 10, stats: { affectedSchools: 0, activeDisruptions: "Wala", riskLevel: "Low" } },
  { id: "10", name: "Region X", fullName: "Northern Mindanao", status: "soon", center: [8.4772, 124.6459], zoom: 10, stats: { affectedSchools: 0, activeDisruptions: "Wala", riskLevel: "Low" } },
  { id: "11", name: "Region XI", fullName: "Davao Region", status: "soon", center: [7.1907, 125.4553], zoom: 10, stats: { affectedSchools: 42, activeDisruptions: "Baha at Landslide", riskLevel: "High" } },
  { id: "12", name: "Region XII", fullName: "SOCCSKSARGEN", status: "soon", center: [6.2711, 124.6974], zoom: 10, stats: { affectedSchools: 0, activeDisruptions: "Wala", riskLevel: "Low" } },
  { id: "13", name: "Region XIII", fullName: "Caraga", status: "soon", center: [8.8152, 125.7533], zoom: 10, stats: { affectedSchools: 3, activeDisruptions: "LPA", riskLevel: "Low" } },
  { id: "barmm", name: "BARMM", fullName: "Bangsamoro", status: "soon", center: [7.2144, 124.2445], zoom: 10, stats: { affectedSchools: 0, activeDisruptions: "Wala", riskLevel: "Low" } },
];
