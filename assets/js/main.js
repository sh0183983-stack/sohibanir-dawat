const $=(selector,context=document)=>context.querySelector(selector);
const $$=(selector,context=document)=>[...context.querySelectorAll(selector)];

const savedTheme=localStorage.getItem('theme')||'light';
document.documentElement.dataset.theme=savedTheme;

function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  localStorage.setItem('theme',theme);
  $$('[data-theme-toggle]').forEach((button)=>{button.textContent=theme==='dark'?'☀️':'🌙';});
}

function escapeHtml(value){
  return String(value).replace(/[&<>"]/g,(char)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));
}

function cardTemplate(item){
  return `<article class="card reveal"><span class="tag">${escapeHtml(item.category||'ইসলাম')}</span>${item.arabic?`<p class="arabic">${escapeHtml(item.arabic)}</p>`:''}<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p>${item.source?`<p class="source">— ${escapeHtml(item.source)}</p>`:''}</article>`;
}

function renderCards(selector,items){
  const element=$(selector);
  if(!element||!items)return;
  element.innerHTML=items.map(cardTemplate).join('');
}

function allItems(){
  return [...SITE_CONTENT.hadith.map((item)=>({...item,type:'হাদিস'})),...SITE_CONTENT.quran.map((item)=>({...item,type:'কুরআন'})),...SITE_CONTENT.articles.map((item)=>({...item,type:'প্রবন্ধ'}))];
}

function wireSearch(){
  const input=$('#site-search');
  const output=$('#search-results');
  if(!input||!output)return;
  const search=()=>{
    const query=input.value.trim().toLowerCase();
    if(!query){output.innerHTML='';return;}
    const results=allItems().filter((item)=>`${item.title} ${item.text} ${item.category} ${item.arabic||''}`.toLowerCase().includes(query));
    output.innerHTML=results.length?results.map((item)=>`<article class="card"><span class="tag">${escapeHtml(item.type)} • ${escapeHtml(item.category)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join(''):'<p class="muted">কোনো ফলাফল পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।</p>';
  };
  input.addEventListener('input',search);
}

function renderCategories(){
  const element=$('[data-categories]');
  if(!element)return;
  const groups=allItems().reduce((acc,item)=>{acc[item.category]=(acc[item.category]||0)+1;return acc;},{});
  element.innerHTML=Object.entries(groups).sort(([a],[b])=>a.localeCompare(b,'bn')).map(([name,count])=>`<article class="card reveal"><span class="tag">${count}টি কনটেন্ট</span><h3>${escapeHtml(name)}</h3><p>${escapeHtml(name)} বিষয়ে হাদিস, আয়াত ও প্রবন্ধ একসাথে পড়ুন।</p></article>`).join('');
}

function boot(){
  renderCards('[data-render="hadith"]',SITE_CONTENT.hadith);
  renderCards('[data-render="quran"]',SITE_CONTENT.quran);
  renderCards('[data-render="articles"]',SITE_CONTENT.articles);
  renderCategories();
  wireSearch();
  $$('[data-theme-toggle]').forEach((button)=>{button.textContent=document.documentElement.dataset.theme==='dark'?'☀️':'🌙';button.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));});
  const menu=$('#mobile-menu');
  $('#menu-toggle')?.addEventListener('click',(event)=>{menu?.classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',String(menu?.classList.contains('open')));});
  const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting)entry.target.classList.add('visible');}),{threshold:.12});
  $$('.reveal').forEach((element)=>observer.observe(element));
}

document.addEventListener('DOMContentLoaded',boot);
