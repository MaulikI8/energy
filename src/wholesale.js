// Set only after brand approval. Null values intentionally disable price claims.
export const TRADE = { cansPerCrate: null, pricePerCrateNpr: null, moqCrates: null };
export const WHATSAPP = '9779848951422';
export function calculateOrder(crates, trade = TRADE) {
  const quantity = Number(crates);
  if (!Number.isInteger(quantity) || quantity < 5 || quantity > 50) throw new RangeError('Choose 5-50 crates');
  return { crates: quantity, cans: trade.cansPerCrate ? quantity * trade.cansPerCrate : null, total: trade.pricePerCrateNpr ? quantity * trade.pricePerCrateNpr : null };
}
export function validateInquiry(form) {
  const errors = {};
  for (const key of ['business','owner','location','outlet']) if (!form[key]?.trim()) errors[key] = 'Please complete this field.';
  const phone = (form.phone || '').replace(/[\s()-]/g, '');
  if (!/^(?:\+?977)?9[78]\d{8}$/.test(phone)) errors.phone = 'Enter a valid Nepali mobile number.';
  if (!form.consent) errors.consent = 'Please agree to share these details on WhatsApp.';
  return errors;
}
export function inquiryMessage(form) {
  return ['RETAILER ENQUIRY  |  ENERGY','',`Business: ${form.business.trim()}`,`Contact name: ${form.owner.trim()}`,`Location: ${form.location.trim()}`,`Business type: ${form.outlet}`,`Mobile: ${form.phone.trim()}`,`Interested in: ${form.request || 'Retailer enquiry'}`,'','Please share availability and relevant trade information for my business.'].join('\n');
}
export function whatsappUrl(form) { return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(inquiryMessage(form))}`; }
