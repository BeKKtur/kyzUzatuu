// Заполняем страницу данными. В HTML остаётся только её структура.
export function renderContent(config) {
  const { event, texts, venue, program, images } = config;
  document.title = `${event.title} — ${event.bride}`;
  document.querySelector('meta[name="description"]').content = texts.invitation;
  document.querySelectorAll('[data-text]').forEach(element => {
    element.textContent = texts[element.dataset.text] || '';
  });
  document.querySelectorAll('[data-event]').forEach(element => {
    element.textContent = event[element.dataset.event] || '';
  });
  const imageProperties = { intro: '--intro-image', mountains: '--mountains-image', hall: '--hall-image', closing: '--closing-image', petal: '--petal-image' };
  Object.entries(imageProperties).forEach(([key, property]) => {
    if (images[key]) document.documentElement.style.setProperty(property, `url("${new URL(images[key], document.baseURI).href.replaceAll('"', '%22')}")`);
  });
  const mountain = document.getElementById('mountain-photo');
  mountain.src = images.mountains;
  mountain.alt = texts.imageAlt.mountains;
  const hall = document.getElementById('hall-photo');
  hall.src = images.hall;
  hall.alt = texts.imageAlt.hall;
  document.getElementById('seal').ariaLabel = texts.accessibility.openSeal;
  document.getElementById('navigation').ariaLabel = texts.accessibility.mainNavigation;
  document.getElementById('countdown').ariaLabel = texts.accessibility.countdown;
  document.getElementById('venue-name').textContent = venue.name;
  document.getElementById('photo-caption').textContent = venue.name;
  document.getElementById('venue-address').textContent = venue.address;
  const map = document.getElementById('map-link');
  try {
    const url = new URL(venue.mapUrl);
    if (url.protocol === 'https:' || url.protocol === 'http:') map.href = url.href;
    else map.hidden = true;
  } catch { map.hidden = true; }
  ['home', 'date', 'program', 'venue'].forEach((id, index) => {
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = texts.nav[index];
    document.getElementById('nav-links').append(link);
  });
  program.forEach((item, index) => {
    const row = document.createElement('article');
    row.className = 'timeline-item reveal';
    const number = document.createElement('span');
    number.className = 'timeline-number';
    number.textContent = String(index + 1).padStart(2, '0');
    number.ariaHidden = 'true';
    const copy = document.createElement('div');
    copy.className = 'timeline-copy';
    const time = document.createElement('time');
    time.dateTime = item.time;
    time.textContent = item.time;
    const title = document.createElement('h3');
    title.textContent = item.title;
    const description = document.createElement('p');
    description.textContent = item.description;
    copy.append(time, title, description);
    row.append(number, copy);
    document.getElementById('timeline').append(row);
  });
  const date = new Date(event.date);
  const dateOptions = { timeZone: 'Asia/Bishkek' };
  if (!Number.isNaN(date.getTime())) {
    document.getElementById('date-day').textContent = new Intl.DateTimeFormat('ru-RU', { ...dateOptions, day: '2-digit' }).format(date);
    document.getElementById('date-month').textContent = new Intl.DateTimeFormat('ru-RU', { ...dateOptions, month: 'long' }).format(date);
    document.getElementById('date-year').textContent = new Intl.DateTimeFormat('ru-RU', { ...dateOptions, year: 'numeric' }).format(date);
  }
}
