const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const savedTheme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.dataset.theme = savedTheme;

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
  $$('[data-theme-toggle]').forEach((button) => { button.textContent = theme === 'dark' ? '☀️' : '🌙'; });
}
function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char])); }
function cardTemplate(item) {
  return `<article class="card reveal"><div class="card-top"><span class="tag">${escapeHtml(item.category || 'ইসলাম')}</span>${item.source ? `<span class="source-mini">${escapeHtml(item.source)}</span>` : ''}</div>${item.arabic ? `<p class="arabic">${escapeHtml(item.arabic)}</p>` : ''}<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`;
}
function renderCards(selector, items) { const el = $(selector); if (el && items) el.innerHTML = items.map(cardTemplate).join(''); }
function allItems() { return ['bukhari', 'muslim', 'quran', 'dua', 'articles'].flatMap((key) => SITE_CONTENT[key].map((item) => ({ ...item, type: key }))); }
function typeLabel(type) { return { bukhari: 'সহীহ বুখারী', muslim: 'সহীহ মুসলিম', quran: 'কুরআন', dua: 'দোয়া', articles: 'প্রবন্ধ' }[type] || type; }
function wireSearch() {
  const input = $('#site-search'); const output = $('#search-results'); if (!input || !output) return;
  const search = () => {
    const query = input.value.trim().toLowerCase(); if (!query) { output.innerHTML = ''; return; }
    const results = allItems().filter((item) => `${item.title} ${item.text} ${item.category} ${item.source || ''} ${item.arabic || ''}`.toLowerCase().includes(query));
    output.innerHTML = results.length ? results.map((item) => `<article class="card"><span class="tag">${typeLabel(item.type)} • ${escapeHtml(item.category)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p>${item.source ? `<p class="source">— ${escapeHtml(item.source)}</p>` : ''}</article>`).join('') : '<p class="muted">কোনো ফলাফল পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।</p>';
  };
  input.addEventListener('input', search); input.focus();
}
function renderCategories() {
  const element = $('[data-categories]'); if (!element) return;
  const groups = allItems().reduce((acc, item) => { acc[item.category] = (acc[item.category] || 0) + 1; return acc; }, {});
  element.innerHTML = Object.entries(groups).sort(([a], [b]) => a.localeCompare(b, 'bn')).map(([name, count]) => `<article class="card reveal"><span class="tag">${count}টি কনটেন্ট</span><h3>${escapeHtml(name)}</h3><p>${escapeHtml(name)} বিষয়ে হাদিস, আয়াত, দোয়া ও প্রবন্ধ একসাথে পড়ুন।</p></article>`).join('');
}
function renderDailyHadith() {
  const target = $('[data-daily-hadith]'); if (!target) return;
  const hadith = SITE_CONTENT.hadith; const index = Math.floor(Date.now() / 86400000) % hadith.length;
  target.innerHTML = `<div class="daily-card glass">${cardTemplate(hadith[index])}</div>`;
}
function boot() {
  ['bukhari', 'muslim', 'quran', 'dua', 'hadith', 'articles', 'featured'].forEach((key) => renderCards(`[data-render="${key}"]`, SITE_CONTENT[key]));
  renderCategories(); renderDailyHadith(); wireSearch(); setTheme(document.documentElement.dataset.theme);
  const menu = $('#mobile-menu'); $('#menu-toggle')?.addEventListener('click', (event) => { menu?.classList.toggle('open'); event.currentTarget.setAttribute('aria-expanded', String(menu?.classList.contains('open'))); });
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: 0.12 });
  $$('.reveal').forEach((element) => observer.observe(element));
  if ('serviceWorker' in navigator) navigator.serviceWorker.register(new URL('sw.js', location.origin + location.pathname.replace(/(?:pages\/.*|[^/]+)$/,'')).href).catch(() => {});
}
document.addEventListener('DOMContentLoaded', boot);
