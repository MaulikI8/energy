import React from 'react';
import { Zap } from 'lucide-react';

export default function BrandLogo({ onClick }) {
  return <a className="wordmark" href="#top" aria-label="Energy Drink home" onClick={onClick}>
    <Zap fill="currentColor" strokeWidth={1} aria-hidden="true" />
    <span>ENERGY<small>DRINK</small></span>
  </a>;
}
