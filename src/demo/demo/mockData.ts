// ========== EXISTING MOCK DATA ==========
export const MOCK_KPIS = [
  { title: "Tonelaje Total Movido", value: "14,520 tn", unit: "", trend: "+5.2%", color: "border-l-blue-500" },
  { title: "Viajes de Camiones", value: "342", unit: "viajes", trend: "+2.1%", color: "border-l-green-500" },
  { title: "Consumo de Combustible", value: "2,400", unit: "L", trend: "-1.5%", color: "border-l-yellow-500" },
  { title: "Tiempos de Ciclo Promedio", value: "45", unit: "min", trend: "-3.2%", color: "border-l-purple-500" },
];

export const MOCK_CHART_DATA = {
  categories: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
  series: [
    { name: "TPA (Toneladas por Hora)", data: [850, 920, 1100, 1050, 980, 890, 750], color: "#ff5556", type: "spline" },
    { name: "Objetivo TPA", data: [900, 900, 900, 900, 900, 900, 900], color: "#d4d4d8", type: "line", dashStyle: "Dash" }
  ]
};

export const MOCK_TRUCK_STATUS = [
  { id: "TRK-01", status: "Operativo", speed: "42 km/h", operator: "Juan Pérez" },
  { id: "TRK-02", status: "Cargando", speed: "0 km/h", operator: "Luis Gómez" },
  { id: "TRK-03", status: "Mantenimiento", speed: "0 km/h", operator: "--" },
  { id: "TRK-04", status: "Operativo", speed: "38 km/h", operator: "Carlos Ruiz" },
  { id: "TRK-05", status: "Descargando", speed: "5 km/h", operator: "Ana Torres" },
];

export const MOCK_TRACKING_POINTS = [
  { id: 1, lat: -6.040, lng: -80.860, element: "TRK-01" },
  { id: 2, lat: -6.045, lng: -80.850, element: "TRK-02" },
  { id: 3, lat: -6.048, lng: -80.864, element: "TRK-04" },
  { id: 4, lat: -6.042, lng: -80.868, element: "TRK-05" },
];

// ========== NEW: TRUCK DASHBOARD DATA ==========
export const MOCK_TRUCK_TRIP_DATA = [
  // C-204 (Azul claro - Spline)
  { date: "15/02", unit: "C-204", ratio: 45.2, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "16/02", unit: "C-204", ratio: 41.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "17/02", unit: "C-204", ratio: 41.8, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "18/02", unit: "C-204", ratio: 31.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "19/02", unit: "C-204", ratio: 32.2, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "20/02", unit: "C-204", ratio: 38.6, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "21/02", unit: "C-204", ratio: 42.1, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "22/02", unit: "C-204", ratio: 42.8, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "23/02", unit: "C-204", ratio: 43.1, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "24/02", unit: "C-204", ratio: 41.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "25/02", unit: "C-204", ratio: 40.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "26/02", unit: "C-204", ratio: 40.8, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "27/02", unit: "C-204", ratio: 47.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "28/02", unit: "C-204", ratio: 43.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "01/03", unit: "C-204", ratio: 41.8, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "02/03", unit: "C-204", ratio: 42.1, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "03/03", unit: "C-204", ratio: 38.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },

  // C-203 (Rosado claro - Spline)
  { date: "15/02", unit: "C-203", ratio: 44.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "16/02", unit: "C-203", ratio: 43.8, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "17/02", unit: "C-203", ratio: 38.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "18/02", unit: "C-203", ratio: 41.0, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "19/02", unit: "C-203", ratio: 43.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "20/02", unit: "C-203", ratio: 49.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "21/02", unit: "C-203", ratio: 42.0, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "22/02", unit: "C-203", ratio: 40.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "23/02", unit: "C-203", ratio: 41.2, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "24/02", unit: "C-203", ratio: 43.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "25/02", unit: "C-203", ratio: 44.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "26/02", unit: "C-203", ratio: 41.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "27/02", unit: "C-203", ratio: 34.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "28/02", unit: "C-203", ratio: 46.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "01/03", unit: "C-203", ratio: 40.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "02/03", unit: "C-203", ratio: 37.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "03/03", unit: "C-203", ratio: 40.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },

  // C-201 (Verde claro - Spline)
  { date: "15/02", unit: "C-201", ratio: 37.2, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "16/02", unit: "C-201", ratio: 39.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "17/02", unit: "C-201", ratio: 43.8, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "18/02", unit: "C-201", ratio: 44.1, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "19/02", unit: "C-201", ratio: 42.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "20/02", unit: "C-201", ratio: 46.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "21/02", unit: "C-201", ratio: 40.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "22/02", unit: "C-201", ratio: 38.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "23/02", unit: "C-201", ratio: 39.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "24/02", unit: "C-201", ratio: 34.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "25/02", unit: "C-201", ratio: 38.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "26/02", unit: "C-201", ratio: 37.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "27/02", unit: "C-201", ratio: 41.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "28/02", unit: "C-201", ratio: 41.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "01/03", unit: "C-201", ratio: 49.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "02/03", unit: "C-201", ratio: 40.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  // C-205 (Azul oscuro / Negro)
  { date: "15/02", unit: "C-205", ratio: 41.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "16/02", unit: "C-205", ratio: 41.2, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "17/02", unit: "C-205", ratio: 42.1, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "18/02", unit: "C-205", ratio: 38.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "19/02", unit: "C-205", ratio: 39.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "20/02", unit: "C-205", ratio: 42.1, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "21/02", unit: "C-205", ratio: 41.0, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "22/02", unit: "C-205", ratio: 41.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "23/02", unit: "C-205", ratio: 40.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "24/02", unit: "C-205", ratio: 41.2, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "25/02", unit: "C-205", ratio: 39.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "26/02", unit: "C-205", ratio: 40.8, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "27/02", unit: "C-205", ratio: 44.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "28/02", unit: "C-205", ratio: 41.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "01/03", unit: "C-205", ratio: 40.8, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "02/03", unit: "C-205", ratio: 38.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "03/03", unit: "C-205", ratio: 36.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },

  // C-202 (Gris Oscuro - Spline)
  { date: "15/02", unit: "C-202", ratio: 45.0, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "16/02", unit: "C-202", ratio: 42.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "17/02", unit: "C-202", ratio: 38.8, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "18/02", unit: "C-202", ratio: 40.1, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "19/02", unit: "C-202", ratio: 44.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "20/02", unit: "C-202", ratio: 49.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "21/02", unit: "C-202", ratio: 43.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "22/02", unit: "C-202", ratio: 40.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "23/02", unit: "C-202", ratio: 41.2, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "24/02", unit: "C-202", ratio: 44.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "25/02", unit: "C-202", ratio: 44.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "26/02", unit: "C-202", ratio: 40.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "27/02", unit: "C-202", ratio: 46.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "28/02", unit: "C-202", ratio: 41.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "01/03", unit: "C-202", ratio: 37.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "02/03", unit: "C-202", ratio: 39.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
  { date: "03/03", unit: "C-202", ratio: 42.5, route: "Ruta_1", shift: "D", fuel: 0, distanceM: 0, durationInMin: 0, tonnage: 0, avgSpeed: 0, operator: "" },
];

// ========== NEW: TEMPORAL SUMMARY DATA ==========
export const MOCK_TEMPORAL_SUMMARY = [
  {
    date: "2024-01-10", resumeData: [
      { Grouping: "CAM-101", fuel: 120, distance_m: 85000, engineHour: 8.5 },
      { Grouping: "CAM-102", fuel: 135, distance_m: 92000, engineHour: 9.2 },
      { Grouping: "CAM-103", fuel: 98, distance_m: 78000, engineHour: 7.8 },
    ]
  },
  {
    date: "2024-01-11", resumeData: [
      { Grouping: "CAM-101", fuel: 115, distance_m: 82000, engineHour: 8.2 },
      { Grouping: "CAM-102", fuel: 128, distance_m: 88000, engineHour: 8.8 },
      { Grouping: "CAM-103", fuel: 105, distance_m: 80000, engineHour: 8.0 },
    ]
  },
  {
    date: "2024-01-12", resumeData: [
      { Grouping: "CAM-101", fuel: 130, distance_m: 90000, engineHour: 9.0 },
      { Grouping: "CAM-102", fuel: 142, distance_m: 95000, engineHour: 9.5 },
    ]
  },
  {
    date: "2024-01-13", resumeData: [
      { Grouping: "CAM-101", fuel: 110, distance_m: 80000, engineHour: 8.0 },
      { Grouping: "CAM-103", fuel: 95, distance_m: 75000, engineHour: 7.5 },
    ]
  },
  {
    date: "2024-01-14", resumeData: [
      { Grouping: "CAM-101", fuel: 125, distance_m: 87000, engineHour: 8.7 },
      { Grouping: "CAM-102", fuel: 138, distance_m: 91000, engineHour: 9.1 },
      { Grouping: "CAM-103", fuel: 102, distance_m: 79000, engineHour: 7.9 },
    ]
  },
  {
    date: "2024-01-15", resumeData: [
      { Grouping: "CAM-101", fuel: 118, distance_m: 84000, engineHour: 8.4 },
      { Grouping: "CAM-102", fuel: 132, distance_m: 89000, engineHour: 8.9 },
    ]
  },
  {
    date: "2024-01-16", resumeData: [
      { Grouping: "CAM-101", fuel: 122, distance_m: 86000, engineHour: 8.6 },
      { Grouping: "CAM-102", fuel: 140, distance_m: 93000, engineHour: 9.3 },
      { Grouping: "CAM-103", fuel: 108, distance_m: 81000, engineHour: 8.1 },
    ]
  },
];

// ========== NEW: OPERATOR PERFORMANCE DATA ==========
export const MOCK_OPERATOR_PERFORMANCE = [
  { name: "Juan Pérez", unit: "CAM-101", avgSpeed: 32.5, efficiency: 14.2, totalDist: 285, totalTime: 9.5, idleTime: 1.2, idlePercent: 12.6, totalFuel: 134.9 },
  { name: "Luis Gómez", unit: "CAM-102", avgSpeed: 28.3, efficiency: 15.8, totalDist: 250, totalTime: 8.8, idleTime: 1.8, idlePercent: 20.4, totalFuel: 139.0 },
  { name: "Carlos Ruiz", unit: "CAM-103", avgSpeed: 35.1, efficiency: 12.5, totalDist: 310, totalTime: 10.2, idleTime: 0.8, idlePercent: 7.8, totalFuel: 127.5 },
  { name: "Ana Torres", unit: "CAM-104", avgSpeed: 30.2, efficiency: 13.8, totalDist: 268, totalTime: 9.0, idleTime: 1.5, idlePercent: 16.7, totalFuel: 124.2 },
  { name: "Pedro Díaz", unit: "CAM-105", avgSpeed: 33.8, efficiency: 13.1, totalDist: 295, totalTime: 9.8, idleTime: 0.9, idlePercent: 9.2, totalFuel: 128.4 },
  { name: "María López", unit: "CAM-101", avgSpeed: 31.5, efficiency: 14.9, totalDist: 275, totalTime: 9.2, idleTime: 1.4, idlePercent: 15.2, totalFuel: 137.1 },
  { name: "Roberto Sánchez", unit: "CAM-102", avgSpeed: 29.7, efficiency: 15.2, totalDist: 260, totalTime: 8.5, idleTime: 1.6, idlePercent: 18.8, totalFuel: 129.2 },
  { name: "Carmen Flores", unit: "CAM-103", avgSpeed: 34.5, efficiency: 12.8, totalDist: 302, totalTime: 10.0, idleTime: 1.0, idlePercent: 10.0, totalFuel: 128.0 },
];

// ========== NEW: CONSUMED BY PERIODS DATA ==========
export const MOCK_CONSUMED_BY_PERIODS = [
  { Grouping: "CAM-101", fuel: 520, distance: 1250, distance_m: "1250000", parking_min: 480, engineHour_min: 3600, avgSpeed: 31.5, maxSpeed: 52 },
  { Grouping: "CAM-102", fuel: 580, distance: 1180, distance_m: "1180000", parking_min: 540, engineHour_min: 3480, avgSpeed: 29.2, maxSpeed: 48 },
  { Grouping: "CAM-103", fuel: 465, distance: 1350, distance_m: "1350000", parking_min: 360, engineHour_min: 3720, avgSpeed: 34.8, maxSpeed: 55 },
  { Grouping: "CAM-104", fuel: 498, distance: 1200, distance_m: "1200000", parking_min: 420, engineHour_min: 3540, avgSpeed: 30.5, maxSpeed: 50 },
  { Grouping: "CAM-105", fuel: 510, distance: 1300, distance_m: "1300000", parking_min: 390, engineHour_min: 3660, avgSpeed: 33.2, maxSpeed: 53 },
];

export const MOCK_ROUTES_PATHS: Record<string, { lat: number, lng: number }[]> = {
  // Ruta_1: Un recorrido largo y curvo (subiendo por la rampa principal del tajo)
  "Ruta_1": [
    { lat: -6.048, lng: -80.860 }, // Fondo del pit
    { lat: -6.046, lng: -80.862 },
    { lat: -6.045, lng: -80.864 },
    { lat: -6.043, lng: -80.865 }, // Curva abierta hacia el norte
    { lat: -6.041, lng: -80.864 },
    { lat: -6.039, lng: -80.862 },
    { lat: -6.038, lng: -80.859 }, // Subiendo a superficie
    { lat: -6.039, lng: -80.856 },
    { lat: -6.040, lng: -80.853 },
    { lat: -6.042, lng: -80.851 }, // Llegada a zona de descarga norte
  ],
  // Ruta_2: Ruta en ZigZag (simulando maniobras en zonas de carguío)
  "Ruta_2": [
    { lat: -6.042, lng: -80.857 },
    { lat: -6.041, lng: -80.858 }, // Avanza
    { lat: -6.042, lng: -80.859 }, // Reversa/Zig
    { lat: -6.041, lng: -80.860 }, // Avanza
    { lat: -6.042, lng: -80.861 }, // Reversa/Zag
    { lat: -6.041, lng: -80.862 }, // Sale de zona
    { lat: -6.040, lng: -80.864 },
    { lat: -6.041, lng: -80.867 },
  ],
  // Ruta_3: Un loop cerrado pero irregular (circuito de acarreo continuo)
  "Ruta_3": [
    { lat: -6.044, lng: -80.857 }, // Inicio sureste
    { lat: -6.042, lng: -80.856 },
    { lat: -6.040, lng: -80.857 }, // Sube por el este
    { lat: -6.038, lng: -80.859 },
    { lat: -6.038, lng: -80.863 }, // Cruza al oeste por el norte
    { lat: -6.040, lng: -80.865 },
    { lat: -6.043, lng: -80.863 }, // Baja por el oeste
    { lat: -6.045, lng: -80.860 },
    { lat: -6.045, lng: -80.858 }, // Retorna al punto de origen
    { lat: -6.044, lng: -80.857 },
  ],
  // Ruta_4: Recorrido corto con curvas pronunciadas (zona de mantenimiento/talleres)
  "Ruta_4": [
    { lat: -6.046, lng: -80.853 }, // Entrada talleres
    { lat: -6.047, lng: -80.854 },
    { lat: -6.047, lng: -80.855 }, // Curva en U
    { lat: -6.046, lng: -80.855 },
    { lat: -6.045, lng: -80.853 }, // Salida
    { lat: -6.044, lng: -80.851 },
  ],
  // Ruta_5: Trayectoria directa cruzando el pit con una ligera curva al final
  "Ruta_5": [
    { lat: -6.041, lng: -80.868 }, // Extremo oeste
    { lat: -6.042, lng: -80.865 },
    { lat: -6.043, lng: -80.862 },
    { lat: -6.044, lng: -80.859 }, // Cruza el centro
    { lat: -6.045, lng: -80.856 },
    { lat: -6.046, lng: -80.854 },
    { lat: -6.048, lng: -80.853 }, // Curva hacia el sur
  ],
  // Ruta_6: Otro zig-zag, más extenso, simulando bajada por rampa estrecha
  "Ruta_6": [
    { lat: -6.038, lng: -80.855 }, // Arriba este
    { lat: -6.039, lng: -80.857 }, // Baja diagonal oeste
    { lat: -6.039, lng: -80.855 }, // Giro en horquilla este
    { lat: -6.041, lng: -80.858 }, // Baja diagonal oeste
    { lat: -6.041, lng: -80.856 }, // Giro en horquilla este
    { lat: -6.043, lng: -80.859 }, // Baja fondo
    { lat: -6.044, lng: -80.860 },
  ],
};

// Modifying the mock live trucks to start at an index of their respective route
export const MOCK_LIVE_TRUCKS = [
  { id: 1, unit: "CAM-101", routeId: "Ruta_1", pathIndex: 0, speed: 32, status: "En Ruta", operator: "Juan Pérez", heading: 45 },
  { id: 2, unit: "CAM-102", routeId: "Ruta_2", pathIndex: 3, speed: 0, status: "Cargando", operator: "Luis Gómez", heading: 180 },
  { id: 3, unit: "CAM-103", routeId: "Ruta_3", pathIndex: 1, speed: 28, status: "En Ruta", operator: "Carlos Ruiz", heading: 270 },
  { id: 4, unit: "CAM-104", routeId: "Ruta_4", pathIndex: 4, speed: 0, status: "Descargando", operator: "Ana Torres", heading: 90 },
  { id: 5, unit: "CAM-105", routeId: "Ruta_5", pathIndex: 6, speed: 35, status: "En Ruta", operator: "Pedro Díaz", heading: 315 },
  { id: 6, unit: "CAM-106", routeId: "Ruta_6", pathIndex: 5, speed: 0, status: "Mantenimiento", operator: "--", heading: 0 },
];

