// Control overlay, scroll reveal y nav active
document.addEventListener('DOMContentLoaded', ()=>{
  const overlay = document.querySelector('.intro-overlay');
  const scrollHint = document.getElementById('scrollHint');

  let autoTimer;
  const overlayClose = ()=>{
    if(!overlay) return;
    // apply fade class (CSS transition handles fade)
    overlay.classList.add('overlay-hide');
    if(autoTimer) clearTimeout(autoTimer);
    // wait for transitionend on opacity then remove from DOM
    const onEnd = (e)=>{
      if(e.propertyName === 'opacity'){
        if(overlay.parentNode) overlay.parentNode.removeChild(overlay);
        overlay.removeEventListener('transitionend', onEnd);
      }
    };
    overlay.addEventListener('transitionend', onEnd);
    window.removeEventListener('wheel', onFirstScroll);
    window.removeEventListener('touchstart', onFirstScroll);
    if(overlay){ overlay.removeEventListener('wheel', onOverlayWheel); overlay.removeEventListener('touchstart', onOverlayTouch); }
  };

  const onFirstScroll = ()=>{ overlayClose(); };
  const onOverlayWheel = ()=>{ overlayClose(); };
  const onOverlayTouch = ()=>{ overlayClose(); };

  if(scrollHint){
    scrollHint.addEventListener('click', (e)=>{
      e.preventDefault();
      overlayClose();
      const about = document.getElementById('about');
      about?.scrollIntoView({behavior:'smooth', block:'start'});
    });
  }

  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') overlayClose(); });

  if(overlay){
    overlay.addEventListener('click', (e)=>{ if(e.target === overlay) overlayClose(); });
    overlay.addEventListener('wheel', onOverlayWheel, {passive:false});
    overlay.addEventListener('touchstart', onOverlayTouch, {passive:true});
  }

  window.addEventListener('wheel', onFirstScroll, {passive:true});
  window.addEventListener('touchstart', onFirstScroll, {passive:true});
  autoTimer = setTimeout(()=>overlayClose(), 2000);

  // scroll reveal
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); } });
  },{threshold:0.12});
  sections.forEach(s=>observer.observe(s));

  // smooth scroll for nav links
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(a=>{ a.addEventListener('click', (e)=>{ const href = a.getAttribute('href'); if(href && href.startsWith('#')){ e.preventDefault(); const el = document.querySelector(href); el?.scrollIntoView({behavior:'smooth', block:'start'}); } }); });

  // nav active link observer
  const sects = [...document.querySelectorAll('header, section')].filter(s=>s.id);
  const obs2 = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ const id = e.target.id; navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === `#${id}`)); } }); },{threshold:0.45});
  sects.forEach(s=>obs2.observe(s));
});

// Contact form injection + mailto handling
document.addEventListener('DOMContentLoaded', ()=>{
  const openBtn = document.getElementById('openContactForm');
  const container = document.getElementById('contactFormContainer');
  if(!openBtn || !container) return;

  function createForm(){
    if(container.querySelector('#contactForm')) return; // ya creado
    container.innerHTML = `
      <form id="contactForm" class="contact-form">
        <input type="text" name="name" id="cf-name" placeholder="Tu nombre" required />
        <input type="email" name="email" id="cf-email" placeholder="Tu correo" required />
        <textarea name="message" id="cf-message" placeholder="Tu mensaje" required></textarea>
        <div class="form-actions">
          <button type="submit" class="btn-submit">Enviar</button>
          <button type="button" class="btn-cancel">Cancelar</button>
        </div>
      </form>
    `;

    const form = container.querySelector('#contactForm');
    const cancel = form.querySelector('.btn-cancel');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = form.querySelector('#cf-name').value.trim();
      const email = form.querySelector('#cf-email').value.trim();
      const message = form.querySelector('#cf-message').value.trim();
      if(!name || !email || !message){
        alert('Por favor completa todos los campos.');
        return;
      }
      const subject = `Contacto desde portfolio — ${name}`;
      const body = `Nombre: ${name}%0D%0ACorreo: ${email}%0D%0A%0D%0A${encodeURIComponent(message)}`;
      // abrir cliente de correo
      window.location.href = `mailto:cardenesyunai@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      // mostrar mensaje de éxito
      container.innerHTML = '<div class="contact-success">Gracias — se abrirá tu cliente de correo para enviar el mensaje.</div>';
    });
    cancel.addEventListener('click', ()=>{ container.innerHTML = ''; });
  }

  openBtn.addEventListener('click', createForm);
});
