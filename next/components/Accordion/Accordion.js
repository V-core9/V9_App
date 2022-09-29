import React, { useState } from 'react';
import styles from './Accordion.module.scss';

export function Accordion({ title, content, startOpen, className, disableToggleIcon, onlyToggleIcon }) {
  const [isActive, setIsActive] = useState(typeof startOpen === 'boolean' ? startOpen : false);

  return (
    <div className={"accordion " + className}>
      <div className="accordion-header" onClick={() => !onlyToggleIcon ? setIsActive(!isActive) : null}>
        {title || `<div>Missing Accordion Title</div>`}
        {!disableToggleIcon && <icon onClick={() => onlyToggleIcon ? setIsActive(!isActive) : null}>{isActive ? '-' : '+'}</icon>}
      </div>
      {isActive && <div className="accordion-content">{content || 'Missing Accordion Content'}</div>}
    </div >
  )
}
