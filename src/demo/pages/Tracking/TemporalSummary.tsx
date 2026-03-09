import { useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MOCK_TEMPORAL_SUMMARY } from "../../demo/mockData";

type MetricType = "fuel" | "efficiency" | "distance" | "hours";

const METRIC_LABELS: Record<MetricType, string> = {
  fuel: "Consumo (Gal)",
  efficiency: "Eficiencia (Gal/h)",
  distance: "Distancia (km)",
  hours: "Horas Motor (h)",
};

const METRIC_COLORS: Record<MetricType, string> = {
  fuel: "#3b82f6",
  efficiency: "#10b981",
  distance: "#f59e0b",
  hours: "#8b5cf6",
};

const getChartOptions = (
  title: string,
  categories: string[],
  series: any[],
  leftTitle: string,
  rightTitle: string,
): Highcharts.Options => ({
  chart: { type: "column", backgroundColor: "transparent", height: 350 },
  title: { text: title, align: "left", style: { fontSize: "16px", fontWeight: "bold" } },
  xAxis: { categories, crosshair: true },
  yAxis: [
    { title: { text: leftTitle }, opposite: false },
    { title: { text: rightTitle }, opposite: true },
  ],
  tooltip: { shared: true },
  plotOptions: { column: { borderRadius: 4 } },
  credits: { enabled: false },
  series,
});

const TemporalSummary = () => {
  const [metrics, setMetrics] = useState<{ left: MetricType; right: MetricType }>({
    left: "fuel",
    right: "efficiency",
  });
  const [unitFilter, setUnitFilter] = useState("all");

  const availableUnits = useMemo(() => {
    const units = new Set<string>();
    MOCK_TEMPORAL_SUMMARY.forEach((d) => d.resumeData.forEach((r) => units.add(r.Grouping)));
    return Array.from(units).sort();
  }, []);

  const aggregations = useMemo(() => {
    const createBucket = (order: number) => ({ cons: 0, hours: 0, dist: 0, order });

    const dayMap: Record<string, ReturnType<typeof createBucket>> = {};
    const weekMap: Record<string, ReturnType<typeof createBucket>> = {};

    MOCK_TEMPORAL_SUMMARY.forEach((item) => {
      const d = new Date(item.date);
      let dailyCons = 0, dailyHours = 0, dailyDist = 0;

      item.resumeData.forEach((r) => {
        if (unitFilter !== "all" && r.Grouping !== unitFilter) return;
        dailyCons += r.fuel || 0;
        dailyHours += r.engineHour || 0;
        dailyDist += r.distance_m || 0;
      });

      if (dailyCons === 0 && dailyHours === 0 && dailyDist === 0) return;

      const dateStr = item.date;
      if (!dayMap[dateStr]) dayMap[dateStr] = createBucket(d.getTime());
      dayMap[dateStr].cons += dailyCons;
      dayMap[dateStr].hours += dailyHours;
      dayMap[dateStr].dist += dailyDist;

      const weekNum = Math.ceil((d.getDate()) / 7);
      const weekStr = `Sem ${weekNum}`;
      if (!weekMap[weekStr]) weekMap[weekStr] = createBucket(d.getTime());
      weekMap[weekStr].cons += dailyCons;
      weekMap[weekStr].hours += dailyHours;
      weekMap[weekStr].dist += dailyDist;
    });

    const getMetricValue = (bucket: ReturnType<typeof createBucket>, metric: MetricType) => {
      switch (metric) {
        case "fuel": return parseFloat(bucket.cons.toFixed(2));
        case "distance": return parseFloat((bucket.dist / 1000).toFixed(2));
        case "hours": return parseFloat(bucket.hours.toFixed(2));
        case "efficiency": return bucket.hours > 0 ? parseFloat((bucket.cons / bucket.hours).toFixed(2)) : 0;
      }
    };

    const formatSeries = (map: Record<string, ReturnType<typeof createBucket>>) => {
      const keys = Object.keys(map).sort((a, b) => map[a].order - map[b].order);
      return {
        categories: keys,
        series: [
          { name: METRIC_LABELS[metrics.left], type: "column", data: keys.map((k) => getMetricValue(map[k], metrics.left)), yAxis: 0, color: METRIC_COLORS[metrics.left] },
          { name: METRIC_LABELS[metrics.right], type: "spline", data: keys.map((k) => getMetricValue(map[k], metrics.right)), yAxis: 1, color: METRIC_COLORS[metrics.right] },
        ],
      };
    };

    return { daily: formatSeries(dayMap), weekly: formatSeries(weekMap) };
  }, [unitFilter, metrics.left, metrics.right]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-gray-100 gap-3">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Resumen Temporal</h1>
          <p className="text-xs text-gray-500">Análisis de consumo y eficiencia por fecha</p>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <label className="flex flex-col text-[10px] font-bold text-gray-700">
            Eje Izquierdo (Barras):
            <select value={metrics.left} onChange={(e) => setMetrics((m) => ({ ...m, left: e.target.value as MetricType }))} className="text-xs border rounded px-2 py-1 mt-0.5">
              {Object.entries(METRIC_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>
          <label className="flex flex-col text-[10px] font-bold text-gray-700">
            Eje Derecho (Línea):
            <select value={metrics.right} onChange={(e) => setMetrics((m) => ({ ...m, right: e.target.value as MetricType }))} className="text-xs border rounded px-2 py-1 mt-0.5">
              {Object.entries(METRIC_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>
          <label className="flex flex-col text-[10px] font-bold text-gray-700">
            Unidad:
            <select value={unitFilter} onChange={(e) => setUnitFilter(e.target.value)} className="text-xs border rounded px-2 py-1 mt-0.5">
              <option value="all">Todas</option>
              {availableUnits.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <HighchartsReact highcharts={Highcharts} options={getChartOptions("Resumen Diario", aggregations.daily.categories, aggregations.daily.series, METRIC_LABELS[metrics.left], METRIC_LABELS[metrics.right])} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <HighchartsReact highcharts={Highcharts} options={getChartOptions("Resumen Semanal", aggregations.weekly.categories, aggregations.weekly.series, METRIC_LABELS[metrics.left], METRIC_LABELS[metrics.right])} />
        </div>
      </div>
    </>
  );
};

export default TemporalSummary;
