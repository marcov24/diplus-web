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
  // Ruta_1: Rampa principal del tajo – subida larga desde el fondo del pit al norte (zona NW)
  "Ruta_1": [
    { lat: -6.0510, lng: -80.8680 },
    { lat: -6.0507, lng: -80.8683 },
    { lat: -6.0504, lng: -80.8685 },
    { lat: -6.0501, lng: -80.8688 },
    { lat: -6.0498, lng: -80.8690 },
    { lat: -6.0494, lng: -80.8692 },
    { lat: -6.0490, lng: -80.8693 },
    { lat: -6.0486, lng: -80.8692 },
    { lat: -6.0482, lng: -80.8690 },
    { lat: -6.0479, lng: -80.8687 },
    { lat: -6.0476, lng: -80.8684 },
    { lat: -6.0473, lng: -80.8680 },
    { lat: -6.0470, lng: -80.8676 },
    { lat: -6.0468, lng: -80.8672 },
    { lat: -6.0466, lng: -80.8668 },
    { lat: -6.0464, lng: -80.8664 },
    { lat: -6.0463, lng: -80.8660 },
    { lat: -6.0462, lng: -80.8656 },
    { lat: -6.0461, lng: -80.8652 },
    { lat: -6.0460, lng: -80.8648 },
    { lat: -6.0460, lng: -80.8644 },
    { lat: -6.0461, lng: -80.8640 },
    { lat: -6.0463, lng: -80.8637 },
    { lat: -6.0465, lng: -80.8634 },
    { lat: -6.0468, lng: -80.8632 },
  ],
  // Ruta_2: Zona de carguío – zigzag en zona sureste, alejada del centro
  "Ruta_2": [
    { lat: -6.0500, lng: -80.8540 },
    { lat: -6.0498, lng: -80.8543 },
    { lat: -6.0496, lng: -80.8546 },
    { lat: -6.0498, lng: -80.8549 },
    { lat: -6.0496, lng: -80.8552 },
    { lat: -6.0494, lng: -80.8555 },
    { lat: -6.0496, lng: -80.8558 },
    { lat: -6.0494, lng: -80.8561 },
    { lat: -6.0492, lng: -80.8564 },
    { lat: -6.0494, lng: -80.8567 },
    { lat: -6.0492, lng: -80.8570 },
    { lat: -6.0490, lng: -80.8573 },
    { lat: -6.0488, lng: -80.8576 },
    { lat: -6.0486, lng: -80.8579 },
    { lat: -6.0484, lng: -80.8582 },
    { lat: -6.0482, lng: -80.8585 },
    { lat: -6.0480, lng: -80.8588 },
    { lat: -6.0478, lng: -80.8590 },
    { lat: -6.0476, lng: -80.8588 },
    { lat: -6.0474, lng: -80.8585 },
    { lat: -6.0476, lng: -80.8582 },
  ],
  // Ruta_3: Circuito de acarreo – loop amplio por el norte del área
  "Ruta_3": [
    { lat: -6.0370, lng: -80.8600 },
    { lat: -6.0373, lng: -80.8603 },
    { lat: -6.0376, lng: -80.8607 },
    { lat: -6.0378, lng: -80.8611 },
    { lat: -6.0380, lng: -80.8615 },
    { lat: -6.0381, lng: -80.8619 },
    { lat: -6.0381, lng: -80.8623 },
    { lat: -6.0380, lng: -80.8627 },
    { lat: -6.0378, lng: -80.8630 },
    { lat: -6.0375, lng: -80.8633 },
    { lat: -6.0372, lng: -80.8635 },
    { lat: -6.0369, lng: -80.8636 },
    { lat: -6.0366, lng: -80.8635 },
    { lat: -6.0363, lng: -80.8633 },
    { lat: -6.0361, lng: -80.8630 },
    { lat: -6.0360, lng: -80.8626 },
    { lat: -6.0360, lng: -80.8622 },
    { lat: -6.0361, lng: -80.8618 },
    { lat: -6.0363, lng: -80.8614 },
    { lat: -6.0365, lng: -80.8611 },
    { lat: -6.0367, lng: -80.8607 },
    { lat: -6.0369, lng: -80.8603 },
    { lat: -6.0370, lng: -80.8600 },
  ],
  // Ruta_4: Zona de talleres – circuito corto al sureste
  "Ruta_4": [
    { lat: -6.0530, lng: -80.8500 },
    { lat: -6.0528, lng: -80.8503 },
    { lat: -6.0526, lng: -80.8506 },
    { lat: -6.0524, lng: -80.8509 },
    { lat: -6.0523, lng: -80.8512 },
    { lat: -6.0524, lng: -80.8515 },
    { lat: -6.0526, lng: -80.8517 },
    { lat: -6.0528, lng: -80.8519 },
    { lat: -6.0530, lng: -80.8520 },
    { lat: -6.0532, lng: -80.8519 },
    { lat: -6.0534, lng: -80.8517 },
    { lat: -6.0535, lng: -80.8514 },
    { lat: -6.0535, lng: -80.8511 },
    { lat: -6.0534, lng: -80.8508 },
    { lat: -6.0533, lng: -80.8505 },
    { lat: -6.0531, lng: -80.8502 },
    { lat: -6.0530, lng: -80.8500 },
  ],
  // Ruta_5: Cruce diagonal largo – desde el suroeste hasta el noreste
  "Ruta_5": [
    { lat: -6.0520, lng: -80.8720 },
    { lat: -6.0517, lng: -80.8717 },
    { lat: -6.0514, lng: -80.8714 },
    { lat: -6.0511, lng: -80.8711 },
    { lat: -6.0508, lng: -80.8708 },
    { lat: -6.0505, lng: -80.8705 },
    { lat: -6.0502, lng: -80.8702 },
    { lat: -6.0499, lng: -80.8699 },
    { lat: -6.0496, lng: -80.8696 },
    { lat: -6.0493, lng: -80.8693 },
    { lat: -6.0490, lng: -80.8690 },
    { lat: -6.0487, lng: -80.8687 },
    { lat: -6.0484, lng: -80.8684 },
    { lat: -6.0481, lng: -80.8681 },
    { lat: -6.0478, lng: -80.8678 },
    { lat: -6.0475, lng: -80.8675 },
    { lat: -6.0472, lng: -80.8672 },
    { lat: -6.0469, lng: -80.8669 },
    { lat: -6.0466, lng: -80.8666 },
    { lat: -6.0463, lng: -80.8663 },
    { lat: -6.0460, lng: -80.8660 },
  ],
  // Ruta_6: Rampa de bajada zigzag – zona extremo norte
  "Ruta_6": [
    { lat: -6.0350, lng: -80.8550 },
    { lat: -6.0353, lng: -80.8553 },
    { lat: -6.0355, lng: -80.8550 },
    { lat: -6.0358, lng: -80.8553 },
    { lat: -6.0360, lng: -80.8550 },
    { lat: -6.0363, lng: -80.8553 },
    { lat: -6.0365, lng: -80.8550 },
    { lat: -6.0368, lng: -80.8553 },
    { lat: -6.0370, lng: -80.8556 },
    { lat: -6.0372, lng: -80.8559 },
    { lat: -6.0374, lng: -80.8562 },
    { lat: -6.0376, lng: -80.8565 },
    { lat: -6.0378, lng: -80.8568 },
    { lat: -6.0380, lng: -80.8571 },
    { lat: -6.0382, lng: -80.8574 },
    { lat: -6.0384, lng: -80.8577 },
    { lat: -6.0386, lng: -80.8580 },
    { lat: -6.0388, lng: -80.8583 },
    { lat: -6.0390, lng: -80.8586 },
  ],
};

// Trucks start at different positions on their widely separated routes
export const MOCK_LIVE_TRUCKS = [
  { id: 1, unit: "CAM-101", routeId: "Ruta_1", pathIndex: 0, speed: 32, status: "En Ruta", operator: "Juan Pérez", heading: 45 },
  { id: 2, unit: "CAM-102", routeId: "Ruta_2", pathIndex: 5, speed: 0, status: "Cargando", operator: "Luis Gómez", heading: 180 },
  { id: 3, unit: "CAM-103", routeId: "Ruta_3", pathIndex: 0, speed: 28, status: "En Ruta", operator: "Carlos Ruiz", heading: 270 },
  { id: 4, unit: "CAM-104", routeId: "Ruta_4", pathIndex: 8, speed: 0, status: "Descargando", operator: "Ana Torres", heading: 90 },
  { id: 5, unit: "CAM-105", routeId: "Ruta_5", pathIndex: 0, speed: 35, status: "En Ruta", operator: "Pedro Díaz", heading: 315 },
  { id: 6, unit: "CAM-106", routeId: "Ruta_6", pathIndex: 10, speed: 0, status: "Mantenimiento", operator: "--", heading: 0 },
];

