import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const media = import.meta.env.BASE_URL + 'media/';

export default function BrandStory() {
  return (
    <section id="taste" className="brand-story" aria-labelledby="brand-story-title">
      <div className="shell brand-story-layout">
        <figure className="brand-story-photo">
          <img src={media + 'campaign-white.webp'} alt="ENERGY Original black can and clear ice on a seamless white studio background" width="1536" height="1024" loading="lazy" decoding="async" />
          <figcaption>ENERGY / ORIGINAL</figcaption>
        </figure>
        <div className="brand-story-copy">
          <span className="tiny-label">ENERGY ORIGINAL</span>
          <h2 id="brand-story-title">TASTE COMES FIRST.</h2>
          <p className="brand-story-lead">Make the first sip count.</p>
          <p>We want Original to earn its place in your fridge for one reason: you enjoy the taste. That is where the drink starts.</p>
          <div className="brand-story-details">
            <div>
              <h3>Zero sugar in mind.</h3>
              <p>A smooth taste and a zero-sugar recipe are the goal. See Label & ingredients for product information.</p>
            </div>
            <div>
              <h3>A price within reach.</h3>
              <p>An accessible price is part of the idea. Retail and trade pricing will be announced for the first release.</p>
            </div>
          </div>
          <a className="brand-story-link" href="#flavors">Meet Original <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
