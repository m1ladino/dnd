// Katalog opreme. Nova kategorija/proizvod = nov red ovde; stranice DND Oprema i DND Proizvod se same prilagode.
(function () {
  const slug = s => s.toLowerCase().replace(/[čć]/g, 'c').replace(/š/g, 's').replace(/ž/g, 'z').replace(/đ/g, 'dj').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const categories = [
    { name: 'Lična zaštitna oprema', icon: 'ph-t-shirt', text: 'Odeća, obuća i oprema koja štiti zaposlene od rizika na radnom mestu. Sve prema važećim EN standardima.', facets: ['Standard', 'Materijal'],
      subs: [['Radna i zaštitna odeća', 'ph-t-shirt'], ['Zaštitna obuća', 'ph-sneaker'], ['Zaštitne rukavice', 'ph-hand'], ['Zaštita disajnih organa', 'ph-wind'], ['Zaštita očiju i lica', 'ph-eyeglasses'], ['Zaštita glave', 'ph-hard-hat'], ['Zaštita sluha', 'ph-ear'], ['Jednokratni program', 'ph-package'], ['Protivpadna oprema', 'ph-link']] },
    { name: 'Protivpožarna oprema', icon: 'ph-fire', text: 'Aparati za gašenje požara, creva i hidrantska oprema, sa atestom i mogućnošću redovnog servisa.', facets: ['Vrsta', 'Punjenje'],
      subs: [['Protivpožarni aparati', 'ph-fire-extinguisher'], ['Protivpožarna creva', 'ph-drop'], ['Hidrantska oprema', 'ph-fire-truck']] },
    { name: 'Bezbednosni znakovi', icon: 'ph-warning', text: 'Znakovi opasnosti, obaveze, zabrane i evakuacije, usklađeni sa SRPS ISO 7010.', facets: ['Materijal', 'Dimenzije'],
      subs: [['Znakovi opasnosti', 'ph-warning'], ['Znakovi obaveze', 'ph-warning-circle'], ['Znakovi zabrane', 'ph-prohibit'], ['Opasne materije', 'ph-flask'], ['Znakovi informisanja', 'ph-info'], ['Opšte informacije', 'ph-signpost']] },
    { name: 'Promotivni program', icon: 'ph-gift', text: 'Tekstil, kancelarijski i poklon program sa štampom Vašeg logotipa.', facets: ['Štampa', 'Materijal'],
      subs: [['Tekstil', 'ph-t-shirt'], ['Olovke', 'ph-pen'], ['Kancelarija', 'ph-notebook'], ['Tehnologija', 'ph-usb'], ['Torbe', 'ph-tote'], ['Kućni setovi', 'ph-coffee'], ['Privesci i alati', 'ph-key']] }
  ].map(c => ({ ...c, key: slug(c.name), subs: c.subs.map(([name, icon]) => ({ name, icon, key: slug(name) })) }));

  // [kategorija, podkategorija, naziv, cena (RSD bez PDV-a), dostupnost in|low|order, dodato, popularnost, atributi, kratko, opis, dodatne specifikacije, veličine, jedinica]
  const rows = [
    [0, 'Radna i zaštitna odeća', 'Radno odelo Classic, jakna i pantalone', 4890, 'in', '2026-03-10', 92, { Standard: 'EN ISO 13688', Materijal: 'Pamuk / poliester' }, 'Dvodelno radno odelo za svakodnevni rad u proizvodnji, magacinu i servisu.', 'Jakna sa rajsferšlusom i džepovima na grudima, pantalone sa ojačanim kolenima i džepom za metar. Tkanina 65% poliester, 35% pamuk, 245 g/m², izdržava industrijsko pranje na 60 °C.', [['Gramatura', '245 g/m²'], ['Boja', 'Siva / žuta'], ['Održavanje', 'Pranje do 60 °C']], ['46', '48', '50', '52', '54', '56', '58', '60'], 'kom'],
    [0, 'Radna i zaštitna odeća', 'Reflektujući prsluk, narandžasti', 390, 'in', '2025-11-02', 88, { Standard: 'EN ISO 20471', Materijal: 'Poliester' }, 'Prsluk visoke vidljivosti klase 2 sa dve reflektujuće trake.', 'Lagan prsluk za rad na putu, gradilištu i u magacinu. Čičak zatvaranje sa prednje strane, univerzalna veličina.', [['Klasa vidljivosti', '2'], ['Boja', 'Narandžasta'], ['Veličina', 'Univerzalna']], null, 'kom'],
    [0, 'Zaštitna obuća', 'Zaštitne cipele S3 Duraline', 6290, 'in', '2026-08-28', 95, { Standard: 'EN ISO 20345 S3', Materijal: 'Koža' }, 'Duboke cipele sa čeličnom kapom i lamelom protiv probijanja.', 'Gornjište od vodoodbojne kože, antistatični đon otporan na ulja i klizanje (SRC). Kompozitna lamela štiti od probijanja, a anatomski uložak smanjuje zamor pri celodnevnom nošenju.', [['Kapica', 'Čelična, 200 J'], ['Đon', 'PU/PU, SRC'], ['Antistatičnost', 'Da']], ['38', '39', '40', '41', '42', '43', '44', '45', '46', '47'], 'par'],
    [0, 'Zaštitna obuća', 'Zaštitne čizme PVC S5', 3450, 'low', '2025-10-15', 61, { Standard: 'EN ISO 20345 S5', Materijal: 'PVC' }, 'Vodootporne čizme za vlažne i hladne radne uslove.', 'Čizme od PVC-a sa čeličnom kapom i lamelom, otporne na masti i blage hemikalije. Pogodne za prehrambenu industriju, poljoprivredu i komunalne službe.', [['Visina', '38 cm'], ['Kapica', 'Čelična, 200 J']], ['39', '40', '41', '42', '43', '44', '45', '46'], 'par'],
    [0, 'Zaštitne rukavice', 'Rukavice Nitril Grip', 220, 'in', '2026-01-20', 97, { Standard: 'EN 388', Materijal: 'Nitril' }, 'Pletene rukavice sa nitrilnim premazom za siguran hvat.', 'Bešavna poliesterska osnova sa nitrilnim premazom na dlanu i prstima. Dobar hvat suvih i blago nauljenih predmeta, prozračna nadlanica.', [['Nivo zaštite', '4121X'], ['Pakovanje', '12 pari']], ['7', '8', '9', '10', '11'], 'par'],
    [0, 'Zaštitne rukavice', 'Kožne rukavice Monter', 340, 'in', '2025-09-05', 74, { Standard: 'EN 388', Materijal: 'Koža' }, 'Rukavice od goveđe kože za montažu i rukovanje materijalom.', 'Dlan od goveđe kože, nadlanica od pamučnog platna, elastična manžetna. Za građevinu, montažu i transport.', [['Nivo zaštite', '3122X']], ['9', '10', '11'], 'par'],
    [0, 'Zaštita disajnih organa', 'Polumaska FFP2 sa ventilom', 180, 'in', '2026-02-11', 83, { Standard: 'EN 149 FFP2', Materijal: 'Netkani tekstil' }, 'Jednokratna polumaska za zaštitu od prašine i aerosola.', 'Ventil za izdisaj smanjuje zagrevanje i vlagu ispod maske. Podesiva traka za nos i elastične trake za glavu.', [['Klasa', 'FFP2 NR D'], ['Pakovanje', '10 kom']], null, 'kom'],
    [0, 'Zaštita očiju i lica', 'Zaštitne naočare Clear', 450, 'in', '2025-12-01', 70, { Standard: 'EN 166', Materijal: 'Polikarbonat' }, 'Lagane naočare sa providnim staklom otpornim na udarce.', 'Polikarbonatno staklo sa zaštitom od ogrebotina i zamagljivanja, UV 400 filter. Mogu se nositi preko korektivnih naočara.', [['Otpornost na udar', 'F'], ['UV zaštita', 'UV 400']], null, 'kom'],
    [0, 'Zaštita glave', 'Industrijski zaštitni šlem', 890, 'in', '2025-08-18', 79, { Standard: 'EN 397', Materijal: 'ABS' }, 'Šlem sa podesivom kolevkom i otvorima za ventilaciju.', 'Kućište od ABS-a, šestotačkasta tekstilna kolevka i podešavanje obima glave točkićem. Prihvata antifone i vizir.', [['Obim glave', '53–63 cm'], ['Boje', 'Bela, žuta, crvena, plava']], null, 'kom'],
    [0, 'Zaštita sluha', 'Antifoni SNR 30 dB', 1290, 'order', '2026-09-12', 52, { Standard: 'EN 352-1', Materijal: 'ABS' }, 'Antifoni sa podesivim obručem za buku do 105 dB.', 'Mekani jastučići za dugotrajno nošenje, sklopivi obruč i podešavanje visine školjki.', [['Prigušenje', 'SNR 30 dB'], ['Težina', '210 g']], null, 'kom'],
    [0, 'Jednokratni program', 'Jednokratni kombinezon tip 5/6', 690, 'in', '2026-04-04', 66, { Standard: 'EN 13034', Materijal: 'Polipropilen' }, 'Kombinezon sa kapuljačom za zaštitu od prašine i prskanja.', 'Mikroporozni materijal propušta vodenu paru, elastične manžetne i rajsferšlus sa preklopom.', [['Tip', '5 / 6']], ['M', 'L', 'XL', 'XXL'], 'kom'],
    [0, 'Protivpadna oprema', 'Protivpadni pojas sa dve tačke', 7900, 'low', '2026-09-01', 58, { Standard: 'EN 361', Materijal: 'Poliester' }, 'Pojas za ceo telo sa leđnom i grudnom tačkom kačenja.', 'Podesive naramenice i butne trake, aluminijumske kopče. Za rad na visini, skelama i krovovima, uz atest.', [['Tačke kačenja', 'Leđna, grudna'], ['Maks. opterećenje', '140 kg']], null, 'kom'],

    [1, 'Protivpožarni aparati', 'Protivpožarni aparat S-6, prah ABC', 4200, 'in', '2025-07-01', 99, { Vrsta: 'Prah ABC', Punjenje: '6 kg' }, 'Najčešći aparat za kancelarije, lokale i magacine.', 'Aparat pod stalnim pritiskom, za gašenje požara klase A, B i C. Isporučuje se sa nosačem za zid, atestom i oznakom servisa.', [['Klasa požara', 'A, B, C'], ['Vatrogasna moć', '43A 233B C'], ['Servis', 'Na 6 meseci']], null, 'kom'],
    [1, 'Protivpožarni aparati', 'Protivpožarni aparat S-9, prah ABC', 5400, 'in', '2025-07-01', 81, { Vrsta: 'Prah ABC', Punjenje: '9 kg' }, 'Aparat veće snage za proizvodne hale i radionice.', 'Za gašenje požara klase A, B i C na većim površinama. Isporučuje se sa nosačem, atestom i oznakom servisa.', [['Klasa požara', 'A, B, C'], ['Vatrogasna moć', '55A 233B C']], null, 'kom'],
    [1, 'Protivpožarni aparati', 'Protivpožarni aparat CO2-5', 9800, 'low', '2026-05-20', 64, { Vrsta: 'CO2', Punjenje: '5 kg' }, 'Za električne instalacije i serverske prostorije.', 'Ugljen-dioksid ne ostavlja tragove i ne oštećuje opremu. Za požare klase B i uređaje pod naponom do 1000 V.', [['Klasa požara', 'B'], ['Napon', 'Do 1000 V']], null, 'kom'],
    [1, 'Protivpožarni aparati', 'Protivpožarni aparat S-2 za vozila', 2300, 'in', '2026-09-18', 72, { Vrsta: 'Prah ABC', Punjenje: '2 kg' }, 'Obavezan aparat za putnička i teretna vozila.', 'Kompaktan aparat sa nosačem za montažu u vozilu.', [['Klasa požara', 'A, B, C']], null, 'kom'],
    [1, 'Protivpožarna creva', 'Vatrogasno crevo C-52, 15 m', 3900, 'in', '2025-10-10', 55, { Vrsta: 'Crevo C-52' }, 'Potisno crevo sa spojnicama za unutrašnje hidrante.', 'Sintetičko platno sa gumenom unutrašnjom oblogom, aluminijumske spojnice Storz C.', [['Dužina', '15 m'], ['Radni pritisak', '12 bar']], null, 'kom'],
    [1, 'Hidrantska oprema', 'Hidrantski ormar sa opremom', 14900, 'order', '2026-06-01', 47, { Vrsta: 'Hidrantski ormar' }, 'Komplet ormar sa crevom, mlaznicom i ventilom.', 'Limeni ormar za montažu na zid ili u zid, sa crevom C-52 od 15 m, mlaznicom i hidrantskim ventilom.', [['Dimenzije', '500 × 500 × 160 mm'], ['Montaža', 'Nadgradna ili ugradna']], null, 'kom'],
    [1, 'Hidrantska oprema', 'Mlaznica C-52 sa ventilom', 2700, 'in', '2025-11-22', 41, { Vrsta: 'Mlaznica' }, 'Mlaznica sa zatvaračem za mlaz i raspršeni mlaz.', 'Aluminijumska mlaznica sa Storz C spojnicom i ručicom za izbor mlaza.', [['Priključak', 'Storz C-52']], null, 'kom'],

    [2, 'Znakovi opasnosti', 'Znak „Opasnost od električne struje"', 290, 'in', '2025-06-12', 77, { Materijal: 'PVC', Dimenzije: '200 × 200 mm' }, 'Upozorenje za razvodne ormare i električne prostorije.', 'Tvrdi PVC 1 mm sa UV postojanom štampom, prema SRPS ISO 7010 (W012).', [['Oznaka', 'W012'], ['Debljina', '1 mm']], null, 'kom'],
    [2, 'Znakovi obaveze', 'Znak „Obavezna upotreba zaštitnog šlema"', 290, 'in', '2025-06-12', 69, { Materijal: 'PVC', Dimenzije: '200 × 200 mm' }, 'Znak obaveze za gradilišta i proizvodne zone.', 'Tvrdi PVC 1 mm sa UV postojanom štampom, prema SRPS ISO 7010 (M014).', [['Oznaka', 'M014']], null, 'kom'],
    [2, 'Znakovi zabrane', 'Znak „Zabranjeno pušenje"', 250, 'in', '2025-06-12', 85, { Materijal: 'Samolepljiva folija', Dimenzije: '150 × 150 mm' }, 'Samolepljiva nalepnica za sve zatvorene radne prostore.', 'Vinilna folija za unutrašnju i spoljnu upotrebu, prema SRPS ISO 7010 (P002).', [['Oznaka', 'P002']], null, 'kom'],
    [2, 'Opasne materije', 'Znak „Zapaljive materije", GHS02', 190, 'in', '2026-02-02', 50, { Materijal: 'Samolepljiva folija', Dimenzije: '100 × 100 mm' }, 'Oznaka za ambalažu i skladišta zapaljivih materija.', 'Piktogram opasnosti GHS02, otporan na ulja i rastvarače.', [['Oznaka', 'GHS02']], null, 'kom'],
    [2, 'Znakovi informisanja', 'Znak „Izlaz za evakuaciju", fotoluminiscentni', 650, 'in', '2026-09-08', 73, { Materijal: 'Fotoluminiscentni PVC', Dimenzije: '300 × 150 mm' }, 'Svetli u mraku do 8 sati nakon nestanka struje.', 'Fotoluminiscentni PVC klase C, prema SRPS ISO 7010 (E002).', [['Oznaka', 'E002'], ['Naknadno svetljenje', 'Do 8 h']], null, 'kom'],
    [2, 'Opšte informacije', 'Tabla „Gradilište"', 2900, 'order', '2026-03-28', 38, { Materijal: 'Aluminijum', Dimenzije: '600 × 400 mm' }, 'Gradilišna tabla sa podacima o investitoru i izvođaču.', 'Aluminijumski panel 3 mm sa štampom po Vašim podacima, otvori za montažu.', [['Debljina', '3 mm'], ['Izrada', '5–7 radnih dana']], null, 'kom'],

    [3, 'Tekstil', 'Pamučna majica sa štampom', 790, 'in', '2026-04-15', 80, { 'Štampa': 'Sito štampa', Materijal: 'Pamuk' }, 'Majica 160 g/m² sa logotipom firme, od 20 komada.', 'Pamučna majica okruglog izreza, štampa u jednoj do četiri boje. Cena važi za jednobojnu štampu jedne pozicije.', [['Gramatura', '160 g/m²'], ['Minimalna količina', '20 kom']], ['S', 'M', 'L', 'XL', 'XXL'], 'kom'],
    [3, 'Olovke', 'Metalna hemijska olovka', 120, 'in', '2025-09-30', 76, { 'Štampa': 'Laser gravura', Materijal: 'Metal' }, 'Olovka sa laserskom gravurom logotipa.', 'Metalno telo, plavo punjenje, mehanizam na pritisak.', [['Minimalna količina', '50 kom']], null, 'kom'],
    [3, 'Kancelarija', 'Rokovnik A5', 690, 'in', '2025-11-11', 62, { 'Štampa': 'Tampon štampa', Materijal: 'Eko koža' }, 'Datirani rokovnik sa logotipom na koricama.', 'Korice od eko kože, 336 strana, traka za obeležavanje.', [['Format', 'A5'], ['Minimalna količina', '25 kom']], null, 'kom'],
    [3, 'Tehnologija', 'USB fleš memorija 16 GB', 890, 'order', '2026-09-22', 44, { 'Štampa': 'Tampon štampa', Materijal: 'Plastika' }, 'USB 3.0 fleš sa štampom logotipa.', 'Kapacitet 16 GB, poklopac sa privescom.', [['Interfejs', 'USB 3.0'], ['Minimalna količina', '50 kom']], null, 'kom'],
    [3, 'Torbe', 'Platneni ceger', 290, 'in', '2025-08-08', 68, { 'Štampa': 'Sito štampa', Materijal: 'Pamuk' }, 'Pamučni ceger sa dugim ručkama.', 'Pamučno platno 140 g/m², dimenzije 38 × 42 cm.', [['Dimenzije', '38 × 42 cm'], ['Minimalna količina', '50 kom']], null, 'kom'],
    [3, 'Kućni setovi', 'Keramička šolja 330 ml', 420, 'in', '2026-01-09', 59, { 'Štampa': 'Digitalna štampa', Materijal: 'Keramika' }, 'Bela šolja sa štampom u punom koloru.', 'Keramika otporna na mašinsko pranje.', [['Zapremina', '330 ml'], ['Minimalna količina', '36 kom']], null, 'kom'],
    [3, 'Privesci i alati', 'Privezak metar 2 m', 260, 'in', '2025-12-14', 45, { 'Štampa': 'Tampon štampa', Materijal: 'Plastika' }, 'Mini metar sa karabinerom i logotipom.', 'Traka 2 m, automatsko uvlačenje.', [['Minimalna količina', '100 kom']], null, 'kom']
  ];

  const products = rows.map((r, i) => {
    const c = categories[r[0]], s = c.subs.find(x => x.name === r[1]);
    return { id: slug(r[2]), sku: 'DND-' + (1001 + i), cat: c.key, sub: s.key, name: r[2], price: r[3], stock: r[4], added: r[5], pop: r[6], attrs: r[7], short: r[8], desc: r[9], specs: r[10] || [], sizes: r[11], unit: r[12], images: [] };
  });

  const stock = {
    in: { label: 'Na stanju', dot: '#1E7B45' },
    low: { label: 'Malo na stanju', dot: '#E6AC00' },
    order: { label: 'Po porudžbini', dot: '#9A9DA1' }
  };
  const fmt = n => Math.round(n).toLocaleString('de-DE') + ' RSD';
  const plural = n => { const a = n % 10, b = n % 100; return n + (a === 1 && b !== 11 ? ' proizvod' : a >= 2 && a <= 4 && (b < 12 || b > 14) ? ' proizvoda' : ' proizvoda'); };
  const NEW_MS = 60 * 864e5;
  const listHref = (cat, sub) => 'DND Oprema.dc.html' + (cat ? '?kat=' + cat + (sub ? '&pod=' + sub : '') : '');
  const productHref = p => 'DND Proizvod.dc.html?id=' + p.id;

  // Podaci za karticu proizvoda (isti na listi i u preporukama)
  const toCard = (p, add, justAdded) => {
    const c = categories.find(x => x.key === p.cat), s = c.subs.find(x => x.key === p.sub), st = stock[p.stock], done = justAdded === p.id;
    return { id: p.id, name: p.name, href: productHref(p), subName: s.name, subHref: listHref(c.key, s.key), icon: s.icon,
      imgEl: p.images[0] && window.React ? window.React.createElement('img', { src: p.images[0], alt: p.name, loading: 'lazy', decoding: 'async', style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } }) : null, hasImg: !!p.images[0], noImg: !p.images[0],
      isNew: Date.now() - new Date(p.added).getTime() < NEW_MS,
      priceLabel: fmt(p.price), unit: p.unit === 'par' ? '/ par' : '',
      meta: Object.values(p.attrs).join(' · '),
      stockLabel: st.label, stockDot: st.dot,
      addLabel: p.sizes ? 'Izaberite veličinu za ' + p.name : 'Dodaj ' + p.name + ' u korpu',
      addIcon: done ? 'ph-check' : (p.sizes ? 'ph-arrow-right' : 'ph-plus'),
      addBg: done ? '#1E7B45' : '#FFC000', addColor: done ? '#FFFFFF' : '#2F3135',
      add: (ev) => { if (ev) { ev.preventDefault(); ev.stopPropagation(); } if (p.sizes) { location.href = productHref(p); return; } add(p, 1); } };
  };

  const navGroups = () => categories.map(c => ({ name: c.name, icon: c.icon, href: listHref(c.key), links: c.subs.map(s => ({ name: s.name, href: listHref(c.key, s.key) })) }));

  window.DND_OPREMA = { categories, products, stock, fmt, plural, slug, listHref, productHref, toCard, navGroups };
})();
