import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './Inventory.css';

const Inventory = ({ testData }) => {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (testData) {
      setChartData(testData);
    } else {
      setError('Failed to fetch collections');
    }
  }, [testData]);

  const COLORS = [
    '#5e72e4', '#825ee4', '#8b78e6', '#9c88ff', '#7d5fff',
    '#725ef4', '#a55eea', '#b084f5', '#d1d8e0'
  ];

  return (
    <div className="inventory">
      <h2 className="inventory-title">Inventory</h2>
      {error ? (
        <p data-testid="error-message">Error fetching collections: {error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart data-testid="pie-chart">
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Inventory;
