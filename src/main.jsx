import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, Check, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import '@fontsource/teko/latin-600.css';
import '@fontsource/teko/latin-700.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import { validateInquiry, whatsappUrl } from './wholesale';
import { useReveals } from './hooks/useProductMotion';
import Disclosure from './components/Disclosure';
import CinematicHero from './components/CinematicHero';
import ProductImage from './components/ProductImage';
import BrandStory from './components/BrandStory';
import TradeInformation from './components/TradeInformation';
import Logo from './components/BrandLogo';
import Header from './components/BrandHeader';
import IngredientsButton from './components/IngredientsButton';
import Launch from './components/FindOriginal';
import KnowYourCan from './components/KnowYourCan';
import PrivacyNotice, { PrivacyButton } from './components/Privacy';
import { MotionConfig } from 'motion/react';
import './styles.css';
import './cinematic.css';
import './brand-ui.css';

const links = [['Product', 'flavors'], ['Find ENERGY', 'launch'], ['Retailers', 'stockist'], ['FAQ', 'faq']];
const initialForm = { business: '', owner: '', location: '', outlet: '', phone: '', request: 'Retailer enquiry', consent: false };
const faq = [
 ['Where can I get ENERGY?', 'Original is coming soon to physical shops. Ask the team about the first release in your area.'],
 ['Can I buy it here?', 'There is no online checkout. This is the home of ENERGY, with a direct line to the team for shop and distribution enquiries.'],
 ['Is it zero sugar?', 'We are working towards a zero-sugar formula. The final sugar content, caffeine amount, ingredients and nutrition will be confirmed on the approved label. Use Label & ingredients for product information.'],
 ['What flavors are there?', 'Meet Original, the first ENERGY drink. New flavors will be announced here when they are ready.'],
 ['How do I stock it?', 'Tell us your business name, area and outlet type in the enquiry form. We will talk through stock, pricing and trade terms directly.'],
 ['Can I try a sample?', 'Choose Samples in the business form and send us your details. We will let you know when samples are available and how to get one.'],
 ['What is the price?', 'Retail pricing will be announced for launch. For wholesale enquiries, contact the team directly.'],
];
function Product() {
  return <section id="flavors" className="product-section product-section-dark"><div className="shell"><div className="section-line"><span className="tiny-label">THE DRINK</span><span className="tiny-label">ORIGINAL / 250 ML</span></div><div className="product-layout" data-reveal><ProductImage/><div className="product-copy"><h2>ORIGINAL.</h2><p className="product-lead">ENERGY drink. 250 ml.</p><p className="body-copy">Meet Original. Our first ENERGY drink, with a smooth taste and a zero-sugar formula as the goal.</p><dl className="product-specs"><div><dt>Flavor</dt><dd>Original</dd></div><div><dt>Can size</dt><dd>250 ml</dd></div><div><dt>Release</dt><dd>Coming soon</dd></div></dl><IngredientsButton /><p className="label-caption">Product concept shown. Final label to follow.</p></div></div></div></section>;
}
function Field({ id, label, error, children, className = '' }) { return <div className={`field ${className}`}><label htmlFor={id}>{label}</label>{children}{error && <p id={`${id}-error`} className="field-error">{error}</p>}</div>; }
function TradeForm({ form, setForm }) {
 const [errors, setErrors] = useState({}), [ready, setReady] = useState(false);
 const result = useRef(null);
 useEffect(() => { if (ready) result.current?.focus(); }, [ready]);
 const update = (key,value) => { setForm(p => ({...p,[key]:value})); setErrors(p=>({...p,[key]:undefined})); setReady(false); };
 const submit = e => { e.preventDefault(); const next=validateInquiry(form); setErrors(next); if(Object.keys(next).length) { requestAnimationFrame(()=>document.querySelector('[aria-invalid="true"]')?.focus()); return; } setReady(true); };
 const attr=key=>({'aria-invalid':!!errors[key],'aria-describedby':errors[key]?`${key}-error`:undefined});
 return <form className="trade-form" noValidate onSubmit={submit}><div className="form-title"><h3>LET’S TALK STOCK.</h3><p>Retail, samples or distribution.</p></div><div className="form-fields">{[['business','Business name','Your shop or company','organization'],['owner','Contact name','Your full name','name'],['location','City / area','e.g. Pokhara, Lakeside','address-level2']].map(([id,label,placeholder,autoComplete])=><Field key={id} id={id} label={label} error={errors[id]}><input id={id} value={form[id]} maxLength={120} autoComplete={autoComplete} placeholder={placeholder} required onChange={e=>update(id,e.target.value)} {...attr(id)} /></Field>)}<Field id="outlet" label="Business type" error={errors.outlet}><div className="select-field"><select id="outlet" value={form.outlet} required onChange={e=>update('outlet',e.target.value)} {...attr('outlet')}><option value="">Select your business</option>{['Grocery','Supermarket','Café / Gaming Zone','Distributor','Other'].map(x=><option key={x}>{x}</option>)}</select><ChevronDown size={16}/></div></Field><Field id="phone" label="Mobile number" error={errors.phone}><input id="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} value={form.phone} placeholder="98XXXXXXXX" required onChange={e=>update('phone',e.target.value)} {...attr('phone')}/></Field><Field id="request" label="Interested in"><div className="select-field"><select id="request" value={form.request} onChange={e=>update('request',e.target.value)}><option>Retailer enquiry</option><option>Distribution enquiry</option><option>Samples</option></select><ChevronDown size={16}/></div></Field></div><label className="consent"><input type="checkbox" checked={form.consent} onChange={e=>update('consent',e.target.checked)} {...attr('consent')}/><span>I agree to share these details with the ENERGY team through WhatsApp.</span></label>{errors.consent&&<p className="field-error" id="consent-error">{errors.consent}</p>}{ready?<div className="inquiry-ready" ref={result} tabIndex={-1} role="status"><p><Check size={17}/> Your enquiry is ready.</p><a className="cta form-submit" href={whatsappUrl(form)} target="_blank" rel="noopener noreferrer"><MessageCircle size={19}/><span>Continue on WhatsApp</span><ArrowUpRight size={19}/></a><p className="form-note">Review and send your message in WhatsApp.</p></div>:<button type="submit" className="cta form-submit"><span>Prepare message</span><ArrowRight size={19}/></button>}<p className="form-note">First release enquiries are open. The team will confirm samples, pricing and supply directly.</p></form>;
}
function Stockist({ form, setForm }) {
  return <section id="stockist" className="stockist-section light-section"><div className="shell stockist-layout"><div className="stockist-story" data-reveal><span className="tiny-label">STOCK ENERGY</span><h2>STOCK THE<br />BLACK CAN.</h2><p className="body-copy">Put ENERGY on your shelves. Grocery shops, supermarkets, cafés and gaming venues: tell us about your business. For distribution, tell us the areas you cover.</p><TradeInformation/><div className="trade-contact"><span className="tiny-label">CONTACT</span><a href="tel:+9779848951422">+977 984-8951422<ArrowUpRight size={24} /></a><p>Grocery · Supermarket · Café · Distributor</p></div></div><TradeForm form={form} setForm={setForm} /></div></section>;
}
function FAQ() {
  const [active, setActive] = useState(null);
  return <section id="faq" className="faq-section shell"><div data-reveal><h2>FAQ.</h2><a href="tel:+9779848951422" className="text-button">Contact us <ArrowUpRight size={17} /></a></div><div className="faq-list" data-reveal>{faq.map(([q, a], i) => <Disclosure key={q} title={q} open={active === i} onToggle={() => setActive(active === i ? null : i)}><p>{a}</p></Disclosure>)}</div></section>;
}
function Footer() {
  return <footer><div className="shell footer-main"><Logo /><nav aria-label="Footer navigation">{links.map(([name, id]) => <a key={id} href={`#${id}`}>{name}</a>)}</nav><a href="tel:+9779848951422" className="footer-phone"><Phone size={16} /> +977 984-8951422</a></div><div className="shell footer-legal"><p>Product concept. Final formula and label pending approval. Read the approved can label and consumption guidance before use.</p><div><span>© {new Date().getFullYear()} Energy Drink. All rights reserved.</span><span>NEPAL</span><PrivacyButton/><a href="#top">BACK TO TOP <ArrowUpRight size={12} /></a></div></div></footer>;
}
function App() {
 const [form,setForm]=useState(initialForm);
 useReveals();
 return <MotionConfig reducedMotion="user"><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main"><CinematicHero/><BrandStory/><Product/><Launch/><KnowYourCan/><Stockist form={form} setForm={setForm}/><FAQ/></main><Footer/><PrivacyNotice/></MotionConfig>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
