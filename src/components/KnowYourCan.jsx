import React from 'react';
import IngredientsButton from './IngredientsButton';

export default function KnowYourCan() {
  return <section className="know-your-can" aria-labelledby="know-your-can-title">
    <div className="shell know-your-can-layout">
      <h2 id="know-your-can-title">KNOW YOUR<br/><span>CAN.</span></h2>
      <div className="know-your-can-copy">
        <p className="know-your-can-lead">Sugar. Caffeine. Ingredients.</p>
        <p>Know what goes into your can before you choose it. Take a look at the product information before your first sip.</p>
      </div>
      <div className="know-your-can-action"><IngredientsButton/></div>
    </div>
  </section>;
}
