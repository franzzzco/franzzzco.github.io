'use strict';
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function closeMenu(){menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');}
menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){closeMenu();menuButton.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('header'))closeMenu();});
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window){
 if(!motion.matches){const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');reveal.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('pending');reveal.observe(el);});}

}
const art=document.querySelector('.hero-art');
if(window.matchMedia('(hover: hover) and (pointer: fine)').matches){art.addEventListener('pointermove',e=>{if(motion.matches)return;const b=art.getBoundingClientRect();const x=(e.clientX-b.left)/b.width-.5;const y=(e.clientY-b.top)/b.height-.5;art.style.transform=`perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg) rotate(-3deg)`;});art.addEventListener('pointerleave',()=>art.style.transform='');}
document.querySelectorAll('[data-interest]').forEach(link=>link.addEventListener('click',()=>{const value=link.dataset.interest;document.querySelectorAll('input[name="service"]').forEach(input=>input.checked=input.value===value);}));
document.querySelector('#contact-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;const name=form.elements.name;const business=form.elements.business;[name,business].forEach(input=>input.setCustomValidity(input.value.trim()?'':'Preencha este campo.'));if(!form.reportValidity())return;const service=form.elements.service.value;const message=`Olá! Vim pelo site da Franzzz. Meu nome é ${name.value.trim()}, da empresa ${business.value.trim()}. Tenho interesse em ${service.toLowerCase()} e gostaria de conversar sobre o trabalho de vocês.`;const url=`https://wa.me/5555991404483?text=${encodeURIComponent(message)}`;window.open(url,'_blank','noopener,noreferrer');const status=document.querySelector('#form-status');status.textContent='Sua mensagem está pronta. Se o WhatsApp não abriu, ';const fallback=document.createElement('a');fallback.href=url;fallback.target='_blank';fallback.rel='noopener noreferrer';fallback.textContent='clique aqui para continuar ↗';fallback.style.textDecoration='underline';status.append(fallback);});
document.querySelectorAll('#contact-form > input').forEach(input=>input.addEventListener('input',()=>input.setCustomValidity('')));
document.querySelector('#year').textContent=new Date().getFullYear();

/* O CTA flutuante aparece somente depois da hero e antes da seção de contato.
   Isso evita cobrir a mensagem principal em telas pequenas. */
const floatingCTA=document.querySelector('.mobile-cta');
if(floatingCTA){
  const updateFloatingCTA=()=>{
    const heroRect=document.querySelector('.hero').getBoundingClientRect();
    const contactRect=document.querySelector('#contato').getBoundingClientRect();
    const isMobile=window.matchMedia('(max-width: 760px)').matches;
    const shouldShow=isMobile && heroRect.bottom<=window.innerHeight*0.5 && contactRect.top>window.innerHeight*0.7;
    floatingCTA.classList.toggle('hidden',!shouldShow);
    floatingCTA.toggleAttribute('inert',!shouldShow);
    floatingCTA.setAttribute('aria-hidden',String(!shouldShow));
  };
  updateFloatingCTA();
  document.addEventListener('scroll',updateFloatingCTA,{passive:true});
  window.addEventListener('resize',updateFloatingCTA,{passive:true});
}

/* Exibe a logo original PNG quando existir. Sem ela, usa a marca tipográfica
   provisória (SVG) para que nenhum espaço apresente imagem quebrada. */
document.querySelectorAll('img[data-fallback]').forEach(img=>{
  const loadFallback=()=>{
    if(img.dataset.fallbackApplied==='true')return;
    img.dataset.fallbackApplied='true';
    img.src=img.dataset.fallback;
  };
  img.addEventListener('error',loadFallback,{once:true});
  if(img.complete && img.naturalWidth===0)loadFallback();
});
