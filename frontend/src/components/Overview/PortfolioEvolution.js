import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './PortfolioEvolution.css';

const PortfolioEvolution = () => {
  const [chartData, setChartData] = useState([]);
  const [yAxisTicks, setYAxisTicks] = useState([]);

  useEffect(() => {
    const today = new Date();
    const oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const data = [];
    let currentValue = 10000;
    let currentDate = oneMonthAgo;

    while (currentDate <= today) {
      data.push({
        date: currentDate.toISOString().slice(0, 10),
        value: currentValue,
      });
      currentValue += Math.floor(Math.random() * 500 - 250);
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }

    setChartData(data);

    const minValue = Math.min(...data.map(item => item.value));
    const maxValue = Math.max(...data.map(item => item.value));
    const roundedMin = Math.floor(minValue / 1000) * 1000;
    const roundedMax = Math.ceil(maxValue / 1000) * 1000;
    const tickCount = 5; // Define how many ticks you want
    const interval = (roundedMax - roundedMin) / tickCount;

    // Generate ticks array
    const ticks = Array.from({ length: tickCount + 1 }, (_, index) => roundedMin + (index * interval));
    setYAxisTicks(ticks);
  }, []);

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { date, value } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="label">{`${date}: ${value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="portfolio-evolution">
      <h2 className="portfolio-evolution-title">Portfolio Evolution</h2>
      <div className="evolution-chart-placeholder">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="date" 
              style={{ color: 'white' }} 
              axisLine={{ stroke: 'white' }} 
              tickLine={{ stroke: 'white' }}
            />
            <YAxis 
              type="number" 
              domain={['dataMin', 'dataMax']}
              ticks={yAxisTicks}
              style={{ color: 'white' }} 
              axisLine={{ stroke: 'white' }} 
              tickLine={{ stroke: 'white' }}
            />
            <Tooltip content={customTooltip} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioEvolution;
