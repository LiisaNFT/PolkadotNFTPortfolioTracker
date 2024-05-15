import React from 'react';
import './OverviewCard.css';

const OverviewCard = ({ title, value, change, currency }) => {
  const changeClass = change >= 0 ? 'change positive' : 'change negative';

  return (
    <div className="overview-card" data-testid="overview-card">
      <h3>{title}</h3>
      <div className="value">{value} <span data-testid="currency">{currency}</span></div>
      <div className={changeClass}>{change} <span data-testid="currency">{currency}</span></div>
    </div>
  );
};

export default OverviewCard;

