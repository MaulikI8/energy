import React, { useId } from 'react';
import { Plus } from 'lucide-react';
export default function Disclosure({ title, subtitle, open, onToggle, children, number }) {
  const id = useId();
  return <article className={`disclosure ${open ? 'is-open' : ''}`}>
    <h3><button id={`${id}-trigger`} aria-expanded={open} aria-controls={`${id}-panel`} onClick={onToggle}>
      {number && <span className="disclosure-number">{number}</span>}
      <span className="disclosure-title">{title}{subtitle && <small>{subtitle}</small>}</span><Plus size={20} aria-hidden="true" />
    </button></h3>
    <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-trigger`} aria-hidden={!open} inert={!open ? true : undefined} className="disclosure-panel"><div><div className="disclosure-content">{children}</div></div></div>
  </article>;
}
