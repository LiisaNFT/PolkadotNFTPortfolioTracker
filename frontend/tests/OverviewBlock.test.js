import React from 'react';
import { render } from '@testing-library/react';
import OverviewBlock from '../src/components/Overview/OverviewBlock';

describe('OverviewBlock', () => {
  it('renders overview cards correctly', () => {
    // Render the OverviewBlock component
    const { getAllByTestId } = render(<OverviewBlock />);

    // Check if all OverviewCard components are rendered
    const overviewCards = getAllByTestId('overview-card');
    expect(overviewCards).toHaveLength(5);

    // Check if each OverviewCard component has the correct title
    const expectedTitles = [
      'Estimated Value',
      'Revenue',
      'Spending',
      'Realized PnL',
      'Unrealized PnL',
    ];
    overviewCards.forEach((card, index) => {
      expect(card).toHaveTextContent(expectedTitles[index]);
    });

    // Check if each OverviewCard component has the correct value and change
    const expectedValues = ['749', '1194', '749', '1194', '749'];
    const expectedChanges = [11.19, 8.41, -11.19, 8.41, 11.19];
    overviewCards.forEach((card, index) => {
      const valueText = card.querySelector('.value').textContent.trim();
      const changeText = card.querySelector('.change').textContent.trim();
      expect(valueText).toContain(expectedValues[index]);
      expect(parseFloat(changeText)).toBe(expectedChanges[index]);
    });

    // Check if each OverviewCard component has the correct currency
    const currencyElements = getAllByTestId('currency');
    const expectedCurrency = 'GLMR';
    currencyElements.forEach(currency => {
      expect(currency).toHaveTextContent(expectedCurrency);
    });
  });
});
