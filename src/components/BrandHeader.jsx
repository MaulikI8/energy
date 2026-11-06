import React, { useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Plus, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

const destinations = [
  ['The drink', 'flavors'], ['The taste', 'taste'], ['Find ENERGY', 'launch'],
  ['Stock ENERGY', 'stockist'], ['Questions', 'faq'],
];

export default function BrandHeader() {
  const [open, setOpen] = useState(false);
  const close = useRef(null);
  const destination = useRef(null);
  const reduced = useReducedMotion();

  const navigate = id => { destination.current = id; setOpen(false); };
  const restoreFocus = event => {
    if (!destination.current) return;
    event.preventDefault();
    const id = destination.current;
    destination.current = null;
    requestAnimationFrame(() => {
      const section = document.getElementById(id);
      const heading = section?.querySelector('h1,h2');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
      section?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    });
  };

  return <Dialog.Root open={open} onOpenChange={setOpen}>
    <header className="brand-masthead">
      <div className="shell brand-masthead-inner">
        <BrandLogo />
        <a className="masthead-product" href="#flavors"><strong>ORIGINAL</strong><span>250 ML</span></a>
        <Dialog.Trigger asChild>
          <button className="brand-menu-trigger" aria-label="Open menu">MENU <Plus size={21} strokeWidth={1.7}/></button>
        </Dialog.Trigger>
      </div>
    </header>
    <Dialog.Portal>
      <Dialog.Overlay className="brand-menu-overlay" />
      <Dialog.Content className="brand-menu-panel" onOpenAutoFocus={event => { event.preventDefault(); close.current?.focus(); }} onCloseAutoFocus={restoreFocus}>
        <Dialog.Title className="visually-hidden">Explore ENERGY</Dialog.Title>
        <Dialog.Description className="visually-hidden">Meet Original, find the drink, or contact the team about stocking ENERGY.</Dialog.Description>
        <div className="shell brand-menu-top">
          <BrandLogo onClick={() => navigate('top')} />
          <Dialog.Close asChild><button ref={close} className="brand-menu-close" aria-label="Close menu">CLOSE <X size={23}/></button></Dialog.Close>
        </div>
        <div className="shell brand-menu-body">
          <nav aria-label="Main navigation" className="brand-menu-links">
            {destinations.map(([label, id], index) => <motion.a key={id} href={`#${id}`} onClick={() => navigate(id)}
              initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25, delay: index * .035 }}>
              <span>{label}</span><ArrowRight size={30} strokeWidth={1.5}/>
            </motion.a>)}
          </nav>
          <div className="brand-menu-product" aria-hidden="true">
            <motion.img src={import.meta.env.BASE_URL + 'can-refined.webp'} alt="" width="1211" height="1299"
              initial={reduced ? false : { opacity: 0, rotate: -4, y: 12 }} animate={{ opacity: 1, rotate: 5, y: 0 }} transition={{ duration: .45 }}/>
            <span>ORIGINAL / 250 ML</span>
          </div>
        </div>
        <div className="shell brand-menu-footer"><span>ENERGY ORIGINAL. COMING SOON.</span><a href="tel:+9779848951422">+977 984-8951422</a></div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
