import React, { useId } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, X } from 'lucide-react';

export default function IngredientsButton() {
  const titleId = useId();
  return <Dialog.Root>
    <Dialog.Trigger asChild><button className="label-button" type="button">Label & ingredients <ArrowUpRight size={17}/></button></Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="ingredient-overlay" />
      <Dialog.Content className="ingredients-dialog ingredient-sheet" aria-labelledby={titleId}>
        <div className="dialog-top"><span className="eyebrow">PRODUCT INFORMATION</span><Dialog.Close asChild><button type="button" aria-label="Close label and ingredients"><X size={22}/></button></Dialog.Close></div>
        <span className="pending-status">Awaiting confirmation</span>
        <Dialog.Title id={titleId} className="ingredient-title">Label & ingredients</Dialog.Title>
        <Dialog.Description>The formula is still being developed. Zero sugar is our goal, but sugar content, caffeine, ingredients and nutrition are not confirmed yet. Approved details will be published here.</Dialog.Description>
        <p className="dialog-note">Refer to the approved physical product label before consumption.</p>
        <Dialog.Close asChild><button className="cta ingredient-close" type="button">Back to Original <ArrowUpRight size={18}/></button></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
