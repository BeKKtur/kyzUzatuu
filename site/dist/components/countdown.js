export function initializeCountdown(config) {
  const container = document.getElementById('countdown');
  const values = config.texts.countdownLabels.map(label => {
    const unit = document.createElement('div');
    unit.className = 'countdown-unit';
    const number = document.createElement('strong');
    const caption = document.createElement('span');
    caption.textContent = label;
    unit.append(number, caption);
    container.append(unit);
    return number;
  });
  const target = new Date(config.event.date).getTime();
  function update() {
    const seconds = Math.max(0, Math.floor((target - Date.now()) / 1000)) || 0;
    const remaining = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
    values.forEach((element, index) => { element.textContent = String(remaining[index]).padStart(2, '0'); });
    if (target <= Date.now()) document.getElementById('countdown-status').textContent = config.texts.countdownEnded;
  }
  update();
  setInterval(() => { if (!document.hidden) update(); }, 1000);
}
