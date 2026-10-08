/* EDIT ME: brand, currency, products */
const CONFIG={brand:"KELZZ WRLD",currency:"₦"};
const SIZES=["XS","S","M","L","XL","XXL"],CHART=[["XS",56,66],["S",58,68],["M",60,70],["L",62,72],["XL",64,74],["XXL",66,76]];
const POLY="60% polyester, 40% cotton. Heavyweight brushed fleece.",COT="100% combed cotton. Dense, soft jersey.";
const CATS=[["all","All"],["hoodies","Hoodies"],["tshirts","T-Shirts"],["sweatshirts","Sweatshirts"],["sweatpants","Sweatpants"],["new","New"]];
const PRODUCTS=[
{id:"oversized-hoodie",name:"Essential Oversized Hoodie",cat:"hoodies",shape:"hoodie",price:48000,badge:"Best Seller",desc:"Heavyweight fleece with a dropped shoulder and a relaxed, boxy fit.",fabric:POLY,colors:[["Black","#161616"],["Ash","#8c8c88"],["Cream","#eae5d9"]]},
{id:"classic-tee",name:"Classic Cotton T-Shirt",cat:"tshirts",shape:"tee",price:22000,desc:"The everyday tee in dense cotton with a clean, durable neckline.",fabric:COT,colors:[["White","#f4f3ef"],["Black","#161616"],["Stone","#b9b3a6"]]},
{id:"logo-hoodie",name:"Signature Logo Hoodie",cat:"hoodies",shape:"hoodie",price:52000,badge:"New",isNew:1,desc:"Embroidered chest logo and a lined hood.",fabric:POLY,colors:[["Charcoal","#3a3a38"],["Cream","#eae5d9"],["Cobalt","#2f3cff"]]},
{id:"crewneck",name:"Everyday Crewneck",cat:"sweatshirts",shape:"crew",price:38000,desc:"A soft, structured crewneck made to wear on repeat.",fabric:POLY,colors:[["Charcoal","#3a3a38"],["Cream","#eae5d9"]]},
{id:"relaxed-tee",name:"Premium Relaxed Tee",cat:"tshirts",shape:"tee",price:26000,badge:"Best Seller",desc:"A heavier tee with a relaxed drop and a slightly longer body.",fabric:COT,colors:[["Black","#161616"],["Sand","#c8bda4"],["White","#f4f3ef"]]},
{id:"sweatpants",name:"Essential Sweatpants",cat:"sweatpants",shape:"pants",price:42000,badge:"New",isNew:1,desc:"Tapered and relaxed, with a drawcord waist and deep pockets.",fabric:POLY,colors:[["Black","#161616"],["Ash","#8c8c88"]]},
{id:"zip-hoodie",name:"Heavyweight Zip Hoodie",cat:"hoodies",shape:"hoodie",price:56000,desc:"Our heaviest fleece in a full-zip cut, built for colder days.",fabric:POLY,colors:[["Black","#161616"],["Grey","#77777a"]]},
{id:"boxy-crew",name:"Boxy Crewneck",cat:"sweatshirts",shape:"crew",price:40000,badge:"New",isNew:1,desc:"Cropped and boxy with a ribbed hem and cuffs.",fabric:POLY,colors:[["Cobalt","#2f3cff"],["Black","#161616"]]}];
const SH={hoodie:'<path d="M58 44 88 34Q100 52 112 34L142 44 186 156 162 166 144 104V214H56V104L38 166 14 156Z"/><path d="M70 40Q100-8 130 40Q100 66 70 40Z" fill-opacity=".85"/>',tee:'<path d="M60 40 90 30Q100 50 110 30L140 40 182 82 158 106 142 92V212H58V92L42 106 18 82Z"/>',crew:'<path d="M62 38 90 30Q100 48 110 30L138 38 186 152 162 162 142 104V206H58V104L38 162 14 152Z"/>',pants:'<path d="M62 30H138L148 224H108L100 96 92 224H52Z"/>'};
const art=(s,c)=>"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"><rect width="200" height="250" fill="#dcd8cf"/><g transform="translate(22 34) scale(.78)" fill="${c}" stroke="rgba(0,0,0,.2)">${SH[s]}</g></svg>`);
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const money=n=>CONFIG.currency+n.toLocaleString("en-US"),byId=id=>PRODUCTS.find(p=>p.id===id);
const img=(p,ci)=>art(p.shape,p.colors[ci][1]);
let cart=[];try{cart=JSON.parse(localStorage.getItem("cart")||"[]")}catch(e){}
cart=cart.filter(l=>byId(l.id));
const saveCart=()=>{try{localStorage.setItem("cart",JSON.stringify(cart))}catch(e){}};
const count=()=>cart.reduce((a,l)=>a+l.qty,0),subtotal=()=>cart.reduce((a,l)=>a+l.qty*byId(l.id).price,0);
function paintCount(){const c=$("#count");if(c)c.textContent=count()}
function toast(t,link){const e=$("#toast");e.innerHTML=t+(link?` <a href="/cart">View cart</a>`:"");e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),3200)}
function add(p,ci,size,qty){const key=`${p.id}-${ci}-${size}`,h=cart.find(l=>l.key===key);h?h.qty=Math.min(10,h.qty+qty):cart.push({key,id:p.id,ci,size,qty});saveCart();paintCount();toast(`${p.name} added.`,1)}
/* shared header + footer */
(function(){const pg=document.body.dataset.page,L=[["/","Shop","shop"],["/about","About","about"],["/help","Help","help"],["/account","Account","account"]];
document.body.insertAdjacentHTML("afterbegin",`<header class="nav"><div class="wrap"><a class="logo" href="/">${CONFIG.brand}</a><a class="bag" href="/cart" aria-label="Cart">Cart <b id="count">0</b></a><button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span></button><nav id="menu" aria-label="Main">${L.map(l=>`<a href="${l[0]}"${pg==l[2]?' aria-current="page"':""}>${l[1]}</a>`).join("")}</nav></div></header>`);
document.body.insertAdjacentHTML("beforeend",`<footer><div class="wrap"><span>© ${new Date().getFullYear()} ${CONFIG.brand}</span><span>${L.map(l=>`<a href="${l[0]}">${l[1]}</a>`).join("")}<a href="/cart">Cart</a></span></div></footer><div class="toast" id="toast" role="status"></div>`);paintCount();
const nav=$(".nav"),bg=$(".burger"),setMenu=o=>{nav.classList.toggle("open",o);bg.setAttribute("aria-expanded",o);bg.setAttribute("aria-label",o?"Close menu":"Open menu")};
bg.onclick=()=>setMenu(!nav.classList.contains("open"));
$("#menu").onclick=e=>{if(e.target.closest("a"))setMenu(false)};
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")){setMenu(false);bg.focus()}});
document.addEventListener("click",e=>{if(!nav.contains(e.target))setMenu(false)})})();
/* shop page */
if(document.body.dataset.page==="shop"){let f=location.hash.slice(1);if(!CATS.some(c=>c[0]===f))f="all";const pick={};
$("#cats").innerHTML=CATS.map(([k,l])=>`<button class="chip" data-k="${k}">${l}</button>`).join("");
const sw=(p,ci)=>p.colors.map((c,i)=>`<button class="sw" style="--c:${c[1]}" data-sw="${i}" aria-label="${c[0]}" aria-pressed="${i===ci}"></button>`).join("");
function draw(){const L=PRODUCTS.filter(p=>f==="all"||(f==="new"?p.isNew:p.cat===f));
$$(".chip").forEach(b=>b.setAttribute("aria-pressed",b.dataset.k===f));
$("#grid").innerHTML=L.map(p=>{const ci=pick[p.id]||0;return`<article class="card" data-id="${p.id}"><button class="pic" data-open aria-label="View ${p.name}">${p.badge?`<span class="badge">${p.badge}</span>`:""}<img src="${img(p,ci)}" alt="${p.name} in ${p.colors[ci][0]}"></button><div class="meta"><button class="name" data-open>${p.name}</button><span>${money(p.price)}</span></div><div class="swatches">${sw(p,ci)}</div><button class="btn" data-open>Choose size</button></article>`}).join("")}
$("#cats").onclick=e=>{const b=e.target.closest("[data-k]");if(b){f=b.dataset.k;history.replaceState(null,"","#"+f);draw()}};
$("#grid").onclick=e=>{const c=e.target.closest(".card");if(!c)return;const p=byId(c.dataset.id),s=e.target.closest("[data-sw]");if(s){pick[p.id]=+s.dataset.sw;draw()}else if(e.target.closest("[data-open]"))open(p)};
const d=$("#pdp");
function open(p){let ci=pick[p.id]||0,size=null,qty=1,guide=0,err="";
const paint=()=>{d.innerHTML=`<div class="pdp"><img src="${img(p,ci)}" alt="${p.name} in ${p.colors[ci][0]}"><div class="body"><button class="x" data-x aria-label="Close">×</button><h2>${p.name}</h2><p><b>${money(p.price)}</b></p><p class="mut">${p.desc}</p><p class="mut"><b>Material:</b> ${p.fabric}</p><div><p class="lbl">Colour: ${p.colors[ci][0]}</p><div class="swatches" style="padding:0">${sw(p,ci)}</div></div><div><p class="lbl">Size <button class="link" data-g style="min-height:0;margin-left:8px">Size guide</button></p><div class="sizes">${SIZES.map(s=>`<button class="size" data-s="${s}" aria-pressed="${s===size}">${s}</button>`).join("")}</div><p class="err" role="alert">${err}</p>${guide?`<table><tr><th>Size</th><th>Chest (cm)</th><th>Length (cm)</th></tr>${CHART.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table><p class="mut" style="font-size:13px;margin-top:8px">Flat measurements. Relaxed fit: take your usual size, or go one down for a closer fit.</p>`:""}</div><div class="row"><div class="qty"><button data-q="-1" aria-label="Fewer">−</button><output>${qty}</output><button data-q="1" aria-label="More">+</button></div><button class="btn" data-add style="flex:1">Add to cart</button></div><p class="mut" style="font-size:14px">Free standard delivery over ₦100,000 · 14-day returns</p></div></div>`};
paint();d.onclick=e=>{if(e.target===d||e.target.closest("[data-x]"))return d.close();const s=e.target.closest("[data-sw]"),z=e.target.closest("[data-s]"),q=e.target.closest("[data-q]");
if(s){ci=+s.dataset.sw;pick[p.id]=ci}else if(z){size=z.dataset.s;err=""}else if(q)qty=Math.max(1,Math.min(10,qty+ +q.dataset.q));else if(e.target.closest("[data-g]"))guide=!guide;
else if(e.target.closest("[data-add]")){if(!size){err="Choose a size first."}else{add(p,ci,size,qty);return d.close()}}else return;paint()};
d.onclose=draw;d.showModal()}
draw()}
/* cart page */
if(document.body.dataset.page==="cart"){let code="";const PROMO={STREET5:s=>Math.min(5000,s),WELCOME10:s=>Math.round(s*.1),KELZZ:s=>Math.round(s*.25)};
function draw(){const n=count();$("#empty").hidden=n>0;$("#full").hidden=!n;if(!n)return;
$("#lines").innerHTML=cart.map(l=>{const p=byId(l.id);return`<div class="line"><img src="${img(p,l.ci)}" alt=""><div><h3>${p.name}</h3><p class="mut">${p.colors[l.ci][0]} · ${l.size}</p><p><b>${money(p.price)}</b></p><div class="row"><div class="qty"><button data-q="${l.key}" data-d="-1" aria-label="Fewer">−</button><output>${l.qty}</output><button data-q="${l.key}" data-d="1" aria-label="More">+</button></div><button class="link" data-rm="${l.key}">Remove</button></div></div><b>${money(p.price*l.qty)}</b></div>`}).join("");
const s=subtotal(),disc=code?PROMO[code](s):0;$("#sub").textContent=money(s);$("#disc-row").hidden=!disc;$("#disc").textContent="−"+money(disc);$("#total").textContent=money(s-disc);$("#ship").textContent=s>=100000?"Free standard delivery":"Calculated at checkout";
$("#applied").innerHTML=code?`${code} applied <button class="link" data-clear style="min-height:0">Remove</button>`:""}
$("#lines").onclick=e=>{const rm=e.target.closest("[data-rm]"),q=e.target.closest("[data-q]");if(rm)cart=cart.filter(l=>l.key!==rm.dataset.rm);else if(q){const l=cart.find(x=>x.key===q.dataset.q);l.qty=Math.min(10,l.qty+ +q.dataset.d);if(l.qty<1)cart=cart.filter(x=>x!==l)}else return;saveCart();paintCount();draw()};
$("#promo").onsubmit=e=>{e.preventDefault();const c=$("#pc").value.trim().toUpperCase();if(!c)return;if(PROMO[c]){code=c;$("#perr").textContent="";$("#pc").value=""}else $("#perr").textContent="That code isn't valid. Check it and try again.";draw()};
$("#applied").onclick=e=>{if(e.target.closest("[data-clear]")){code="";draw()}};
$("#go").onclick=async()=>{const b=$("#go");b.disabled=true;try{const r=await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:cart.map(l=>({id:l.id,ci:l.ci,size:l.size,qty:l.qty})),code})});if(r.status===401){location.href="/signin?next=/cart";return}if(!r.ok)throw 0;const d=await r.json();cart=[];saveCart();paintCount();location.href="/account?placed="+d.order_no}catch(_){toast("Couldn't place the order. Try again.");b.disabled=false}};draw()}
/* help page */
if(document.body.dataset.page==="help"){
const ST=["Order confirmed","Processing","Shipped","Out for delivery","Delivered"],KEYS=["confirmed","processing","shipped","out_for_delivery","delivered"];
$("#trackForm").onsubmit=async e=>{e.preventDefault();const r=$("#res");let d=null;
try{const x=await fetch("/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({order:$("#on").value,email:$("#te").value})});d=x.ok?await x.json():null}catch(_){}
const k=d?KEYS.indexOf(d.status):-1;
if(k<0){r.innerHTML=`<p class="err">We couldn't find that order. Check the number and email, or <a href="#contact">contact us</a>.</p>`;return}
r.innerHTML=`<p style="margin-top:20px"><b>${k===4?"Delivered":"Status: "+ST[k]}</b></p><ol class="steps">${ST.map((s,i)=>`<li class="${i<k||k===4?"done":i===k?"now":""}"><i></i>${s}</li>`).join("")}</ol>`};
$$("[data-copy]").forEach(b=>b.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(b.dataset.copy);b.textContent="Copied";setTimeout(()=>b.textContent="Copy",1500)});
$("#msg").onsubmit=e=>{e.preventDefault();const f=e.target;if(!f.checkValidity()){f.reportValidity();return}f.hidden=true;$("#thanks").hidden=false}}
