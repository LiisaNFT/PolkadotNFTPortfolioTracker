import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import './Inventory.css'; 

const mockData = [
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

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF',
  '#FF6666', '#FF9933', '#FFCC33', '#33CC33', '#3399FF',
];

const Inventory = ({ testData = mockData }) => {
  const data = testData;

  if (!data) {
    return (
      <div className="inventory" data-testid="inventory">
        <h2 className="inventory-title">Inventory</h2>
        <p data-testid="error-message">
          Error fetching collections: Failed to fetch collections
        </p>
      </div>
    );
  }

  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="inventory" data-testid="inventory">
      <h2 className="inventory-title">Inventory</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={({ name, value }) => `${name} (${Math.round((value / totalValue) * 100)}%)`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Inventory;
