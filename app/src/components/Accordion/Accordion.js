import React, { useState } from 'react';
import './Accordion.scss';

function Accordion({ title, content }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={() => setIsActive(!isActive)}>
        <div>{title || 'Missing Accordion Title'}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className="accordion-content">{content || 'Missing Accordion Content'}</div>}
    </div>
  )
}

export { Accordion };
