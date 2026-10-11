/* MBAKU Online Store: concept build by Portside Digital */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const WA = '18687932163';
  const money = n => '$' + Math.round(n).toLocaleString('en-US');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  if (reduced || !hasGsap) document.documentElement.classList.add('reduced');

  /* ---------------- DATA ---------------- */
  const CATS = { auto: 'Car & Auto', home: 'Smart Home', tools: 'Power Tools', audio: 'Audio', gadgets: 'Gadgets' };
  const P = [
    { id: 'stereo7', name: 'CarPlay Stereo 7"', cat: 'auto', price: 899, was: 1299, img: 'stereo.jpg', stock: 6, pop: 10, badge: ['Best seller', 'b-hot'],
      line: 'Plug & play, rear camera included.', desc: 'Turn any car into a smart car. Wireless Apple CarPlay and Android Auto, Bluetooth calls, GPS and a 7" IPS touchscreen. It plugs into your existing harness with no cutting.',
      specs: ['Apple CarPlay', 'Android Auto', 'Bluetooth', 'GPS', 'Rear camera', 'Dash mount'] },
    { id: 'stereo10', name: 'CarPlay Stereo 10"', cat: 'auto', price: 1199, was: 1599, img: 'dashphone.jpg', stock: 3, pop: 8,
      line: 'Big-screen upgrade with telescopic mount.', desc: 'The 10" version with a telescopic, adjustable windshield or dashboard mount. Same plug & play install, with a bigger map and bigger music controls.',
      specs: ['10" IPS', 'CarPlay & Android Auto', 'MirrorLink', 'Windshield or dash mount'] },
    { id: 'doorbell', name: 'Smart Video Doorbell', cat: 'home', price: 499, was: 699, img: 'doorbell.jpg', stock: 9, pop: 9, badge: ['Free delivery', 'b-free'],
      line: 'See who\'s at the gate from inside.', desc: 'A 4.3" indoor screen shows you the gate in real time. Night vision, two-way talk and a rechargeable battery, so no wiring is needed.',
      specs: ['4.3" indoor screen', 'Night vision', 'Two-way talk', 'Rechargeable'] },
    { id: 'fan', name: 'Drone-Style LED Light Fan', cat: 'home', price: 199, was: 299, img: 'fanlight.jpg', stock: 14, pop: 10, badge: ['Hot', 'b-hot'],
      line: 'Fan and light in any bulb socket.', desc: 'Four fan heads around an LED light that screws into a standard E27 socket. It runs quiet, saves energy and comes with a remote. Great for bedrooms and kitchens.',
      specs: ['4 fan heads', 'LED light', 'Remote control', 'E27 socket', 'Silent'] },
    { id: 'led', name: 'RGB LED Strip, 10 m', cat: 'home', price: 149, was: 220, img: 'led.jpg', stock: 25, pop: 6,
      line: 'App and remote. Syncs to music.', desc: 'Ten metres of colour-changing LED strip with a phone app and remote control. Music sync mode for the lime.',
      specs: ['10 m', 'App + remote', 'Music sync', 'Self-adhesive'] },
    { id: 'planer', name: 'Li-ion Electric Planer', cat: 'tools', price: 499, was: 899, img: 'planer.jpg', stock: 5, pop: 9, badge: ['Sale', ''],
      line: 'Cordless, with two batteries.', desc: 'Power meets precision. A brushless BL motor, an 82 mm blade and two lithium-ion batteries with a fast charger. It levels doors, decks and frames without a cord.',
      specs: ['BL motor', '82 mm blade', '2 × batteries', 'Fast charger', 'Carry case'] },
    { id: 'chainsaw', name: '48V Cordless Mini Chainsaw', cat: 'tools', price: 649, was: 950, img: 'chainsaw.jpg', stock: 4, pop: 8,
      line: '6" bar, two batteries, toolbox.', desc: 'Portable electric wood cutter for branches, fences and yard clean-up. No fuel, no pull-cord. Comes with two 48V batteries and a toolbox.',
      specs: ['48V', '6" bar', '2 × batteries', 'Toolbox', 'Safety lock'] },
    { id: 'drill', name: 'Cordless Drill Kit', cat: 'tools', price: 449, was: 650, img: 'drill.jpg', stock: 8, pop: 7,
      line: '2-speed, with a 30-piece bit set.', desc: 'A 2-speed hammer drill with a 30-piece bit set, two batteries and a hard case. Shares a battery platform with our planer and chainsaw.',
      specs: ['2-speed', 'Hammer mode', '30-pc bits', '2 × batteries'] },
    { id: 'impact', name: 'Brushless Impact Driver', cat: 'tools', price: 499, was: 720, img: 'impact.jpg', stock: 7, pop: 6, badge: ['New', 'b-new'],
      line: 'High torque for lug nuts and decking.', desc: 'Brushless impact driver with three speed modes and an LED work light. Drives long screws into hardwood without stripping them.',
      specs: ['Brushless', '3 speeds', 'LED light', '1/4" hex'] },
    { id: 'earbuds', name: 'Wireless Earbuds Pro', cat: 'audio', price: 179, was: 260, img: 'earbuds.jpg', stock: 20, pop: 9, badge: ['New', 'b-new'],
      line: '30 hours of battery with the case.', desc: 'Punchy bass, touch controls and a pocket charging case. They stay put at the gym and on the maxi.',
      specs: ['Bluetooth 5.3', '30 h with case', 'Touch control', 'Sweat resistant'] },
    { id: 'speaker', name: 'Light-Show Party Speaker', cat: 'audio', price: 349, was: 499, img: 'speaker.jpg', stock: 10, pop: 8,
      line: 'Big sound with a light show.', desc: 'A 360° speaker with a built-in light show that pulses to the beat. Pair two for stereo at the beach or the backyard lime.',
      specs: ['360° sound', 'Light show', 'Pairs for stereo', '12 h battery'] },
    { id: 'clip', name: 'Clip-On Splashproof Speaker', cat: 'audio', price: 159, was: 225, img: 'speaker2.jpg', stock: 16, pop: 6,
      line: 'Hook it on your bag and go.', desc: 'A small, loud and splashproof speaker with a carabiner, so it hangs from your bag, the shower rail or the boat.',
      specs: ['Splashproof', 'Carabiner', 'Bluetooth', '8 h battery'] },
    { id: 'gimbal', name: 'Face-Tracking Gimbal', cat: 'gadgets', price: 249, was: 380, img: 'gimbal.jpg', stock: 11, pop: 9,
      line: 'Smart follow for vlogs & lives.', desc: 'Auto face tracking keeps you in focus while the gimbal rotates 360°. It fits most smartphones and charges over USB. Perfect for TikTok, lives and vlogs.',
      specs: ['Auto face tracking', '360° rotation', 'Fits most phones', 'USB charging'] },
    { id: 'watch', name: 'Smart Watch Series X', cat: 'gadgets', price: 299, was: 450, img: 'watch.jpg', stock: 12, pop: 7, badge: ['New', 'b-new'],
      line: 'Calls, steps, heart rate, notifications.', desc: 'Answer calls, track workouts and check your messages from your wrist. It works with iPhone and Android.',
      specs: ['Bluetooth calls', 'Heart rate', 'Sleep tracking', '7-day battery'] },
    { id: 'bundle', hidden: true, name: 'Workshop Drop Bundle', cat: 'tools', price: 1746, was: 2096, img: 'toolwall.jpg', stock: 8, pop: 0,
      line: 'Chainsaw + planer + drill + impact.', desc: 'This week\'s drop: all four cordless tools at $350 under the single price.', specs: ['4 tools', 'Shared batteries'] }
  ];
  const byId = Object.fromEntries(P.map(p => [p.id, p]));

  const ZONES = [
    { id: 'pickup', name: 'Pickup in Tunapuna', fee: 0, eta: 'Today', pin: 'tunapuna' },
    { id: 'pos', name: 'Port of Spain', fee: 40, eta: 'Tomorrow', pin: 'pos' },
    { id: 'arima', name: 'Arima', fee: 40, eta: 'Tomorrow', pin: 'arima' },
    { id: 'chag', name: 'Chaguanas', fee: 40, eta: 'Tomorrow', pin: 'chag' },
    { id: 'sando', name: 'San Fernando', fee: 40, eta: 'Tomorrow', pin: 'sando' },
    { id: 'pt', name: 'Princes Town', fee: 40, eta: 'Tomorrow', pin: 'pt' },
    { id: 'sg', name: 'Sangre Grande', fee: 40, eta: 'Tomorrow', pin: 'sg' },
    { id: 'pf', name: 'Point Fortin', fee: 40, eta: '1–2 days', pin: 'pf' },
    { id: 'mayaro', name: 'Mayaro', fee: 40, eta: '1–2 days', pin: 'mayaro' },
    { id: 'tobago', name: 'Tobago', fee: 60, eta: '2–3 days', pin: 'tobago' }
  ];
  const PINS = {
    tunapuna: [250, 162, 'Tunapuna'], pos: [178, 166, 'Port of Spain'], arima: [312, 158, 'Arima'],
    chag: [218, 232, 'Chaguanas'], sando: [222, 314, 'San Fernando'], pt: [282, 326, 'Princes Town'],
    sg: [392, 176, 'Sangre Grande'], pf: [166, 372, 'Point Fortin'], mayaro: [438, 318, 'Mayaro'], tobago: [552, 66, 'Scarborough']
  };
  const FREE_OVER = 1000;

  /* ---------------- STATE ---------------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('mbaku:' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem('mbaku:' + k, JSON.stringify(v)); } catch {} }
  };
  let cart = store.get('cart', []).filter(i => byId[i.id]);
  let zone = store.get('zone', 'chag');
  let filter = 'all', query = '', sort = 'pop', navPinnedUntil = 0;

  /* ---------------- HELPERS ---------------- */
  const toast = (() => { const el = $('#toast'); let t; return msg => { el.textContent = msg; el.classList.add('show'); clearTimeout(t); t = setTimeout(() => el.classList.remove('show'), 2200); }; })();
  const lock = on => document.body.classList.toggle('is-locked', on);

  /* ---------------- SUN RAYS ---------------- */
  (() => {
    const svg = $('#rays'); let d = '';
    const n = 28;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, w = Math.PI / n * .55;
      const r1 = 250, r2 = i % 2 ? 470 : 420;
      const p = (r, ang) => `${(Math.cos(ang) * r).toFixed(1)} ${(Math.sin(ang) * r).toFixed(1)}`;
      d += `M${p(r1, a - w * .5)}L${p(r2, a - w)}L${p(r2, a + w)}L${p(r1, a + w * .5)}Z`;
    }
    svg.innerHTML = `<path d="${d}" opacity=".9"/>`;
  })();

  /* ---------------- SHOP ---------------- */
  const grid = $('#grid');
  function counts() {
    const vis = P.filter(p => !p.hidden);
    $$('.chip').forEach(c => { const k = c.dataset.cat; c.querySelector('i').textContent = k === 'all' ? vis.length : vis.filter(p => p.cat === k).length; });
  }
  function matches(p, q) {
    if (!q) return true;
    q = q.toLowerCase().trim();
    const under = q.match(/under\s*\$?(\d+)/);
    if (under) return p.price <= +under[1];
    const hay = [p.name, CATS[p.cat], p.line, p.desc, ...p.specs].join(' ').toLowerCase();
    return q.split(/\s+/).every(w => hay.includes(w));
  }
  function list(q = query, f = filter) {
    let out = P.filter(p => !p.hidden && (f === 'all' || p.cat === f) && matches(p, q));
    const s = { pop: (a, b) => b.pop - a.pop, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, save: (a, b) => (b.was - b.price) - (a.was - a.price) }[sort];
    return out.sort(s);
  }
  function stockLine(p) {
    const left = p.stock;
    if (left <= 0) return `<div class="card-stock low">Sold out, back soon</div>`;
    const pct = Math.min(100, left / 25 * 100);
    return `<div class="card-stock ${left <= 5 ? 'low' : ''}"><span>${left <= 5 ? `Only ${left} left` : 'In stock'}</span><span class="sb"><i style="width:${pct}%"></i></span></div>`;
  }
  function render() {
    const items = list();
    grid.innerHTML = items.map(p => {
      const off = Math.round((1 - p.price / p.was) * 100);
      return `<article class="card" data-id="${p.id}">
        <div class="card-img" data-qv="${p.id}" role="button" tabindex="0" aria-label="Quick view ${p.name}">
          <img src="img/${p.img}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<span class="badge ${p.badge[1]}">${p.badge[0]}</span>` : ''}
          <span class="save-tag">-${off}%<small>OFF</small></span>
          <span class="qv-hint">Quick view</span>
        </div>
        <div class="card-body">
          <span class="card-cat">${CATS[p.cat]}</span>
          <h3 class="card-name">${p.name}</h3>
          <p class="card-line">${p.line}</p>
          ${stockLine(p)}
          <div class="card-foot">
            <div class="price"><b>${money(p.price)}</b><s>${money(p.was)}</s></div>
            <button class="add" data-add="${p.id}" aria-label="Add ${p.name} to cart" ${p.stock <= 0 ? 'disabled' : ''}>+</button>
          </div>
        </div>
      </article>`;
    }).join('');
    $('#empty').hidden = items.length > 0;
    if (hasGsap && !reduced) {
      gsap.fromTo(grid.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .045, ease: 'power3.out', overwrite: true });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }
  function setFilter(cat) {
    filter = cat;
    $$('.chip').forEach(c => { const on = c.dataset.cat === cat; c.classList.toggle('is-on', on); c.setAttribute('aria-selected', on); });
    render();
  }
  $('#chips').addEventListener('click', e => { const c = e.target.closest('.chip'); if (c) setFilter(c.dataset.cat); });
  $('#shopSearch').addEventListener('input', e => { query = e.target.value; render(); });
  $('#sort').addEventListener('change', e => { sort = e.target.value; render(); });
  $$('[data-jump]').forEach(a => a.addEventListener('click', () => setFilter(a.dataset.jump === 'audio' ? 'audio' : a.dataset.jump)));

  /* ---------------- QUICK VIEW ---------------- */
  const qv = $('#qv'); let qvItem = null, qvQty = 1, lastFocus;
  function openQV(id) {
    const p = byId[id]; if (!p) return;
    qvItem = p; qvQty = 1; lastFocus = document.activeElement;
    $('#qvImg').src = 'img/' + p.img; $('#qvImg').alt = p.name;
    $('#qvCat').textContent = CATS[p.cat];
    $('#qvName').textContent = p.name;
    $('#qvPrice').textContent = money(p.price);
    $('#qvWas').textContent = money(p.was);
    $('#qvSave').textContent = 'Save ' + money(p.was - p.price);
    $('#qvDesc').textContent = p.desc;
    $('#qvSpecs').innerHTML = p.specs.map(s => `<li>${s}</li>`).join('');
    $('#qvOpts').innerHTML = '';
    const st = $('#qvStock');
    st.textContent = p.stock <= 5 ? `Only ${p.stock} left, so order soon` : `In stock: delivery tomorrow, or pickup today`;
    st.classList.toggle('low', p.stock <= 5);
    $('#qvQty').textContent = 1;
    qv.hidden = false; lock(true);
    if (hasGsap && !reduced) gsap.fromTo('.qv-card', { y: 40, opacity: 0, scale: .96 }, { y: 0, opacity: 1, scale: 1, duration: .5, ease: 'power3.out' });
    $('#qvAdd').focus();
  }
  function closeQV() { qv.hidden = true; lock(false); lastFocus?.focus?.(); }
  qv.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) return closeQV();
    const q = e.target.closest('[data-q]');
    if (q) { qvQty = Math.max(1, Math.min(qvItem.stock, qvQty + +q.dataset.q)); $('#qvQty').textContent = qvQty; }
  });
  $('#qvAdd').addEventListener('click', () => { addToCart(qvItem.id, qvQty, $('#qvImg')); closeQV(); });
  grid.addEventListener('click', e => { const t = e.target.closest('[data-qv]'); if (t) openQV(t.dataset.qv); });
  grid.addEventListener('keydown', e => { const t = e.target.closest('[data-qv]'); if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openQV(t.dataset.qv); } });

  /* ---------------- CART ---------------- */
  const cartEl = $('#cart');
  function zoneById(id) { return ZONES.find(z => z.id === id) || ZONES[3]; }
  function totals() {
    const sub = cart.reduce((s, i) => s + byId[i.id].price * i.q, 0);
    const z = zoneById(zone);
    const freeItem = cart.some(i => i.id === 'doorbell');
    const free = z.id !== 'tobago' && (sub >= FREE_OVER || freeItem);
    const del = cart.length ? (free ? 0 : z.fee) : 0;
    return { sub, del, tot: sub + del, z, free };
  }
  function addToCart(id, q = 1, srcImg) {
    const p = byId[id]; if (!p) return;
    const ex = cart.find(i => i.id === id);
    if (ex) ex.q = Math.min(p.stock, ex.q + q); else cart.push({ id, q });
    store.set('cart', cart);
    fly(srcImg, p);
    updateCart();
    $('#nav').classList.remove('is-hidden'); navPinnedUntil = Date.now() + 2500;
    const c = $('#cartCount'); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
    toast(`Added ${p.name} ✓`);
  }
  function fly(srcImg, p) {
    if (!hasGsap || reduced) return;
    const from = (srcImg || document.activeElement)?.getBoundingClientRect?.();
    const to = $('#cartOpen').getBoundingClientRect();
    if (!from || !from.width) return;
    const img = document.createElement('img');
    img.src = 'img/' + p.img; img.className = 'flyer'; document.body.appendChild(img);
    gsap.set(img, { left: from.left + from.width / 2 - 30, top: from.top + from.height / 2 - 30 });
    gsap.to(img, { left: to.left + to.width / 2 - 30, top: to.top + to.height / 2 - 30, scale: .2, rotate: 30, duration: .8, ease: 'power2.in', onComplete: () => img.remove() });
  }
  function updateCart() {
    const n = cart.reduce((s, i) => s + i.q, 0);
    const cc = $('#cartCount'); cc.textContent = n; cc.classList.toggle('has', n > 0);
    const { sub, del, tot, z, free } = totals();
    $('#cartList').innerHTML = cart.map(i => {
      const p = byId[i.id];
      return `<li class="ci" data-id="${p.id}"><img src="img/${p.img}" alt="">
        <div><b>${p.name}</b><small>${money(p.price)} each</small>
          <div class="qty"><button data-cq="-1" aria-label="Less">−</button><span>${i.q}</span><button data-cq="1" aria-label="More">+</button></div></div>
        <div><span class="ci-price">${money(p.price * i.q)}</span><button class="ci-rm" data-rm>Remove</button></div></li>`;
    }).join('');
    $('#cartEmpty').style.display = cart.length ? 'none' : '';
    $('#cartFoot').style.display = cart.length ? '' : 'none';
    $('#freeMeter').style.display = cart.length ? '' : 'none';
    $('#sub').textContent = money(sub);
    $('#del').textContent = z.id === 'pickup' ? 'Free pickup' : free ? 'FREE' : money(del);
    $('#tot').textContent = money(tot);
    const left = FREE_OVER - sub;
    $('#freeText').innerHTML = z.id === 'tobago' ? 'Tobago delivery is a flat <b>$60</b> by courier.'
      : free ? '🎉 You\'ve unlocked <b>free delivery</b> in Trinidad.'
      : `You're <b>${money(left)}</b> away from free delivery.`;
    $('#fmBar').style.width = (z.id === 'tobago' ? 100 : Math.min(100, sub / FREE_OVER * 100)) + '%';
    $('#cartZone').value = zone;
    // WhatsApp message
    const name = $('#cartName').value.trim();
    const lines = cart.map(i => `• ${i.q} × ${byId[i.id].name}: ${money(byId[i.id].price * i.q)}`);
    const msg = `Hi MBAKU! 🛒 I'd like to order:\n${lines.join('\n')}\n\n${z.id === 'pickup' ? 'Pickup in Tunapuna' : `Delivery to ${z.name}: ${free ? 'FREE' : money(del)}`}\n*Total: ${money(tot)}*${name ? `\n\nName: ${name}` : ''}`;
    $('#sendWa').href = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  }
  $('#cartList').addEventListener('click', e => {
    const li = e.target.closest('.ci'); if (!li) return;
    const it = cart.find(i => i.id === li.dataset.id);
    if (e.target.closest('[data-rm]')) cart = cart.filter(i => i !== it);
    const q = e.target.closest('[data-cq]');
    if (q) { it.q += +q.dataset.cq; if (it.q < 1) cart = cart.filter(i => i !== it); else it.q = Math.min(byId[it.id].stock, it.q); }
    store.set('cart', cart); updateCart();
  });
  function openCart() { cartEl.hidden = false; lock(true); requestAnimationFrame(() => cartEl.classList.add('open')); setTimeout(() => $('.cart-head .x').focus(), 50); }
  function closeCart() { cartEl.classList.remove('open'); lock(false); setTimeout(() => { cartEl.hidden = true; }, 450); }
  $('#cartOpen').addEventListener('click', openCart);
  cartEl.addEventListener('click', e => { if (e.target.closest('[data-close-cart]')) closeCart(); });
  $('#cartName').addEventListener('input', updateCart);
  $('#sendWa').addEventListener('click', () => toast('Opening WhatsApp with your order…'));

  // zone selects
  const zoneOpts = ZONES.map(z => `<option value="${z.id}">${z.name} · ${z.fee ? money(z.fee) : 'Free'}</option>`).join('');
  $('#zone').innerHTML = zoneOpts; $('#cartZone').innerHTML = zoneOpts;
  $('#cartZone').addEventListener('change', e => setZone(e.target.value));

  // global add buttons
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]'); if (!b) return;
    const card = b.closest('.card, .spot-card, .slash-stage, .drop-inner');
    addToCart(b.dataset.add, 1, card?.querySelector('img'));
    if (b.classList.contains('add')) { b.classList.add('done'); b.textContent = '✓'; setTimeout(() => { b.classList.remove('done'); b.textContent = '+'; }, 1200); }
  });

  /* ---------------- SEARCH OVERLAY ---------------- */
  const sov = $('#searchOv'), sIn = $('#searchBig'), sRes = $('#searchRes'); let sAct = 0;
  function renderSearch() {
    const items = sIn.value ? list(sIn.value, 'all').slice(0, 6) : P.filter(p => !p.hidden).sort((a, b) => b.pop - a.pop).slice(0, 5);
    sAct = 0;
    sRes.innerHTML = items.map((p, i) => `<li><button data-sid="${p.id}" class="${i === 0 ? 'act' : ''}"><img src="img/${p.img}" alt=""><span>${p.name}<br><small style="color:var(--muted)">${CATS[p.cat]}</small></span><b>${money(p.price)}</b></button></li>`).join('') || `<li style="color:var(--muted);text-align:center;padding:20px">No match. Ask us on WhatsApp and we'll source it.</li>`;
  }
  function openSearch() { sov.hidden = false; lock(true); sIn.value = ''; renderSearch(); setTimeout(() => sIn.focus(), 30); }
  function closeSearch() { sov.hidden = true; lock(false); }
  $('#searchOpen').addEventListener('click', openSearch);
  sIn.addEventListener('input', renderSearch);
  sov.addEventListener('click', e => {
    const b = e.target.closest('[data-sid]');
    if (b) { closeSearch(); openQV(b.dataset.sid); return; }
    if (e.target === sov) closeSearch();
  });
  sIn.addEventListener('keydown', e => {
    const bs = $$('#searchRes button');
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sAct = (sAct + (e.key === 'ArrowDown' ? 1 : -1) + bs.length) % bs.length; bs.forEach((b, i) => b.classList.toggle('act', i === sAct)); }
    if (e.key === 'Enter' && bs[sAct]) { closeSearch(); openQV(bs[sAct].dataset.sid); }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { if (!qv.hidden) closeQV(); else if (!cartEl.hidden) closeCart(); else if (!sov.hidden) closeSearch(); }
    if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
  });

  /* ---------------- MAP ---------------- */
  const routesG = $('#routes'), pinsG = $('#pins'), van = $('#van');
  const NS = 'http://www.w3.org/2000/svg';
  const routeEls = {};
  const [hx, hy] = PINS.tunapuna;
  Object.entries(PINS).forEach(([k, [x, y, label]]) => {
    if (k !== 'tunapuna') {
      const mx = (hx + x) / 2, my = (hy + y) / 2 - Math.max(30, Math.hypot(x - hx, y - hy) * .28);
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', `M${hx} ${hy} Q${mx} ${my} ${x} ${y}`);
      routesG.appendChild(path); routeEls[k] = path;
    }
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'pin' + (k === 'tunapuna' ? ' home' : ''));
    g.dataset.pin = k;
    g.setAttribute('transform', `translate(${x} ${y})`);
    const pos = { pos: [-12, 4, 'end'], tunapuna: [0, -16, 'middle'], arima: [10, 16, 'start'], mayaro: [-12, 4, 'end'], tobago: [0, 26, 'middle'] }[k] || [12, 4, 'start'];
    g.innerHTML = `<circle class="halo" r="8"/><circle class="dot" r="${k === 'tunapuna' ? 8 : 6}"/><text x="${pos[0]}" y="${pos[1]}" text-anchor="${pos[2]}">${label}</text>`;
    g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button'); g.setAttribute('aria-label', label);
    pinsG.appendChild(g);
  });
  pinsG.addEventListener('click', e => { const g = e.target.closest('.pin'); if (!g) return; const z = ZONES.find(z => z.pin === g.dataset.pin); if (z) setZone(z.id, true); });
  pinsG.addEventListener('keydown', e => { if (e.key === 'Enter') e.target.closest('.pin')?.dispatchEvent(new Event('click', { bubbles: true })); });
  $('#zone').addEventListener('change', e => setZone(e.target.value, true));

  let vanProg = { t: 0 }, vanTween;
  function placeVan(t) {
    const z = zoneById(zone), path = routeEls[z.pin];
    if (!path) { van.setAttribute('transform', `translate(${hx} ${hy - 22})`); return; }
    const L = path.getTotalLength(), pt = path.getPointAtLength(L * t);
    van.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
    path.style.strokeDasharray = `${L * t} ${L}`;
  }
  function setZone(id, animate) {
    zone = id; store.set('zone', id);
    const z = zoneById(id);
    $('#zone').value = id;
    $('#fee').textContent = z.fee ? money(z.fee) : 'Free';
    $('#eta').textContent = z.eta;
    const dn = $('#destName');
    dn.textContent = z.id === 'pickup' ? 'your door' : z.name;
    Object.entries(routeEls).forEach(([k, p]) => { p.classList.toggle('on', k === z.pin); p.style.strokeDasharray = ''; });
    $$('.pin').forEach(g => g.classList.toggle('on', g.dataset.pin === z.pin));
    if (hasGsap && !reduced && animate) {
      vanTween?.kill();
      vanProg.t = 0;
      vanTween = gsap.to(vanProg, { t: 1, duration: 1.4, ease: 'power2.inOut', onUpdate: () => placeVan(vanProg.t) });
      gsap.fromTo(dn, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .5, ease: 'back.out(2)' });
    } else placeVan(1);
    updateCart();
  }

  /* ---------------- COUNTDOWN ---------------- */
  function nextFriday() {
    const d = new Date(); const t = new Date(d);
    t.setHours(18, 0, 0, 0);
    let add = (5 - d.getDay() + 7) % 7; if (add === 0 && d > t) add = 7;
    t.setDate(d.getDate() + add); return t;
  }
  const target = nextFriday();
  const cd = Object.fromEntries($$('#countdown b').map(b => [b.dataset.u, b]));
  function tick() {
    let s = Math.max(0, (target - new Date()) / 1000);
    const v = { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: Math.floor(s % 60) };
    for (const k in v) cd[k].textContent = String(v[k]).padStart(2, '0');
  }
  tick(); setInterval(tick, 1000);

  /* ---------------- INIT DATA UI ---------------- */
  counts(); render(); setZone(zone); updateCart();

  /* ---------------- MOTION ---------------- */
  if (!hasGsap || reduced) {
    $('#loader')?.remove();
    $('#stockBar').style.width = '68%';
    $('#nowNum').textContent = '499';
    $$('[data-count]').forEach(el => el.textContent = (+el.dataset.count).toLocaleString() + (el.dataset.suffix || ''));
    smoothAnchors(null);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const lenis = typeof Lenis !== 'undefined' ? new Lenis({ lerp: .1, smoothWheel: true }) : null;
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  smoothAnchors(lenis);
  // pause smooth scroll while overlays are open
  new MutationObserver(() => lenis && (document.body.classList.contains('is-locked') ? lenis.stop() : lenis.start()))
    .observe(document.body, { attributes: true, attributeFilter: ['class'] });

  function smoothAnchors(l) {
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const id = a.getAttribute('href'); if (id.length < 2) return;
      const t = $(id); if (!t) return;
      e.preventDefault();
      if (!cartEl.hidden) closeCart();
      l ? l.scrollTo(t, { offset: id === '#shop' ? 0 : -10, duration: 1.4 }) : t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    }));
  }

  /* LOADER */
  const loadTl = gsap.timeline({ onComplete: () => { $('#loader').remove(); lenis?.start(); } });
  const cnt = { v: 0 };
  loadTl
    .to('.loader-word span', { y: 0, duration: .8, stagger: .07, ease: 'power4.out' })
    .to(cnt, { v: 100, duration: 1.1, ease: 'power2.inOut', onUpdate: () => $('#loaderCount').textContent = String(Math.round(cnt.v)).padStart(3, '0') }, 0)
    .to('.loader-sub', { opacity: 1, duration: .4 }, .5)
    .to('.loader-tape', { scaleX: 1, duration: .55, ease: 'power3.inOut' }, 1)
    .to('.loader-word span:nth-child(odd)', { y: '-120%', duration: .6, ease: 'power3.in' }, 1.5)
    .to('.loader-word span:nth-child(even)', { y: '120%', duration: .6, ease: 'power3.in' }, 1.5)
    .to('.loader-tape', { scaleX: 0, transformOrigin: 'right', duration: .4 }, 1.6)
    .to('#loader', { clipPath: 'inset(0 0 100% 0)', duration: .8, ease: 'power4.inOut' }, 1.85)
    .add(heroIn(), 2.1);

  function heroIn() {
    const tl = gsap.timeline();
    tl.from('.hero-title .w', { yPercent: 115, rotate: 4, duration: 1.1, stagger: .08, ease: 'power4.out' })
      .from('.hero-eyebrow, .hero-lede, .hero-ctas, .hero-proof', { y: 30, opacity: 0, duration: .8, stagger: .08, ease: 'power3.out' }, .3)
      .from('.orb', { scale: 0, opacity: 0, duration: 1, stagger: .1, ease: 'back.out(1.6)' }, .2)
      .from('.sticker', { scale: 0, rotate: -120, duration: .9, ease: 'back.out(2.2)' }, .7)
      .from('.hero-sun', { scale: .6, opacity: 0, duration: 1.6, ease: 'power3.out' }, 0)
      .from('.nav', { autoAlpha: 0, duration: .8, ease: 'power2.out' }, .2)
      .add(() => $$('[data-count]').forEach(el => { const o = { v: 0 }; gsap.to(o, { v: +el.dataset.count, duration: 1.8, ease: 'power2.out', onUpdate: () => el.textContent = Math.round(o.v).toLocaleString() + (el.dataset.suffix || '') }); }), .4);
    return tl;
  }

  /* HERO: mouse parallax + scroll */
  const orbs = $$('#orbit [data-depth]').map(el => ({ d: +el.dataset.depth, x: gsap.quickTo(el, 'x', { duration: .9, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: .9, ease: 'power3' }) }));
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
    orbs.forEach(o => { o.x(nx * 40 * o.d); o.y(ny * 30 * o.d); });
  });
  gsap.to('.hero-inner', { yPercent: -18, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('#orbit', { yPercent: -30, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-sun', { scale: 1.25, rotate: 40, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* NAV hide on scroll down */
  ScrollTrigger.create({ start: 200, end: 'max', onUpdate: s => { if (Date.now() > navPinnedUntil) $('#nav').classList.toggle('is-hidden', s.direction === 1 && s.scroll() > 400); } });

  /* MAGNETIC */
  $$('.magnetic').forEach(b => {
    const x = gsap.quickTo(b, 'x', { duration: .5, ease: 'elastic.out(1,.4)' }), y = gsap.quickTo(b, 'y', { duration: .5, ease: 'elastic.out(1,.4)' });
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .35); y((e.clientY - r.top - r.height / 2) * .45); });
    b.addEventListener('pointerleave', () => { x(0); y(0); });
  });

  /* MARQUEES with scroll velocity */
  function marquee(track, dur, reverse) {
    track.innerHTML += track.innerHTML;
    return reverse ? gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration: dur, ease: 'none', repeat: -1 })
                   : gsap.to(track, { xPercent: -50, duration: dur, ease: 'none', repeat: -1 });
  }
  const mA = marquee($('.band-a .ticker-track'), 26);
  const mB = marquee($('.band-b .ticker-track'), 30, true);
  const mR = marquee($('#revTrack'), 45);
  ScrollTrigger.create({
    onUpdate: s => {
      const v = Math.min(5, 1 + Math.abs(s.getVelocity()) / 400);
      [mA, mB, mR].forEach(t => gsap.to(t, { timeScale: v, duration: .2, overwrite: true, onComplete: () => gsap.to(t, { timeScale: 1, duration: 1 }) }));
    }
  });

  const mm = gsap.matchMedia();

  /* UNBOXING */
  mm.add('(min-width: 0px)', () => {
    const scene = $('.scene');
    const spots = [[-.38, -.36], [-.14, -.56], [.14, -.56], [.38, -.36], [-.42, .02], [.42, .02]];
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '.unbox', start: 'top top', end: '+=240%', pin: '.unbox-stage', scrub: 1, invalidateOnRefresh: true }
    });
    gsap.set('.flap', { '--a': '-90deg' });
    gsap.set('.ut', { opacity: .14 });
    tl.to('.ut-1', { opacity: 1, duration: .5 }, 0)
      .fromTo('.box3d', { rotateX: -22, rotateY: -32, y: 60 }, { rotateX: -26, rotateY: 22, y: 0, duration: 3, ease: 'power1.inOut' }, 0)
      .to('.flap-f', { '--a': '-220deg', duration: .8, ease: 'power2.inOut' }, .5)
      .to('.flap-b', { '--a': '-220deg', duration: .8, ease: 'power2.inOut' }, .6)
      .to('.flap-l', { '--a': '-215deg', duration: .8, ease: 'power2.inOut' }, .75)
      .to('.flap-r', { '--a': '-215deg', duration: .8, ease: 'power2.inOut' }, .85)
      .to('.box-glow', { opacity: 1, duration: .4 }, 1.1)
      .to('.ut-2', { opacity: 1, duration: .5 }, 1.2);
    $$('.pop').forEach((p, i) => {
      tl.fromTo(p, { x: 0, y: 40, scale: .2, opacity: 0, rotate: 0 },
        { x: () => spots[i][0] * scene.offsetWidth, y: () => spots[i][1] * scene.offsetHeight, scale: 1, opacity: 1, rotate: (i % 2 ? 1 : -1) * (4 + i * 1.5), duration: 1.1, ease: 'back.out(1.4)' }, 1.3 + i * .14);
    });
    tl.to('.ut-3', { opacity: 1, duration: .5 }, 2.3)
      .fromTo('.check', { y: 20 }, { opacity: 1, y: 0, stagger: .15, duration: .4 }, 2.4)
      .to({}, { duration: .4 });
  });

  /* PRICE SLASH */
  mm.add('(min-width: 0px)', () => {
    const num = { v: 899 };
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.slash', start: 'top top', end: '+=170%', pin: '.slash-stage', scrub: 1 } });
    tl.to('.slash-img', { clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 1, ease: 'power2.out' }, 0)
      .to('.slash-img img', { scale: 1, duration: 1.4, ease: 'none' }, 0)
      .from('.slash-copy > *:not(.stamp)', { y: 40, opacity: 0, stagger: .1, duration: .5 }, .1)
      .to('.strike path', { strokeDashoffset: 0, duration: .5, ease: 'power2.in' }, .9)
      .to(num, { v: 499, duration: .7, ease: 'power2.out', onUpdate: () => $('#nowNum').textContent = Math.round(num.v) }, 1.2)
      .to('.stamp', { opacity: 1, scale: 1, duration: .25, ease: 'back.out(3)' }, 1.85)
      .to({}, { duration: .4 });
  });

  /* SECTION HEAD word reveals */
  $$('.split-words, .section-head .h2, .spot-head .h2, .how .h2').forEach(h => {
    if (h.dataset.split) return; h.dataset.split = 1;
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(w => {
          if (!w) return;
          if (/^\s+$/.test(w)) frag.appendChild(document.createTextNode(w));
          else { const s = document.createElement('span'); s.className = 'sw'; s.style.display = 'inline-block'; s.textContent = w; frag.appendChild(s); }
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
    walk(h);
    gsap.from(h.querySelectorAll('.sw'), { yPercent: 60, opacity: 0, rotate: 3, duration: .9, stagger: .035, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 85%' } });
  });

  /* SPOTLIGHT horizontal */
  mm.add('(min-width: 721px)', () => {
    const track = $('#spotTrack');
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    const tw = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: '.spot', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true,
        onUpdate: s => gsap.set('#spotBar', { scaleX: s.progress }) }
    });
    $$('.spot-card').forEach(c => {
      gsap.fromTo(c.querySelector('.sc-img img'), { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } });
      gsap.from(c.querySelectorAll('.sc-chips li'), { y: 20, opacity: 0, stagger: .05, scrollTrigger: { trigger: c, containerAnimation: tw, start: 'left 70%' } });
    });
  });

  /* DROP */
  gsap.fromTo('.drop-bg', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.drop', scrub: true } });
  gsap.from('.drop-title span', { scale: .6, rotate: -8, opacity: 0, duration: 1, ease: 'elastic.out(1,.5)', scrollTrigger: { trigger: '.drop-title', start: 'top 80%' } });
  gsap.from('.ds', { y: 220, rotate: (i) => [-30, 30, -20, 25][i], opacity: 0, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '.drop-stack', start: 'top 85%', end: 'center 55%', scrub: 1 } });
  gsap.to('#stockBar', { width: '68%', duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: '.stock', start: 'top 85%' } });
  gsap.from('.countdown div', { y: 30, opacity: 0, stagger: .08, duration: .6, ease: 'back.out(2)', scrollTrigger: { trigger: '.countdown', start: 'top 85%' } });

  /* DELIVERY: draw route + drive van with scroll */
  ScrollTrigger.create({
    trigger: '.map', start: 'top 80%', end: 'bottom 40%', scrub: true,
    onUpdate: s => { if (!vanTween || !vanTween.isActive()) placeVan(Math.min(1, s.progress * 1.15)); }
  });
  gsap.from('.pin', { scale: 0, transformOrigin: 'center', stagger: .05, duration: .5, ease: 'back.out(3)', scrollTrigger: { trigger: '.map', start: 'top 75%' } });
  gsap.from('.deliv-panel > *', { x: 40, opacity: 0, stagger: .1, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: '.deliv-panel', start: 'top 80%' } });

  /* HOW: pinned chat (desktop), scrubbed in place (phones) */
  mm.add({ desk: '(min-width: 721px)', phone: '(max-width: 720px)' }, ctx => {
    const steps = $$('.step');
    const st = ctx.conditions.desk
      ? { trigger: '.how', start: 'top top', end: '+=180%', pin: '.how-stage', scrub: 1 }
      : { trigger: '.phone', start: 'top 85%', end: 'bottom 70%', scrub: 1 };
    const tl = gsap.timeline({ scrollTrigger: { ...st,
      onUpdate: s => { const i = Math.min(2, Math.floor(s.progress * 3.2)); steps.forEach((st, j) => st.classList.toggle('is-on', j === i)); } } });
    tl.from('.phone', { y: 120, rotate: 12, opacity: 0, duration: .6, ease: 'power3.out' })
      .fromTo('.b1', { y: 14, scale: .92 }, { opacity: 1, y: 0, scale: 1, duration: .3, ease: 'back.out(2)' }, .7)
      .fromTo('.b2', { y: 14, scale: .92 }, { opacity: 1, y: 0, scale: 1, duration: .3, ease: 'back.out(2)' }, 1.4)
      .fromTo('.b3', { y: 14, scale: .92 }, { opacity: 1, y: 0, scale: 1, duration: .3, ease: 'back.out(2)' }, 1.9)
      .fromTo('.b4', { y: 14, scale: .92 }, { opacity: 1, y: 0, scale: 1, duration: .3, ease: 'back.out(2)' }, 2.3)
      .to({}, { duration: .4 });
  });

  /* FOOTER big words */
  gsap.fromTo('.fb-1', { xPercent: -25 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.foot', start: 'top bottom', end: 'top 20%', scrub: true } });
  gsap.fromTo('.fb-2', { xPercent: 20 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.foot', start: 'top bottom', end: 'top 20%', scrub: true } });

  /* Reveal generic */
  gsap.utils.toArray('.rev').forEach((r, i) => gsap.from(r, { y: 40, opacity: 0, duration: .6, delay: (i % 4) * .05, scrollTrigger: { trigger: '.reviews', start: 'top 85%' } }));

  addEventListener('load', () => ScrollTrigger.refresh());
})();
