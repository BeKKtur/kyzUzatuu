// Последовательность физического открытия. Письмо никогда не поднимается
// над z-index передней стенки: оно выходит через верхнюю часть кармана.
export function initializeEnvelope(config, onEnter) {
  const intro = document.getElementById('intro');
  const envelope = document.getElementById('envelope');
  const seal = document.getElementById('seal');
  const continueButton = document.getElementById('continue');
  const status = document.getElementById('intro-status');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = duration => new Promise(resolve => setTimeout(resolve, reducedMotion ? 0 : duration));
  let opening = false;
  let entering = false;

  seal.addEventListener('click', async () => {
    if (opening) return;
    opening = true;
    seal.disabled = true;
    status.textContent = config.texts.opening;
    document.querySelector('.tap-cue').hidden = true;
    envelope.dataset.state = 'unsealed';
    await wait(700);
    envelope.dataset.state = 'open';
    // Клапан меняет слой, только когда уже повернулся назад.
    await wait(680);
    envelope.classList.add('flap-behind');
    await wait(650);
    envelope.dataset.state = 'rising';
    intro.classList.add('ready');
    await wait(2350);
    envelope.dataset.state = 'ready';
    await wait(1450);
    status.textContent = config.texts.letterEyebrow;
    continueButton.hidden = false;
    continueButton.focus({ preventScroll: true });
  });

  continueButton.addEventListener('click', async () => {
    if (entering) return;
    entering = true;
    continueButton.disabled = true;
    document.getElementById('main').hidden = false;
    intro.classList.add('leaving');
    onEnter();
    await wait(1200);
    intro.hidden = true;
    document.body.classList.remove('intro-active');
    document.querySelector('.nav-brand').focus({ preventScroll: true });
  });
}
