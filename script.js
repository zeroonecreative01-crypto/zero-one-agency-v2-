const cursor=document.querySelector(".cursor-glow");
const progress=document.querySelector(".scroll-progress span");
const nav=document.querySelector(".nav-wrap");
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if(cursor&&window.matchMedia("(pointer:fine)").matches&&!reduced){
  addEventListener("pointermove",e=>{
    cursor.style.left=e.clientX+"px";
    cursor.style.top=e.clientY+"px";
    cursor.style.opacity="1";
  });
  addEventListener("pointerleave",()=>cursor.style.opacity="0");
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const delay=entry.target.dataset.delay||0;
      entry.target.style.transitionDelay=delay+"ms";
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12,rootMargin:"0px 0px -50px"});

document.querySelectorAll(".reveal").forEach((el,i)=>{
  el.dataset.delay=Math.min((i%6)*55,275);
  observer.observe(el);
});

function updateScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  const pct=max>0?(scrollY/max)*100:0;
  if(progress) progress.style.width=pct+"%";
  if(nav) nav.classList.toggle("scrolled",scrollY>30);
}
addEventListener("scroll",updateScroll,{passive:true});
updateScroll();

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",e=>{
    const id=link.getAttribute("href");
    if(!id||id==="#")return;
    const target=document.querySelector(id);
    if(!target)return;
    e.preventDefault();
    target.scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"});
  });
});

const menu=document.querySelector(".menu");
const mobileLinks=[...document.querySelectorAll(".desktop-nav a")];
if(menu){
  menu.addEventListener("click",()=>{
    const open=menu.getAttribute("aria-expanded")==="true";
    menu.setAttribute("aria-expanded",String(!open));
    document.body.classList.toggle("menu-open",!open);
  });
}
mobileLinks.forEach(link=>link.addEventListener("click",()=>{
  menu?.setAttribute("aria-expanded","false");
  document.body.classList.remove("menu-open");
}));

if(!reduced){
  document.querySelectorAll(".magnetic").forEach(el=>{
    el.addEventListener("pointermove",e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left-r.width/2)*.12;
      const y=(e.clientY-r.top-r.height/2)*.12;
      el.style.transform=`translate3d(${x}px,${y}px,0)`;
    });
    el.addEventListener("pointerleave",()=>el.style.transform="");
  });
}

const art=document.querySelector(".hero-art");
if(art&&!reduced){
  addEventListener("scroll",()=>{
    const y=Math.min(scrollY*.08,55);
    art.style.transform=`translate3d(0,${y}px,0)`;
  },{passive:true});
}
const island=document.querySelector('.hero-island');const heroArt=document.querySelector('.hero-art');if(island&&heroArt&&window.matchMedia('(pointer:fine)').matches){heroArt.addEventListener('pointermove',e=>{const r=heroArt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;island.style.transform=`translate(calc(-50% + ${x*14}px),calc(-50% + ${y*10}px)) rotateX(${58-y*5}deg) rotateZ(${-7+x*5}deg)`});heroArt.addEventListener('pointerleave',()=>island.style.transform='translate(-50%,-50%) rotateX(58deg) rotateZ(-7deg)');}
