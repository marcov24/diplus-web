import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MOCK_CONSUMED_BY_PERIODS } from "../../demo/mockData";

const roundAndFormat = (n: number) => n.toLocaleString("es-PE", { maximumFractionDigits: 1 });

const ConsumedByPeriods = () => {
  const data = MOCK_CONSUMED_BY_PERIODS;

  const stats = useMemo(() => {
    const totalFuel = data.reduce((a, c) => a + c.fuel, 0);
    const totalDistance = data.reduce((a, c) => a + c.distance, 0);
    const totalEngineHours = data.reduce((a, c) => a + c.engineHour_min / 60, 0);
    const totalParking = data.reduce((a, c) => a + c.parking_min / 60, 0);
    const avgSpeed = data.reduce((a, c) => a + c.avgSpeed, 0) / data.length;
    const avgFuelConsumption = totalEngineHours > 0 ? totalFuel / totalEngineHours : 0;
    return { totalTrucks: data.length, totalFuel, totalDistance, totalEngineHours, totalParking, avgSpeed, avgFuelConsumption };
  }, [data]);

  // Fuel distribution bar chart
  const fuelBarOptions: Highcharts.Options = {
    chart: { type: "bar", backgroundColor: "transparent", height: 300 },
    title: { text: "Consumo de Combustible por Unidad", align: "left", style: { fontSize: "14px", fontWeight: "bold", color: "#e2e8f0" } },
    xAxis: { categories: data.map((d) => d.Grouping), labels: { style: { color: "#94a3b8" } } },
    yAxis: { title: { text: "Galones", style: { color: "#94a3b8" } }, labels: { style: { color: "#94a3b8" } }, gridLineColor: "#334155" },
    legend: { enabled: false },
    plotOptions: { bar: { borderRadius: 4, dataLabels: { enabled: true, format: "{point.y:.0f}", style: { color: "#e2e8f0", textOutline: "none" } } } },
    credits: { enabled: false },
    series: [{ name: "Combustible", type: "bar", data: data.map((d) => d.fuel), color: "#3b82f6" }],
  };

  // Engine usage pie chart
  const pieOptions: Highcharts.Options = {
    chart: { type: "pie", backgroundColor: "transparent", height: 300 },
    title: { text: "Distribución de Tiempo", align: "left", style: { fontSize: "14px", fontWeight: "bold", color: "#e2e8f0" } },
    credits: { enabled: false },
    plotOptions: { pie: { dataLabels: { style: { color: "#e2e8f0", textOutline: "none" } } } },
    series: [{
      name: "Horas", type: "pie", innerSize: "50%",
      data: [
        { name: "Horas Motor", y: stats.totalEngineHours, color: "#10b981" },
        { name: "Horas Estacionado", y: stats.totalParking, color: "#ef4444" },
      ],
    }],
  };

  // Engine hours bar chart
  const engineBarOptions: Highcharts.Options = {
    chart: { type: "bar", backgroundColor: "transparent", height: 300 },
    title: { text: "Horas de Motor por Unidad", align: "left", style: { fontSize: "14px", fontWeight: "bold", color: "#e2e8f0" } },
    xAxis: { categories: data.map((d) => d.Grouping), labels: { style: { color: "#94a3b8" } } },
    yAxis: { title: { text: "Horas", style: { color: "#94a3b8" } }, labels: { style: { color: "#94a3b8" } }, gridLineColor: "#334155" },
    legend: { enabled: false },
    plotOptions: { bar: { borderRadius: 4, dataLabels: { enabled: true, format: "{point.y:.1f}", style: { color: "#e2e8f0", textOutline: "none" } } } },
    credits: { enabled: false },
    series: [{ name: "Horas Motor", type: "bar", data: data.map((d) => parseFloat((d.engineHour_min / 60).toFixed(1))), color: "#10b981" }],
  };

  // Parking bar chart
  const parkingBarOptions: Highcharts.Options = {
    chart: { type: "bar", backgroundColor: "transparent", height: 300 },
    title: { text: "Horas de Parking por Unidad", align: "left", style: { fontSize: "14px", fontWeight: "bold", color: "#e2e8f0" } },
    xAxis: { categories: data.map((d) => d.Grouping), labels: { style: { color: "#94a3b8" } } },
    yAxis: { title: { text: "Horas", style: { color: "#94a3b8" } }, labels: { style: { color: "#94a3b8" } }, gridLineColor: "#334155" },
    legend: { enabled: false },
    plotOptions: { bar: { borderRadius: 4, dataLabels: { enabled: true, format: "{point.y:.1f}", style: { color: "#e2e8f0", textOutline: "none" } } } },
    credits: { enabled: false },
    series: [{ name: "Estacionado", type: "bar", data: data.map((d) => parseFloat((d.parking_min / 60).toFixed(1))), color: "#f59e0b" }],
  };

  const kpiCards = [
    { value: stats.totalTrucks, label: "Camiones", color: "text-orange-400", sub: "text-orange-700" },
    { value: roundAndFormat(stats.totalFuel), label: "Combustible Total (gal)", color: "text-blue-500", sub: "text-blue-700" },
    { value: stats.totalDistance.toFixed(1), label: "Distancia Total (km)", color: "text-green-500", sub: "text-green-700" },
    { value: roundAndFormat(stats.totalEngineHours), label: "Horas Motor Total", color: "text-yellow-500", sub: "text-yellow-700" },
    { value: stats.totalParking.toFixed(1), label: "Horas Estacionado", color: "text-red-500", sub: "text-red-700" },
    { value: stats.avgFuelConsumption.toFixed(2), label: "Consumo Prom (gal/h)", color: "text-indigo-500", sub: "text-indigo-700" },
  ];

  return (
    <>
      <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl shadow-sm border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white">Consumo Acumulativo por Periodos</h1>
          <p className="text-xs text-slate-400">Resumen de consumo, distancia y uso de motor</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {kpiCards.map((kpi, i) => (
          <div key={i} className="flex flex-col justify-center bg-slate-900 border border-slate-800 py-4 px-2 rounded-xl text-center">
            <p className={`text-xl leading-none font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className={`text-[9px] ${kpi.sub} font-medium mt-1`}>{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 col-span-2">
          {/* Data Table */}
          {/* <h3 className="font-bold text-sm text-white mb-2">Datos Acumulados por Unidad</h3> */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-800/50 text-slate-300 font-semibold border-b border-slate-700">
                <tr>
                  <th className="px-3 py-2">Unidad</th>
                  <th className="px-3 py-2">Combustible (gal)</th>
                  <th className="px-3 py-2">Distancia (km)</th>
                  <th className="px-3 py-2">Tiempo Motor (h)</th>
                  <th className="px-3 py-2">Tiempo Estacionado (h)</th>
                  <th className="px-3 py-2">Vel. Prom (km/h)</th>
                  <th className="px-3 py-2">Vel. Máx (km/h)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {data.map((row) => (
                  <tr key={row.Grouping} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-3 py-2 text-slate-200 font-mono font-semibold">{row.Grouping}</td>
                    <td className="px-3 py-2 text-blue-400 font-bold">{row.fuel.toFixed(1)}</td>
                    <td className="px-3 py-2 text-slate-300">{row.distance.toFixed(1)}</td>
                    <td className="px-3 py-2 text-slate-300">{(row.engineHour_min / 60).toFixed(1)}</td>
                    <td className="px-3 py-2 text-red-400 font-semibold">{(row.parking_min / 60).toFixed(1)}</td>
                    <td className="px-3 py-2 text-slate-300">{row.avgSpeed.toFixed(1)}</td>
                    <td className="px-3 py-2 text-slate-300 font-semibold">{row.maxSpeed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <HighchartsReact highcharts={Highcharts} options={fuelBarOptions} />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <HighchartsReact highcharts={Highcharts} options={pieOptions} />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <HighchartsReact highcharts={Highcharts} options={engineBarOptions} />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <HighchartsReact highcharts={Highcharts} options={parkingBarOptions} />
        </div>
      </div>
    </>
  );
};

export default ConsumedByPeriods;
