import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { WHATSAPP } from '../wholesale';

const message = 'Hello ENERGY team, where will Original be available for the first release? I would like to ask about my area.';
export default function FindOriginal() {
  return <section id="launch" className="find-original">
    <div className="shell find-original-layout">
      <div><span className="tiny-label">COMING SOON</span><h2>FIND<br/>ORIGINAL.</h2></div>
      <div className="find-original-copy"><p>Original is coming to physical shops.</p><p>Ask the team about your area. For shop and distribution enquiries, head to Stock ENERGY.</p>
        <a className="find-original-link" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={20}/> Ask about your area <ArrowUpRight size={20}/></a>
        <a href="#stockist" className="find-original-trade">Stock ENERGY <ArrowUpRight size={15}/></a>
      </div>
    </div>
  </section>;
}
