import { useEffect } from 'react';

export const damp = (current, target, deltaMs, duration = 150) => current + (target - current) * (1 - Math.exp(-Math.min(deltaMs, 64) / duration));

// Native page scrolling stays untouched. Only the product compositing layer moves.
export function useProductMotion(container, product, enabled) {
  useEffect(() => {
    const region = container.current, element = product.current;
    if (!region || !element) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(pointer: fine)');
    let raf = 0, previous = 0, dirty = true;
    let current = { turn: -8, lift: 0, yaw: 0, pitch: 0 };
    let target = { ...current }, pointer = { x: 0, y: 0 };
    const allowed = () => enabled && !reduced.matches && !document.hidden;
    const paint = () => { element.style.transform = `translate3d(0,${current.lift.toFixed(2)}px,0) rotateX(${current.pitch.toFixed(2)}deg) rotateY(${current.yaw.toFixed(2)}deg) rotateZ(${current.turn.toFixed(2)}deg)`; };
    function frame(time) {
      raf = 0;
      if (!allowed()) return;
      if (dirty) {
        const rect = region.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
        target = { turn: -8 + p * 20, lift: p * 58, yaw: pointer.x * 5, pitch: pointer.y * -3 };
        dirty = false;
      }
      const dt = previous ? time - previous : 16.667;
      previous = time;
      let remaining = 0;
      for (const key of Object.keys(current)) {
        current[key] = damp(current[key], target[key], dt);
        remaining += Math.abs(current[key] - target[key]);
      }
      paint();
      if (remaining > .02) raf = requestAnimationFrame(frame);
      else previous = 0;
    }
    function schedule() { dirty = true; if (allowed() && !raf) raf = requestAnimationFrame(frame); }
    function reset() {
      cancelAnimationFrame(raf); raf = 0; previous = 0;
      if (!enabled || reduced.matches) { current = { turn: -8, lift: 0, yaw: 0, pitch: 0 }; paint(); }
      else schedule();
    }
    function move(event) {
      if (!fine.matches || !allowed()) return;
      const box = region.getBoundingClientRect();
      pointer = { x: (event.clientX - box.left) / box.width * 2 - 1, y: (event.clientY - box.top) / box.height * 2 - 1 };
      schedule();
    }
    function leave() { pointer = { x: 0, y: 0 }; schedule(); }
    paint(); schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    region.addEventListener('pointermove', move, { passive: true });
    region.addEventListener('pointerleave', leave, { passive: true });
    reduced.addEventListener('change', reset);
    document.addEventListener('visibilitychange', reset);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      region.removeEventListener('pointermove', move);
      region.removeEventListener('pointerleave', leave);
      reduced.removeEventListener('change', reset);
      document.removeEventListener('visibilitychange', reset);
    };
  }, [container, product, enabled]);
}

export function useReveals() {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    const nodes = [...document.querySelectorAll('[data-reveal]')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    nodes.forEach(node => {
      if (node.getBoundingClientRect().top > innerHeight) node.classList.add('will-reveal');
      observer.observe(node);
    });
    const revealAll = () => { if (reduced.matches) nodes.forEach(n => n.classList.add('is-revealed')); };
    reduced.addEventListener('change', revealAll);
    return () => { observer.disconnect(); reduced.removeEventListener('change', revealAll); nodes.forEach(n => n.classList.remove('will-reveal')); };
  }, []);
}
