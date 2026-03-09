import { useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MOCK_TRUCK_TRIP_DATA } from "../../demo/mockData";
import {
  ChevronDown, ListFilter, RotateCcw,
  BarChart2, LineChart
} from "lucide-react";

// Colores según la imagen de referencia para cada camión
const TRUCK_COLORS: Record<string, string> = {
  "C-204": "#a5b4fc", // Azul claro
  "C-203": "#fbcfe8", // Rosado claro
  "C-201": "#86efac", // Verde claro
  "C-205": "#52525b", // Gris oscuro
  "C-202": "#a1a1aa", // Gris medio
};

const TruckDashboard = () => {
  // Filtros
  const [shiftFilter, setShiftFilter] = useState("Todos");
  const [metricType, setMetricType] = useState("gal/h");
  const [routeFilter, setRouteFilter] = useState("Ruta_1");
  const [tramoFilter, setTramoFilter] = useState("PB4 - PB7");
  // Vistas
  const [chartView, setChartView] = useState<"line" | "bar">("line");
  const [timeView, setTimeView] = useState("Por día");

  // Toggles de detalles
  const [showLeftStats, setShowLeftStats] = useState(false);
  const [showRightStats, setShowRightStats] = useState(false);

  // Selector principal
  const [selectedTruck, setSelectedTruck] = useState("Todos los camiones");

  // Filter out empty rows from mock initialization
  const activeData = useMemo(() => {
    let baseData = MOCK_TRUCK_TRIP_DATA.filter((d) => d.ratio > 0);

    // Filtro principal de camiones (si el usuario pulsa algún camión)
    if (selectedTruck !== "Todos los camiones") {
      baseData = baseData.filter((d) => d.unit === selectedTruck);
    }

    return baseData;
  }, [selectedTruck]);

  // For the filter dropdown, we need the *entire* unique list, independent of what is currently filtered
  const allUniqueTrucks = useMemo(() => {
    const validData = MOCK_TRUCK_TRIP_DATA.filter((d) => d.ratio > 0);
    return [...new Set(validData.map((d) => d.unit))];
  }, []);

  const uniqueDates = [...new Set(activeData.map((d) => d.date))];
  const uniqueTrucks = [...new Set(activeData.map((d) => d.unit))];

  // ==========================================
  // 1. LEFT CHART - Multi-series Area/Line Chart
  // ==========================================
  const leftChartOptions: Highcharts.Options = {
    chart: {
      type: chartView === 'line' ? 'spline' : 'column',
      backgroundColor: "transparent",
      height: 400,
      marginTop: 30,
    },
    title: { text: "gal/h promedio por día - Vista Lineal | Ruta: Ruta_1 | Todas las unidades", align: "center", style: { fontSize: "11px", color: "#94a3b8", fontWeight: "normal" } },
    xAxis: {
      categories: uniqueDates,
      crosshair: true,
      labels: { style: { color: "#94a3b8" } },
      lineColor: "#334155",
      tickColor: "#334155"
    },
    yAxis: {
      title: {
        text: metricType === "velocidad" ? "km/h" : metricType === "combustible" ? "gal" : "gal/h",
        style: { color: "#e2e8f0", fontWeight: "bold" }
      },
      min: metricType === "velocidad" ? 30 : metricType === "combustible" ? 2 : 30,
      max: metricType === "velocidad" ? 50 : metricType === "combustible" ? 4 : 55,
      tickInterval: metricType === "velocidad" ? 5 : metricType === "combustible" ? 0.5 : 5,
      gridLineColor: "#334155",
      labels: { style: { color: "#94a3b8" } }
    },
    plotOptions: {
      spline: {
        lineWidth: 3,
        marker: { enabled: true, symbol: "circle", radius: 4 }
      },
      column: {
        borderRadius: 2
      }
    },
    legend: {
      enabled: true,
      verticalAlign: 'bottom',
      itemStyle: { color: "#e2e8f0", fontWeight: "bold" }
    },
    credits: { enabled: false },
    series: [
      ...uniqueTrucks.map((unit) => ({
        name: unit,
        type: chartView === 'line' ? 'spline' as const : 'column' as const,
        color: TRUCK_COLORS[unit] || "#94a3b8",
        data: uniqueDates.map((date) => {
          const row = activeData.find((d) => d.date === date && d.unit === unit);
          if (!row) return null;
          if (metricType === "velocidad") return 35.0 + (Math.random() * 10 - 1); // Mock speed
          if (metricType === "combustible") return 2.5 + (Math.random() * 0.8 - 0.1); // Mock fuel
          return row.ratio; // default gal/h
        }),
      })),
      {
        name: "Media",
        type: "line",
        color: "#9ca3af",
        dashStyle: "ShortDash",
        marker: { enabled: false },
        data: uniqueDates.map(() => 41) // Mock average line
      }
    ],
  };

  // ==========================================
  // 2. RIGHT CHART - Histogram + Spline
  // ==========================================
  const { bucketLabels, counts, splineData, rightStats } = useMemo(() => {
    let metricTitle = "gal/h";
    const ratios = activeData.map((d) => {
      if (metricType === "velocidad") {
        metricTitle = "km/h";
        return 39.0 + (Math.random() * 2 - 1);
      }
      if (metricType === "combustible") {
        metricTitle = "gal";
        return 3.0 + (Math.random() * 0.2 - 0.1);
      }
      return d.ratio;
    }).filter((r) => r > 0);
    const totalRegistros = ratios.length;

    if (totalRegistros === 0) {
      return {
        bucketLabels: [], counts: [], splineData: [],
        rightStats: { total: 0, mostFrequent: "-", stdDev: 0, min: 0, avg: 0, max: 0, metricTitle: "" }
      };
    }

    const min = Math.min(...ratios);
    const max = Math.max(...ratios);
    const avg = ratios.reduce((a, b) => a + b, 0) / totalRegistros;

    // Desviación Estándar
    const variance = ratios.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / totalRegistros;
    const stdDev = Math.sqrt(variance);

    // Dynamic buckets (10 intervals for better visibility)
    const numBuckets = 10;
    const step = (max - min) / numBuckets || 1;

    const buckets = Array.from({ length: numBuckets }, (_, i) => {
      const rangeMin = min + step * i;
      const rangeMax = i === numBuckets - 1 ? max : min + step * (i + 1);

      const count = ratios.filter(val =>
        i === numBuckets - 1 ? (val >= rangeMin && val <= rangeMax) : (val >= rangeMin && val < rangeMax)
      ).length;

      return {
        label: `${rangeMin.toFixed(2)}-${rangeMax.toFixed(2)}`,
        count,
        midpoint: rangeMin + step / 2
      };
    });

    // Spline Calculation (Normal distribution curve)
    const splinePts = buckets.map((b) => {
      const normalValue = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((b.midpoint - avg) / stdDev, 2));
      return normalValue * totalRegistros * step;
    });

    const maxCountBucket = buckets.reduce((prev, curr) => (prev.count > curr.count) ? prev : curr, buckets[0]);

    return {
      bucketLabels: buckets.map(b => b.label),
      counts: buckets.map(b => b.count),
      splineData: splinePts.map(val => Number(val.toFixed(2))),
      rightStats: {
        total: totalRegistros,
        mostFrequent: `[${maxCountBucket.label}]`,
        stdDev: Number(stdDev.toFixed(2)),
        min: Number(min.toFixed(2)),
        avg: Number(avg.toFixed(2)),
        max: Number(max.toFixed(2)),
        metricTitle
      }
    };
  }, [activeData, metricType]);

  const rightChartOptions: Highcharts.Options = {
    chart: { backgroundColor: "transparent", height: 400, marginTop: 40 },
    title: {
      text: `Ruta: ${routeFilter} | ${selectedTruck} | 2026-02-19 al 2026-03-06 | Total: ${rightStats.total} viajes`,
      align: "center",
      style: { fontSize: "10px", color: "#94a3b8", fontWeight: "normal" }
    },
    xAxis: {
      categories: bucketLabels,
      labels: { rotation: -45, style: { fontSize: "9px", color: "#94a3b8" } },
      lineColor: "#334155"
    },
    yAxis: [
      {
        title: { text: "Cantidad de Viajes", style: { color: "#e2e8f0" } },
        min: 0, max: 32, tickInterval: 8,
        gridLineColor: "#334155",
        labels: { style: { color: "#94a3b8" } }
      },
      {
        title: { text: "Densidad de Probabilidad", style: { color: "#f87171" }, rotation: 270 },
        min: 0, max: 24, tickInterval: 6,
        opposite: true,
        gridLineWidth: 0,
        labels: { style: { color: "#f87171" } }
      }
    ],
    plotOptions: {
      column: { borderRadius: 2, color: "#3b82f6", pointPadding: 0.1, groupPadding: 0.1 },
      spline: { lineWidth: 2, color: "#ef4444", marker: { enabled: false } }
    },
    credits: { enabled: false },
    legend: { enabled: false },
    series: [
      {
        name: "Cantidad",
        type: "column",
        yAxis: 0,
        data: counts,
        dataLabels: { enabled: true, style: { fontWeight: "bold", color: "#e2e8f0", textOutline: "none" } }
      },
      {
        name: "Densidad",
        type: "spline",
        yAxis: 1,
        data: splineData
      }
    ],
  };

  // ==========================================
  // 3. BOTTOM TABLE DATA
  // ==========================================
  const tableData = useMemo(() => {
    // Generate summary rows per unit based on activeData
    const units = [...new Set(activeData.map(d => d.unit))];

    return units.map(unit => {
      const unitRecords = activeData.filter(d => d.unit === unit);
      const viajes = unitRecords.length;

      if (viajes === 0) return null;

      const avgSpeed = unitRecords.reduce((sum, _r) => sum + 39.0 + (Math.random() * 2 - 1), 0) / viajes;
      const avgFuel = unitRecords.reduce((sum, _r) => sum + 3.0 + (Math.random() * 0.2 - 0.1), 0) / viajes;
      const avgDist = unitRecords.reduce((sum, _r) => sum + 3.0, 0) / viajes;
      const avgTime = unitRecords.reduce((sum, _r) => sum + 4.4, 0) / viajes;
      const ton = unitRecords.reduce((sum, _r) => sum + (205 + Math.random() * 5), 0) / viajes;
      const r_galh = unitRecords.reduce((sum, r) => sum + r.ratio, 0) / viajes;
      const r_galton = (avgFuel * 1000) / ton;
      const r_galtonkm = r_galton / avgDist;

      return {
        unit,
        viajes,
        speed: avgSpeed.toFixed(2),
        fuel: avgFuel.toFixed(2),
        dist: avgDist.toFixed(2),
        time: avgTime.toFixed(2),
        ton: ton.toFixed(2),
        r_galh: r_galh.toFixed(2),
        r_galton: r_galton.toFixed(3),
        r_galtonkm: r_galtonkm.toFixed(3)
      };
    }).filter(Boolean) as any[]; // Need 'any' here or a defined type if TypeScript complains
  }, [activeData]);

  return (
    <div className="flex flex-col gap-4 p-4 min-h-full bg-transparent">
      {/* HEADER TITLE */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight leading-tight">Análisis de datos por Ruta - Camion</h1>
          <p className="text-sm text-slate-400 font-medium">Análisis de datos por Ruta - Camion</p>
        </div>
        {/* <button className="bg-[#00a859] hover:bg-green-600 text-white px-4 py-2 rounded font-semibold text-sm flex items-center gap-2 shadow-sm transition-colors">
          <FileDown size={16} />
          Exportar Excel
        </button> */}
      </div>

      {/* FILTER BAR ROW */}
      <div className="flex flex-wrap items-end gap-3 w-full border-b border-slate-800 pb-4">
        <button className="btn-filter bg-slate-900 p-2 rounded border border-slate-800 shadow-sm text-slate-400 hover:bg-slate-800"><ListFilter size={18} /></button>
        <button className="btn-filter bg-red-900/20 p-2 rounded border border-red-900/50 shadow-sm text-red-500 hover:bg-red-900/40"><RotateCcw size={18} /></button>

        {/* <div className="flex flex-col max-w-[200px] flex-1">
          <label className="text-xs text-slate-500 mb-1 font-medium">Rango de Fechas</label>
          <div className="relative">
            <input type="text" value={dateRange} readOnly className="w-full text-sm border-slate-200 border rounded py-1.5 pl-3 pr-8 bg-white shadow-sm focus:outline-none" />
            <Calendar size={14} className="absolute right-2.5 top-2.5 text-slate-400" />
          </div>
        </div> */}

        <div className="flex flex-col w-[100px]">
          <label className="text-xs text-slate-400 mb-1 font-medium">Turno</label>
          <div className="relative">
            <select value={shiftFilter} onChange={e => setShiftFilter(e.target.value)} className="w-full text-sm text-slate-200 border-slate-700 border rounded py-1.5 pl-3 pr-8 appearance-none bg-slate-900 shadow-sm">
              <option>Todos</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col w-[70px]">
            <label className="text-xs text-slate-400 mb-1 font-medium">Val. Min</label>
            <input type="text" value="0" readOnly className="w-full text-sm text-slate-200 border-slate-700 border rounded py-1.5 px-3 bg-slate-900 shadow-sm" />
          </div>
          <div className="flex flex-col w-[10px] items-center justify-end pb-2">
            <span className="text-slate-500">-</span>
          </div>
          <div className="flex flex-col w-[70px]">
            <label className="text-xs text-slate-400 mb-1 font-medium">Val. Max</label>
            <input type="text" value="100" readOnly className="w-full text-sm text-slate-200 border-slate-700 border rounded py-1.5 px-3 bg-slate-900 shadow-sm" />
          </div>
        </div>

        <div className="flex flex-col w-[140px]">
          <label className="text-xs text-slate-400 mb-1 font-medium">Tipo de dato</label>
          <div className="relative">
            <select value={metricType} onChange={(e) => setMetricType(e.target.value)} className="w-full text-sm text-slate-200 border-slate-700 border rounded py-1.5 pl-3 pr-8 appearance-none bg-slate-900 shadow-sm">
              <option value="gal/h">gal/h</option>
              <option value="velocidad">Velocidad (km/h)</option>
              <option value="combustible">Combustible (gal)</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col w-[110px]">
          <label className="text-xs text-slate-400 mb-1 font-medium">Ruta</label>
          <div className="relative">
            <select value={routeFilter} onChange={e => setRouteFilter(e.target.value)} className="w-full text-sm text-slate-200 border-slate-700 border rounded py-1.5 pl-3 pr-8 appearance-none bg-slate-900 shadow-sm">
              <option>Ruta_1</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col w-[110px]">
          <label className="text-xs text-slate-400 mb-1 font-medium">Tramo</label>
          <div className="relative">
            <select value={tramoFilter} onChange={e => setTramoFilter(e.target.value)} className="w-full text-sm text-slate-200 border-slate-700 border rounded py-1.5 pl-3 pr-8 appearance-none bg-slate-900 shadow-sm">
              <option>PB4 - PB7</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col w-[200px] ml-auto">
          <label className="text-xs border-b font-bold text-white bg-transparent px-1 pb-1 inline-block -mb-px relative z-10 w-max border-slate-700">Camiones:</label>
          <div className="flex border border-slate-700 bg-slate-900 rounded shadow-sm overflow-hidden mt-[1px]">
            <select
              value={selectedTruck}
              onChange={(e) => setSelectedTruck(e.target.value)}
              className="flex-1 text-sm bg-slate-900 pl-3 pr-8 py-1.5 focus:outline-none appearance-none font-medium text-slate-300"
            >
              <option value="Todos los camiones">Todos los camiones</option>
              {allUniqueTrucks.map((truck) => (
                <option key={truck} value={truck}>
                  {truck}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* CHARTS CONTAINER */}
      <div className="flex flex-col lg:flex-row gap-4 w-full h-[500px]">

        {/* LEFT CARD */}
        <div className="flex flex-col flex-1 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="flex justify-between items-center p-3 border-b border-slate-800">
            <div className="flex bg-slate-800/80 rounded p-1 gap-1 border border-slate-700">
              <button
                onClick={() => setChartView('line')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors ${chartView === 'line' ? 'bg-blue-600/20 text-blue-400 shadow-sm border border-blue-500/30' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <LineChart size={14} /> Lineal
              </button>
              <button
                onClick={() => setChartView('bar')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors ${chartView === 'bar' ? 'bg-blue-600/20 text-blue-400 shadow-sm border border-blue-500/30' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <BarChart2 size={14} /> Barras
              </button>
            </div>
            <div className="relative">
              <select value={timeView} onChange={e => setTimeView(e.target.value)} className="text-sm border-slate-700 border rounded py-1 pl-3 pr-8 appearance-none bg-slate-900 shadow-sm text-slate-300">
                <option>Por día</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1.5 text-slate-500 pointer-events-none" />
            </div>
          </div>
          <div className="flex-1 px-4 pb-2 relative flex flex-col min-h-[340px]">
            <HighchartsReact highcharts={Highcharts} options={leftChartOptions} containerProps={{ className: "flex-1" }} />

            {/* Left Stats Grid */}
            {showLeftStats && (
              <div className="grid grid-cols-4 grid-rows-[40px_40px] gap-1 text-center mt-2 mb-6">
                <div className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <p className="text-[9px] text-blue-400 font-medium leading-none">Total Vehículos</p>
                  <p className="text-[14px] font-bold text-blue-400 leading-none">5 Camiones</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <p className="text-[9px] text-sky-400 font-medium leading-none">Total Toneladas</p>
                  <p className="text-[14px] font-bold text-sky-400 leading-none">385.25 KTon</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <p className="text-[9px] text-amber-400 font-medium leading-none">Total Gal Camiones</p>
                  <p className="text-[14px] font-bold text-amber-400 leading-none">575.05 GAL</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <p className="text-[9px] text-emerald-400 font-medium leading-none">H Trabajadas</p>
                  <p className="text-[14px] font-bold text-emerald-400 leading-none">1,120.4 h</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <p className="text-[9px] text-blue-400 font-medium leading-none">GL/KM</p>
                  <p className="text-[14px] font-bold text-blue-400 leading-none">4.12</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <p className="text-[9px] text-slate-400 font-medium leading-none">GAL/KTon - Tramo</p>
                  <p className="text-[14px] font-bold text-slate-300 leading-none">1.49</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <p className="text-[9px] text-indigo-400 font-medium leading-none">DMT</p>
                  <p className="text-[14px] font-bold text-indigo-400 leading-none">0.86</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <p className="text-[9px] text-lime-400 font-medium leading-none">CM</p>
                  <p className="text-[14px] font-bold text-lime-400 leading-none">42.5</p>
                </div>
              </div>
            )}

            <div className="absolute bottom-1 w-full left-0 flex justify-center pb-1">
              <button
                onClick={() => setShowLeftStats(!showLeftStats)}
                className="text-[10px] text-slate-400 font-medium hover:text-blue-400 transition-colors bg-slate-800 px-2 py-0.5 rounded shadow-sm border border-slate-700"
              >
                {showLeftStats ? "- Ver menos detalles" : "+ Ver más detalles"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="w-full lg:w-[400px] bg-slate-900 rounded-xl border border-slate-800 flex flex-col pt-2 relative">
          <div className="flex-1 px-4 relative flex flex-col min-h-[340px]">
            <HighchartsReact highcharts={Highcharts} options={rightChartOptions} containerProps={{ className: "flex-1" }} />

            {/* Right Stats Grid */}
            {showRightStats && (
              <div className="grid grid-cols-3 grid-rows-[40px_40px] gap-1 text-center mt-2 mb-6">
                <div className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <p className="text-[9px] text-blue-400 font-medium leading-none">Total de Registros</p>
                  <p className="text-[14px] font-bold text-blue-400 leading-none">{rightStats.total}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <p className="text-[9px] text-green-400 font-medium leading-none">Rango Más Frecuente</p>
                  <p className="text-[14px] font-bold text-green-400 leading-none">{rightStats.mostFrequent}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <p className="text-[9px] text-red-400 font-medium leading-none">Desv. Estándar</p>
                  <p className="text-[14px] font-bold text-red-400 leading-none">{rightStats.stdDev} <span className="text-[8px] font-normal">{rightStats.metricTitle}</span></p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <p className="text-[9px] text-orange-400 font-medium leading-none">Valor Mínimo</p>
                  <p className="text-[14px] font-bold text-orange-400 leading-none">{rightStats.min} <span className="text-[8px] font-normal">{rightStats.metricTitle}</span></p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <p className="text-[9px] text-purple-400 font-medium leading-none">Promedio</p>
                  <p className="text-[14px] font-bold text-purple-400 leading-none">{rightStats.avg} <span className="text-[8px] font-normal">{rightStats.metricTitle}</span></p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <p className="text-[9px] text-indigo-400 font-medium leading-none">Valor Máximo</p>
                  <p className="text-[14px] font-bold text-indigo-400 leading-none">{rightStats.max} <span className="text-[8px] font-normal">{rightStats.metricTitle}</span></p>
                </div>
              </div>
            )}

            <div className="absolute bottom-1 w-full left-0 flex justify-center pb-1">
              <button
                onClick={() => setShowRightStats(!showRightStats)}
                className="text-[10px] text-slate-400 font-medium hover:text-blue-400 transition-colors bg-slate-800 px-2 py-0.5 rounded shadow-sm border border-slate-700"
              >
                {showRightStats ? "- Ver menos detalles" : "+ Ver más detalles"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DATA TABLE BLOCK */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col flex-1 mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-center border-collapse">
            <thead className="bg-slate-800/50 text-slate-300 font-medium border-b border-slate-700">
              <tr>
                <th className="px-3 py-3 font-semibold text-left">Unidad</th>
                <th className="px-3 py-3 font-semibold">Fecha</th>
                <th className="px-3 py-3 font-semibold w-12">Nº<br />Viajes</th>
                <th className="px-3 py-3 font-semibold leading-tight w-20">Vel.Prom<br />(km/h)</th>
                <th className="px-3 py-3 font-semibold leading-tight w-20">Comb. Prom<br />(gal)</th>
                <th className="px-3 py-3 font-semibold leading-tight w-20">Dist. Prom<br />(km)</th>
                <th className="px-3 py-3 font-semibold w-24">Tiempo (min)</th>
                <th className="px-3 py-3 font-semibold leading-tight w-20">Tonelaje<br />(T)</th>
                <th className="px-3 py-3 font-semibold">gal/h</th>
                <th className="px-3 py-3 font-semibold">gal/kTon</th>
                <th className="px-3 py-3 font-semibold">gal/kTon*km</th>
                <th className="px-3 py-3 font-semibold text-xs leading-tight">Modelo<br />(gal/kTon*km)</th>
                <th className="px-3 py-3 font-semibold">Desvió</th>
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {tableData.map((row, i) => (
                <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 text-blue-400 font-semibold flex items-center gap-1.5 min-w-[100px]">
                    <span className="w-4 h-4 rounded bg-blue-900/30 flex items-center justify-center"><div className="w-1.5 h-1.5 border-t border-r border-blue-400 rotate-45"></div></span>
                    {row.unit}
                  </td>
                  <td className="p-3 text-slate-400 text-center">-</td>
                  <td className="p-3 text-slate-300 text-center">{row.viajes}</td>
                  <td className="p-3 text-emerald-400 font-bold text-center">{row.speed}</td>
                  <td className="p-3 text-red-500 font-bold text-center">{row.fuel}</td>
                  <td className="p-3 text-slate-300 text-center">{row.dist}</td>
                  <td className="p-3 text-slate-300 text-center">{row.time}</td>
                  <td className="p-3 text-white font-bold text-center">{row.ton}</td>
                  <td className="p-3 text-red-500 font-bold text-center">{row.r_galh}</td>
                  <td className="p-3 text-red-500 font-bold text-center">{row.r_galton}</td>
                  <td className="p-3 text-red-500 font-bold text-center">{row.r_galtonkm}</td>
                  <td className="p-3 text-slate-400 text-center">---</td>
                  <td className="p-3 text-slate-400 text-center">---</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BOTTOM PAGINATION ROW */}
        <div className="flex items-center justify-between p-3 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400 font-medium">Mostrando 1 a {tableData.length} de {tableData.length} resultados</span>
            {/* <button className="bg-[#00a859] hover:bg-green-600 text-white px-3 py-1.5 rounded font-semibold text-[11px] flex items-center gap-1.5 transition-colors">
              <FileDown size={14} /> Exportar Excel
            </button> */}
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <select className="border border-slate-700 rounded px-2 py-1 bg-slate-800 text-slate-300 shadow-sm outline-none">
              <option>20 por página</option>
            </select>
            <div className="flex gap-1">
              <button className="w-8 h-7 border border-slate-700 rounded flex items-center justify-center text-slate-400 bg-slate-800 hover:bg-slate-700 transition leading-none">&lt;&lt;</button>
              <button className="w-6 h-7 border border-slate-700 rounded flex items-center justify-center text-slate-400 bg-slate-800 hover:bg-slate-700 transition leading-none">&lt;</button>
              <span className="px-2 flex items-center text-slate-400">Página 1 de 1</span>
              <button className="w-6 h-7 border border-slate-700 rounded flex items-center justify-center text-slate-400 bg-slate-800 hover:bg-slate-700 transition leading-none">&gt;</button>
              <button className="w-8 h-7 border border-slate-700 rounded flex items-center justify-center text-slate-400 bg-slate-800 hover:bg-slate-700 transition leading-none">&gt;&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckDashboard;
