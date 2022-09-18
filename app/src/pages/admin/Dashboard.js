import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  Scatter,
  PieChart,
  Pie,
} from 'recharts';

const data = [
  { name: 'Page A', value: 400, uv: 590, pv: 800, amt: 1400, cnt: 490, },
  { name: 'Page B', value: 300, uv: 868, pv: 967, amt: 1506, cnt: 590, },
  { name: 'Page C', value: 175, uv: 1397, pv: 1098, amt: 989, cnt: 350, },
  { name: 'Page D', value: 300, uv: 1480, pv: 1200, amt: 1228, cnt: 480, },
  { name: 'Page E', value: 200, uv: 1520, pv: 1108, amt: 1100, cnt: 460, },
  { name: 'Page F', value: 500, uv: 1400, pv: 680, amt: 1700, cnt: 380, },
];

const widthHelper = (typeof window !== 'undefined' ? (document.querySelector('.main_content .content')?.width || ((window.innerWidth - 275) / 2)) : 0);

const renderLineChart = (
  <LineChart width={widthHelper} height={widthHelper * 0.66} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
);

const renderBarChart = (

  <BarChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="pv" fill="#8884d8" />
    <Bar dataKey="uv" fill="#82ca9d" />
  </BarChart>
)

const renderLineBarAreaComposedChart = (
  <ComposedChart
    width={500}
    height={400}
    data={data}
    margin={{
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    }}
  >
    <CartesianGrid stroke="#f5f5f5" />
    <XAxis dataKey="name" scale="band" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
    <Bar dataKey="pv" barSize={20} fill="#413ea0" />
    <Line type="monotone" dataKey="uv" stroke="#ff7300" />
    <Scatter dataKey="cnt" fill="red" />
  </ComposedChart>
)

const renderStraightAnglePieChart = (
  <PieChart width={400} height={400}>
    <Pie
      dataKey="value"
      startAngle={180}
      endAngle={0}
      data={data}
      cx="50%"
      cy="50%"
      outerRadius={80}
      fill="#8884d8"
      label
    />
  </PieChart>
)


export { Dashboard };

function Dashboard() {
  return (
    <section>
      <header>
        <h2>Dashboard</h2>
        <div className='flex-inline'>
          <h5>Update Interval</h5>
          <select>
            <option value="10">10s</option>
            <option value="30">30s</option>
            <option value="60" selected>60s</option>
          </select>
        </div>
      </header>
      <section>
        <div className='infoBoxes'>

          <div className='infoBox success'>
            <p>Downloads</p>
            <p>+5%</p>
          </div>

          <div className='infoBox warning'>
            <p>Questions</p>
            <p>-5%</p>
          </div>

          <div className='infoBox info'>
            <p>Views</p>
            <p>+5%</p>
          </div>

          <div className='infoBox error'>
            <p>Performance</p>
            <p>-75%</p>
          </div>

          <div className='infoBox info'>
            <p>Sales</p>
            <p>+5%</p>
          </div>

          <div className='infoBox success'>
            <p>Messages</p>
            <p>+5%</p>
          </div>

        </div>

        <div className='base-charts-dash'>
          <header>
            <h2>Charts</h2>
          </header>
          <div className='base-charts-content'>
            {renderBarChart}
            {renderStraightAnglePieChart}
            {renderLineBarAreaComposedChart}
            {renderLineChart}
          </div>
        </div>

      </section>
    </section>
  )
}
