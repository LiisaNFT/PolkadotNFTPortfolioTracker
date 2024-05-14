import React from 'react';
import { render } from '@testing-library/react';
import TopGainers from './TopGainers';

describe('TopGainers', () => {
  it('renders top gainers correctly', () => {
    // Render the TopGainers component
    const { container, getByText } = render(<TopGainers />);

    // Check if the title is rendered correctly
    const titleElement = getByText('Top Gainers');
    expect(titleElement).toBeInTheDocument();

    // Check if each top gainer item is rendered correctly
    const collectionItems = container.querySelectorAll('.collection-item');
    expect(collectionItems.length).toBe(5); // Assuming there are 5 top gainers

    // Check if each item's name and change are rendered correctly
    const itemNames = ['Aave', 'Uniswap', 'Chainlink', 'Litecoin', 'Tezos'];
    const itemChanges = ['+45%', '+30%', '+25%', '+20%', '+18%'];
    collectionItems.forEach((item, index) => {
      const nameElement = item.querySelector('.name');
      expect(nameElement.textContent).toBe(itemNames[index]);

      const changeElement = item.querySelector('.change');
      expect(changeElement.textContent).toBe(itemChanges[index]);
    });
  });
});
