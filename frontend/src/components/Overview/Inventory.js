import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './Inventory.css';

const Inventory = () => {
  const [chartData, setChartData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const data = [
      { name: 'Product A', value: 400 },
      { name: 'Product B', value: 300 },
      { name: 'Product C', value: 300 },
      { name: 'Product D', value: 200 },
      { name: 'Product E', value: 150 },
      { name: 'Product F', value: 120 },
      { name: 'Product G', value: 100 },
      { name: 'Product H', value: 80 },
      { name: 'Product I', value: 50 },
    ];

    const otherThreshold = 100;
    const othersData = data.filter(item => item.value < otherThreshold).reduce((acc, item) => {
      acc.value += item.value;
      return acc;
    }, { name: 'Others', value: 0 });

    const topData = data.filter(item => item.value >= otherThreshold);
    const finalData = [...topData, othersData];

    setChartData(finalData);
  }, []);

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].name}: ${payload[0].value} (${(payload[0].value / chartData.reduce((acc, item) => acc + item.value, 0) * 100).toFixed(2)}%)`}</p>
        </div>
      );
    }

    return null;
  };

  const COLORS = [
    '#5e72e4', '#825ee4', '#8b78e6', '#9c88ff', '#7d5fff', 
    '#725ef4', '#a55eea', '#b084f5', '#d1d8e0',
  ];

  return (
    <div className="inventory">
      <h2 className="inventory-title">Inventory</h2>
      <div className="donut-chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              paddingAngle={0}
              stroke="#fff"
              cornerRadius={0}
              isAnimationActive={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconType="circle"
              iconSize={10}
              wrapperStyle={{ color: 'white' }}
              payload={chartData.map((entry, index) => ({
                id: `slice-${index}`,
                type: 'circle',
                value: `  ${entry.name}`,
                color: COLORS[index % COLORS.length],
              }))}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {chartData.length > 1 && (
        <div className="chart-info">
          <p>{`${chartData[0].value} NFTs, ${chartData[1].value} Collections`}</p>
        </div>
      )}
    </div>
  );
};

export default Inventory;
