import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';

const PortfolioScorecard = () => {
  // Prepare gauge data for each metric with a full background bar
  const gauges = [
    { title: 'Liquidity', value: 70, maxValue: 100 },
    { title: 'Volatility', value: 50, maxValue: 100 },
    { title: 'Diversification', value: 30, maxValue: 100 },
  ];

  return (
    <div style={{ backgroundColor: '#1e1e1e', color: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Portfolio Scorecard</h2>
      {gauges.map((gauge, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '5px' }}>{gauge.title}</div>
          <ResponsiveContainer width="100%" height={50}>
            <BarChart layout="vertical" data={[{ name: gauge.title, value: gauge.value }]} barCategoryGap="35%" barSize={10}>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={false} />
              <Bar dataKey="value" isAnimationActive={false}>
                <Cell fill={index % 2 === 0 ? "#8884d8" : "#83a6ed"} />
                <LabelList dataKey="value" position="right" fill="white" formatter={(value) => `${value}/100`} />
              </Bar>
              <Bar dataKey="maxValue" isAnimationActive={false}>
                <Cell fill="rgba(255, 255, 255, 0.2)" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default PortfolioScorecard;
