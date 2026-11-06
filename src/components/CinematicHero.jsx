import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const media = import.meta.env.BASE_URL + 'media/';

export default function CinematicHero() {
  const root = useRef(null);
  const video = useRef(null);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [compact, setCompact] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [failed, setFailed] = useState(false);
  const loadFilm = ready && !reduced && !failed;

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const screen = matchMedia('(max-width: 600px)');
    const updateMotion = () => setReduced(preference.matches || !!navigator.connection?.saveData);
    const updateSize = () => setCompact(screen.matches);
    updateMotion();
    updateSize();
    setReady(true);
    preference.addEventListener('change', updateMotion);
    screen.addEventListener('change', updateSize);
    return () => {
      preference.removeEventListener('change', updateMotion);
      screen.removeEventListener('change', updateSize);
    };
  }, []);

  useEffect(() => {
    const film = video.current;
    if (!film || !loadFilm) return;
    let inView = true;
    let live = true;
    const sync = () => {
      if (!live) return;
      if (inView && !document.hidden) {
        film.play().catch(() => { if (live) setHasFrame(false); });
      } else film.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= .08;
      sync();
    }, { threshold: [0, .08], rootMargin: '-88px 0px 0px' });
    observer.observe(root.current);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      live = false;
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      film.pause();
    };
  }, [loadFilm, compact]);

  return (
    <section id="top" ref={root} className="cinema-hero cinema-hero-campaign" aria-labelledby="hero-heading">
      <div className="cinema-stage" aria-hidden="true">
        <img className="cinema-poster" src={media + 'film-poster-v2.webp'} fetchPriority="high" alt="" width="1600" height="900" />
        <video
          ref={video}
          className={`cinema-video ${hasFrame && loadFilm ? 'has-frame' : ''}`}
          src={loadFilm ? media + (compact ? 'energy-film-small-v2.mp4' : 'energy-film-v2.mp4') : undefined}
          poster={media + 'film-poster-v2.webp'}
          autoPlay muted loop playsInline preload="metadata" disablePictureInPicture
          onPlaying={() => setHasFrame(true)} onError={() => setFailed(true)}
        />
        <div className="cinema-edge" />
      </div>
      <div className="shell cinema-content">
        <div className="cinema-copy">
          <h1 id="hero-heading"><span className="hero-opening">CRACK OPEN</span><span className="hero-original">ORIGINAL.</span></h1>
          <p className="hero-product-line"><span>ENERGY DRINK</span><span>250 ML</span><span>COMING SOON</span></p>
          <div className="cinema-actions">
            <a href="#taste" className="hero-discover">MEET ORIGINAL <ArrowDown size={24} strokeWidth={1.5}/></a>
          </div>
        </div>
      </div>
      <div className="shell cinema-bottom">
        <a href="#taste" className="cinema-scroll"><ArrowDown size={16}/> Meet ENERGY</a>
      </div>
    </section>
  );
}
