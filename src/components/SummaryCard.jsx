// src/components/SummaryCards/SummaryCards.jsx
import React from 'react';
import { Briefcase, ClipboardCheck, ClipboardX } from 'lucide-react';

const icons = {
  Briefcase: Briefcase,
  ClipboardCheck: ClipboardCheck,
  ClipboardX: ClipboardX,
};

function SummaryCards({ data }) {
  return (
    <div className="homePageSummaryCards">
      {data.map((card, index) => {
        const IconComponent = icons[card.icon];
        return (
          <div key={index} className="summaryCard">
            <div className="summaryCardIconContainer">
              {IconComponent && <IconComponent size={32} className="summaryCardIcon" />}
            </div>
            <div className="summaryCardContent">
              <p className="summaryCardLabel">{card.label}</p>
              <h2 className="summaryCardValue">{card.value}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SummaryCards;