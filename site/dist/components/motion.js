export function initializeMotion(config) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Появления один раз: прочитанные секции не исчезают при обратном скролле.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  if (config.images.petal && !reducedMotion) {
    for (let index = 0; index < (innerWidth < 760 ? 6 : 9); index++) {
      const petal = document.createElement('span');
      petal.className = 'petal';
      petal.style.left = `${5 + index * (innerWidth < 760 ? 18 : 11)}%`;
      petal.style.setProperty('--duration', `${16 + index % 4 * 3}s`);
      petal.style.setProperty('--delay', `${-index * 3}s`);
      petal.style.setProperty('--drift', `${index % 2 ? -70 : 90}px`);
      petal.style.setProperty('--rotation', `${index % 2 ? -320 : 280}deg`);
      document.getElementById('petals').append(petal);
    }
  }
  const layers = [...document.querySelectorAll('[data-parallax]')];
  let framePending = false;
  function updateParallax() {
    framePending = false;
    if (reducedMotion) return;
    layers.forEach(layer => {
      if (layer.closest('[hidden]')) return;
      const bounds = layer.parentElement.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > innerHeight) return;
      const distance = (innerHeight / 2 - bounds.top - bounds.height / 2) * Number(layer.dataset.parallax);
      layer.style.transform = `translate3d(0, ${Math.max(-45, Math.min(45, distance))}px, 0)`;
    });
  }
  function requestFrame() {
    if (!framePending) {
      framePending = true;
      requestAnimationFrame(updateParallax);
    }
  }
  window.addEventListener('scroll', requestFrame, { passive: true });
  window.addEventListener('resize', requestFrame, { passive: true });
  return () => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      document.body.classList.add('main-entered');
      updateParallax();
    });
  };
}
