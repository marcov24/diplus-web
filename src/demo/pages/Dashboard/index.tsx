import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MOCK_KPIS, MOCK_CHART_DATA, MOCK_TRUCK_STATUS } from "../../demo/mockData";
import { FaTruck, FaMapMarkerAlt, FaToolbox } from "react-icons/fa";

export default function DashboardPage() {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: "spline",
      backgroundColor: "transparent",
      height: 350,
    },
    title: { text: "Rendimiento TPA (Hoy)", style: { fontSize: "16px", fontWeight: "bold" } },
    xAxis: { categories: MOCK_CHART_DATA.categories },
    yAxis: { title: { text: "Toneladas (t)" } },
    plotOptions: { spline: { marker: { enabled: true } } },
    series: MOCK_CHART_DATA.series as any,
    credits: { enabled: false },
  };

  return (
    <div className="flex flex-col gap-6 select-none pb-10">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard General</h1>
          <p className="text-sm text-gray-500">Resumen operativo de la flota</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-100 font-medium text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">Exportar</button>
          <button className="px-4 py-2 bg-[#ff5556] font-medium text-sm text-white hover:bg-[#E2231A] rounded-lg shadow-md shadow-[#ff5556]/20 transition-all">Actualizar</button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_KPIS.map((kpi, index) => (
          <div key={index} className={`bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 ${kpi.color}`}>
            <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
            <div className="mt-2 flex items-end justify-between">
              <h3 className="text-2xl font-bold text-gray-800">
                {kpi.value} <span className="text-sm font-normal text-gray-500">{kpi.unit}</span>
              </h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${kpi.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Column */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>

        {/* Status List Column */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 overflow-hidden flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Estado de Flota Activa</h3>
          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-3">
              {MOCK_TRUCK_STATUS.map((truck) => (
                <li key={truck.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${truck.status === 'Operativo' ? 'bg-green-100 text-green-600' :
                      truck.status === 'Mantenimiento' ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                      {truck.status === 'Mantenimiento' ? <FaToolbox size={14} /> :
                        truck.status === 'Operativo' ? <FaTruck size={14} /> :
                          <FaMapMarkerAlt size={14} />}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{truck.id}</p>
                      <p className="text-xs text-gray-500">{truck.operator}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${truck.status === 'Operativo' ? 'bg-green-100 text-green-700' :
                      truck.status === 'Mantenimiento' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                      {truck.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{truck.speed}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
