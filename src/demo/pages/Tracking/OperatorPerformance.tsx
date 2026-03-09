import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MOCK_OPERATOR_PERFORMANCE } from "../../demo/mockData";
import { Gauge, Fuel, Clock, AlertTriangle, Truck } from "lucide-react";

const OperatorPerformance = () => {
  const stats = useMemo(() => {
    const list = MOCK_OPERATOR_PERFORMANCE;
    const globalFuel = list.reduce((a, m) => a + m.totalFuel, 0);
    const globalDist = list.reduce((a, m) => a + m.totalDist, 0);
    const globalTime = list.reduce((a, m) => a + m.totalTime, 0);
    const globalIdle = list.reduce((a, m) => a + m.idleTime, 0);
    return {
      list,
      kpis: {
        avgSpeed: list.reduce((a, m) => a + m.avgSpeed, 0) / list.length,
        avgEfficiency: list.reduce((a, m) => a + m.efficiency, 0) / list.length,
        totalFuel: globalFuel,
        totalDist: globalDist,
        totalTime: globalTime,
        totalIdle: globalIdle,
        idlePercent: globalTime > 0 ? (globalIdle / globalTime) * 100 : 0,
      },
    };
  }, []);

  const sortedList = useMemo(() => [...stats.list].sort((a, b) => b.totalFuel - a.totalFuel), [stats]);

  const scatterOptions: Highcharts.Options = {
    chart: { type: "scatter", height: 400, backgroundColor: "transparent" },
    title: { text: "Eficiencia vs Velocidad por Operador", align: "left", style: { fontSize: "16px", fontWeight: "bold" } },
    xAxis: { title: { text: "Velocidad Promedio (km/h)" } },
    yAxis: { title: { text: "Consumo (Gal/h)" } },
    legend: { enabled: false },
    plotOptions: { scatter: { marker: { radius: 6 }, tooltip: { headerFormat: "<b>{point.key}</b><br>", pointFormat: "{point.x:.1f} km/h, {point.y:.1f} Gal/h" } } },
    credits: { enabled: false },
    series: [{ name: "Operadores", type: "scatter", color: "rgba(59, 130, 246, 0.6)", data: stats.list.map((o) => ({ x: parseFloat(o.avgSpeed.toFixed(1)), y: parseFloat(o.efficiency.toFixed(1)), name: o.name })) }] as any,
  };

  const barOptions: Highcharts.Options = {
    chart: { type: "bar", height: 400, backgroundColor: "transparent" },
    title: { text: "Porcentaje de Ralentí por Operador", align: "left", style: { fontSize: "16px", fontWeight: "bold" } },
    xAxis: { categories: stats.list.map((o) => o.name) },
    yAxis: { min: 0 },
    legend: { enabled: false },
    plotOptions: { bar: { borderRadius: 4, dataLabels: { enabled: true, format: "{point.y:.1f}%" } } },
    credits: { enabled: false },
    series: [{ name: "Ralentí", type: "bar", data: stats.list.map((o) => parseFloat(o.idlePercent.toFixed(1))), color: "#ef4444" }],
  };

  const kpiCards = [
    { icon: <Gauge className="w-6 h-6 text-blue-500" />, value: stats.kpis.avgSpeed.toFixed(1), label: "Vel. Prom (km/h)" },
    { icon: <Fuel className="w-6 h-6 text-green-500" />, value: stats.kpis.avgEfficiency.toFixed(1), label: "Eficiencia (Gal/h)" },
    { icon: <Fuel className="w-6 h-6 text-orange-500" />, value: stats.kpis.totalFuel.toFixed(1), label: "Consumo Total (Gal)" },
    { icon: <Truck className="w-6 h-6 text-purple-500" />, value: stats.kpis.totalDist.toFixed(1), label: "Distancia (km)" },
    { icon: <Clock className="w-6 h-6 text-slate-500" />, value: Math.round(stats.kpis.totalTime).toString(), label: "Horas Totales" },
    { icon: <AlertTriangle className="w-6 h-6 text-red-500" />, value: `${stats.kpis.idlePercent.toFixed(1)}%`, label: "Ralentí Global" },
  ];

  return (
    <>
      <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Desempeño de Operadores</h1>
          <p className="text-xs text-gray-500">Análisis detallado de productividad, consumo y uso de equipo</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {kpiCards.map((kpi, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="mb-2">{kpi.icon}</div>
            <span className="text-2xl font-bold text-slate-800">{kpi.value}</span>
            <span className="text-xs text-slate-500">{kpi.label}</span>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <HighchartsReact highcharts={Highcharts} options={scatterOptions} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <HighchartsReact highcharts={Highcharts} options={barOptions} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="font-bold text-lg text-slate-800">Detalle por Operador</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Operador</th>
                <th className="px-6 py-3">Unidad</th>
                <th className="px-6 py-3">Consumo (Gal)</th>
                <th className="px-6 py-3">Eficiencia</th>
                <th className="px-6 py-3">Vel. Prom</th>
                <th className="px-6 py-3">Distancia</th>
                <th className="px-6 py-3">Hs Totales</th>
                <th className="px-6 py-3">% Ralentí</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedList.map((row) => (
                <tr key={row.name} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{row.name}</td>
                  <td className="px-6 py-4"><span className="text-xs font-mono text-slate-500 bg-slate-200 px-2 py-0.5 rounded">{row.unit}</span></td>
                  <td className="px-6 py-4 text-blue-600 font-bold">{row.totalFuel.toFixed(1)}</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">{row.efficiency.toFixed(1)}</td>
                  <td className="px-6 py-4 text-slate-600 font-semibold">{row.avgSpeed.toFixed(1)}</td>
                  <td className="px-6 py-4 text-slate-600 font-semibold">{row.totalDist.toFixed(1)}</td>
                  <td className="px-6 py-4 text-slate-600 font-semibold">{row.totalTime.toFixed(1)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${row.idlePercent > 15 ? "bg-red-500" : "bg-green-500"}`} style={{ width: `${Math.min(row.idlePercent, 100)}%` }}></div>
                      </div>
                      <span className="text-xs text-slate-500">{row.idlePercent.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OperatorPerformance;
