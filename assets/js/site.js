(function(){
  var d=document; d.documentElement.classList.add('js');
  var head=d.querySelector('.site-head');
  function onScroll(){ if(head) head.classList.toggle('scrolled', window.scrollY>8); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  var t=d.querySelector('.nav-toggle'), nav=d.querySelector('.nav');
  if(t&&nav){
    t.addEventListener('click',function(){var o=nav.classList.toggle('open');t.setAttribute('aria-expanded',o);t.textContent=o?'Close':'Menu';});
    nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');t.setAttribute('aria-expanded','false');t.textContent='Menu';}});
  }

  var els=[].slice.call(d.querySelectorAll('.rv'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el);});
    setTimeout(function(){els.forEach(function(el){el.classList.add('in');});},4000);
  } else els.forEach(function(el){el.classList.add('in');});

  var items=[].slice.call(d.querySelectorAll('[data-full]'));
  if(items.length){
    var lb=d.createElement('div'); lb.className='lb'; lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true'); lb.setAttribute('aria-label','Image viewer');
    lb.innerHTML='<img alt=""><button class="x" type="button">Close ✕</button>'+(items.length>1?'<button class="prev" type="button" aria-label="Previous image">‹</button><button class="next" type="button" aria-label="Next image">›</button>':'')+'<div class="count"></div>';
    d.body.appendChild(lb);
    var img=lb.querySelector('img'), cnt=lb.querySelector('.count'), i=0, last=null;
    function show(n){i=(n+items.length)%items.length; img.src=items[i].getAttribute('data-full'); img.alt=items[i].querySelector('img').alt; cnt.textContent=(i+1)+' / '+items.length;}
    function open(n){last=d.activeElement; show(n); lb.classList.add('open'); d.body.style.overflow='hidden'; lb.querySelector('.x').focus();}
    function close(){lb.classList.remove('open'); d.body.style.overflow=''; if(last) last.focus();}
    items.forEach(function(b,n){b.addEventListener('click',function(){open(n);});});
    lb.addEventListener('click',function(e){
      if(e.target.classList.contains('x')||e.target===lb) close();
      else if(e.target.classList.contains('prev')) show(i-1);
      else if(e.target.classList.contains('next')) show(i+1);
    });
    d.addEventListener('keydown',function(e){ if(!lb.classList.contains('open')) return;
      if(e.key==='Escape') close(); if(e.key==='ArrowLeft') show(i-1); if(e.key==='ArrowRight') show(i+1); });
  }
})();
