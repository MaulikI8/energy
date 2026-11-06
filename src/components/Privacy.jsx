import React, { useEffect, useId, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

const noticeKey = 'energy:privacy-notice:v1';

export function PrivacyButton() {
  const titleId = useId();
  return <Dialog.Root>
    <Dialog.Trigger asChild><button type="button" className="privacy-link">Privacy & cookies</button></Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="ingredient-overlay" />
      <Dialog.Content className="privacy-sheet" aria-labelledby={titleId}>
        <div className="privacy-sheet-top">
          <Dialog.Title id={titleId}>Privacy & cookies</Dialog.Title>
          <Dialog.Close asChild><button type="button" aria-label="Close privacy notice"><X size={22}/></button></Dialog.Close>
        </div>
        <Dialog.Description>This page explains how this website uses data and browser storage.</Dialog.Description>
        <div className="privacy-details">
          <h3>Cookies and browser storage</h3>
          <p>This website does not set advertising or analytics cookies. It stores one preference on your device to remember that you have dismissed the privacy notice. You can clear this through your browser settings. Hosting and sign-in services may use storage required to deliver and secure the site.</p>
          <h3>Business enquiries</h3>
          <p>The form prepares a message in your browser. Your details are not saved to a website database. They are passed to WhatsApp when you open the prepared message. You choose whether to send it. The ENERGY team uses information you send to respond to your enquiry and discuss supply.</p>
          <h3>External services</h3>
          <p>WhatsApp opens only when you follow a contact link or continue with an enquiry. Its own privacy terms apply. Hosting services may process technical request data to operate and secure this website.</p>
          <h3>Your information</h3>
          <p>For questions about information you have shared with the ENERGY team, or to request its correction or deletion, call <a href="tel:+9779848951422">+977 984-8951422</a>.</p>
          <h3>Product information</h3>
          <p>Product artwork is a concept. The formula, ingredients and nutrition are awaiting confirmation. Refer to Label & ingredients for the current status and the approved can label before consumption. This website does not take online payments or orders.</p>
        </div>
        <Dialog.Close asChild><button type="button" className="privacy-done">Done</button></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}

export default function PrivacyNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try { setVisible(localStorage.getItem(noticeKey) !== 'acknowledged'); }
    catch { setVisible(true); }
  }, []);
  const dismiss = () => {
    try { localStorage.setItem(noticeKey, 'acknowledged'); } catch { /* Storage may be disabled. The notice still closes for this visit. */ }
    setVisible(false);
  };
  if (!visible) return null;
  return <aside className="privacy-notice" aria-label="Cookie and privacy notice">
    <p className="privacy-notice-title">A note on privacy.</p>
    <p>No advertising or analytics cookies. We only save your choice to close this notice.</p>
    <div className="privacy-notice-actions"><PrivacyButton/><button className="privacy-done" type="button" onClick={dismiss}>Got it</button></div>
  </aside>;
}
