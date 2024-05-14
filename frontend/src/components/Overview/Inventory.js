import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './Inventory.css';
import { fetchCollectionNfts } from '../../functions';

const host = 'http://localhost:4350/graphql';

//const data = [
//  { name: 'Product A', value: 400 },
//  { name: 'Product B', value: 300 },
//  { name: 'Product C', value: 300 },
//  { name: 'Product D', value: 200 },
//  { name: 'Product E', value: 150 },
//  { name: 'Product F', value: 120 },
//  { name: 'Product G', value: 100 },
//  { name: 'Product H', value: 80 },
//  { name: 'Product I', value: 50 },
//];

const Inventory = ({ isWalletConnected, walletAddress }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isWalletConnected && walletAddress) {
        try {
          // Make sure to await the fetching of the data
          const response = await fetchCollectionNfts(host, walletAddress);
          if (response && response.data) {
            const { collections } = response.data;
            // Assuming collections is an array with each collection having an array of NFTs
            const formattedData = collections.map(collection => ({
              name: collection.name,
              value: collection.nfts.length  // assuming `nfts` is an array of NFTs
            }));

            setChartData(formattedData);
          }
        } catch (error) {
          console.error('Error fetching collections:', error);
          setChartData([]); 
        }
      } else {
        setChartData([]);
      }
    };

    fetchData();
  }, [isWalletConnected, walletAddress]); // Ensure dependencies are correctly listed

  const COLORS = ['#5e72e4', '#825ee4', '#8b78e6', '#9c88ff', '#7d5fff', 
                  '#725ef4', '#a55eea', '#b084f5', '#d1d8e0'];

  return (
    <div className="inventory">
      <h2 className="inventory-title">Inventory</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
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
    </div>
  );
};

export default Inventory;
