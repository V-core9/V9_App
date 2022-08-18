import React, { useState } from 'react';
import './Accordion.scss';

export function Accordion({ title, content, startOpen, className, disableToggleIcon }) {
  const [isActive, setIsActive] = useState(typeof startOpen === 'boolean' ? startOpen : false);

  return (
    <div className={"accordion " + className}>
      <div className="accordion-header" onClick={() => setIsActive(!isActive)}>
        <div>{title || 'Missing Accordion Title'}</div>
        {!disableToggleIcon && <div>{isActive ? '-' : '+'}</div>}
      </div>
      {isActive && <div className="accordion-content">{content || 'Missing Accordion Content'}</div>}
    </div>
  )
}
