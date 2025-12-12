const panel = document.getElementById("panel");
const backdrop = document.getElementById("backdrop");
const closeBtn = document.getElementById("closeBtn");
const backBtn = document.getElementById("backBtn");
const panelH = document.getElementById("panelH");
const panelBody = document.getElementById("panelBody");

const buttons = Array.from(document.querySelectorAll(".icon-btn"));

const TITLES = {
  scenario: "Scénář",
  materials: "Materiály",
  activities: "Aktivity",
  board: "Hrací plocha",
};

const MATERIALS_STORAGE_KEY = "zasilka13a_materials_v1";

const MATERIAL_ITEMS = [
  { id: "kamera-1", label: "Kamera", checked: true },
  { id: "kamera-2", label: "Kamera", checked: false },
  { id: "chytre-osvetleni", label: "Chytré osvětlení", checked: false },
  { id: "baterky-2x", label: "Baterky 2x", checked: false },
  { id: "vysilacky", label: "Vysílačky", checked: true },
  { id: "skrinee", label: "Skříně", checked: false },
  { id: "poskozena-skrin", label: "Požkozenou skříň", checked: false },
  { id: "reproduktory", label: "Reproduktory", checked: true },
  { id: "pocitac", label: "Počítač", checked: true },
  { id: "balik-13a", label: "Balík 13A", checked: false },
  { id: "staticke-osvetleni", label: "Statické osvětlení", checked: false },
  { id: "app-vyhledavani", label: "APP na vyhledávání zásilek", checked: false },
  { id: "kamerovy-zaznam-10-1", label: "Kamerový záznam z 10 (1)", checked: false },
  { id: "kamerovy-zaznam-10-2", label: "Kamerový záznam z 10 (2)", checked: false },
  { id: "kamerovy-zaznam-10-3", label: "Kamerový záznam z 10 (3)", checked: false },
  { id: "fotky-z-dep", label: "Fotky z inkriminovaných dep", checked: false },
];

/* ✅ Hrací plocha jako “route” */
const BOARD_STEPS = [
  {
    title: "Začátek - Zasedací mísnost 10",
    sub: "Představení hry, pravidel, bezpečnosti a následné ukončení",
  },
  { title: "Chodba křídla", sub: "Přesun a hlavní hrací prostor" },
  { title: "Zasedací mísnost 50", sub: "Další část hry (po získání ID karty)" },
  { title: "Zasedací mísnost 10", sub: "Návrat / finále / zakončení" },
];

// --- Scenario texts ---
const EMAILS = {
  email1: { title: "Email 1", body: `Dobrý den,

obracíme se na vás v situaci, kterou si ještě před pár týdny nikdo z nás neuměl představit.

V uplynulé době došlo na našich depech **1361, 1364, 1368 a naposledy 1367** k sérii **mimořádně závažných incidentů**, při kterých byli **usmrceni všichni přítomní zaměstnanci**. Na těchto depech bohužel **již nikdo nezůstal**.

Ve všech případech se opakují stejné znaky:

- v budově se objevila **neidentifikovaná zásilka** bez odesílatele, ručně psaná adresa a označení balíku číslem **„13A“**,
- docházelo k **narušení zabezpečení budovy** – uzamčené východy, výpadky systému, vypnuté kamery,
- incidenty proběhly v krátkém časovém sledu a s vysokou mírou brutality.

Na základě interního šetření a dosavadních poznatků policie se všechny stopy sbíhají k **bývalému zaměstnanci**, který detailně znal provoz depa, interní procesy i zabezpečení budov. Tento zaměstnanec je v tuto chvíli **nezvěstný, zmizel, nereaguje na žádný kontakt a není nikde k nalezení**.

O celé situaci je **plně informována Policie ČR**, se kterou úzce spolupracujeme. Přesto je nutné otevřeně přiznat, že **v tuto chvíli nemáme situaci zcela pod kontrolou** a děláme maximum pro to, abychom zabránili dalšímu útoku.

Z důvodu ochrany zaměstnanců zavádíme **mimořádné opatření**:

> V následujících dnech bude na každý kalendářní den náhodně vybrán krizový tým z řad zaměstnanců, který bude mít za úkol
> **zvýšeně dohlížet na bezpečnost depa, pohyb osob, podezřelé zásilky a dodržování všech bezpečnostních postupů.**

Účast v tomto týmu není formální cvičení – jde o **reálné opatření** k ochraně vašich kolegů i celé společnosti. Prosíme vás proto, abyste k případnému zařazení do krizového týmu přistupovali jako k **zásadní pracovní povinnosti** a brali situaci maximálně vážně.

Současná situace je pro všechny z nás velmi těžká a v celé firmě panuje **napětí, strach a nejistota**. Přesto vás prosíme:

- neignorujte žádné **podezřelé chování** osob v areálu,
- jakoukoliv **nezvyklou zásilku** ihned hlaste svému nadřízenému a bezpečnostnímu oddělení,
- v následujících dnech se **zdržujte v depu vždy ve více lidech**, pokud je to jen trochu možné.

Děkujeme za pochopení a spolupráci.

Jakékoliv nové informace vám budeme okamžitě předávat.

S pozdravem,

Franta Frantovič

Jednatel společnosti

Direct Parcel Distribution` },

  email2: { title: "Email 2", body: `Dobrý den,

na základě mimořádných bezpečnostních opatření, o kterých jsme informovali v předchozím e-mailu, vám oznamujeme, že **na den [DEN, DATUM]** jste byli **vybráni jako krizový tým** pro [název depa / budovy].

Toto **není simulační cvičení** ani trénink. Jedná se o **reálné opatření** vyvolané situací na depech **1361, 1364, 1368 a 1367**, kde došlo k usmrcení všech přítomných zaměstnanců.

Vaším úkolem v daný den bude zejména:

- **zvýšený dohled nad bezpečností budovy**,
- kontrola **vstupů a pohybu osob** v areálu,
- okamžité hlášení jakékoli **podezřelé zásilky** (zejména typu bez odesílatele, s ruční adresou a označením „13A“),
- **důsledné dodržování interních bezpečnostních postupů** a jejich vymáhání od ostatních,
- připravenost **koordinovat reakci** v případě mimořádné události a spolupracovat s policií a bezpečnostním oddělením.

V průběhu vaší služby můžete být požádáni o:

- práci v uzavřených částech budovy,
- vyčlenění na konkrétní úseky depa (chodby, třídicí zóny, sklady),
- operativní rozhodování v situacích, kdy může jít o **zdraví a životy kolegů**.

Prosíme, abyste s účastí v krizovém týmu **počítali jako s prioritní pracovní povinností**, přizpůsobili tomu svůj program a byli v daný den k dispozici po celou dobu, po kterou budete o to požádáni.

V případě, že se z vážných zdravotních či rodinných důvodů nemůžete zúčastnit, prosím **okamžitě kontaktujte svého přímého nadřízeného a oddělení bezpečnosti**, aby mohlo dojít k náhradě.

Děkujeme vám, že se této náročné role ujímáte.

Vaše součinnost může reálně přispět k tomu, aby se **neudál další den jako na depech 1361, 1364, 1368 a 1367**.

S pozdravem,

**Petr Petrovič**

Bezpečnostní ředitel

Direct Parcel Distribution` },

  email3: { title: "Email 3", body: `Četl jsi ten e-mail o krizových týmech, viď?

Není to první zpráva, kterou kvůli mně dostáváš.

Jen první, o které víš.

---

Na **1361** je ticho.

Na **1364** taky.

**1368** a **1367** už to znají.

Žádné hlasy. Žádné směny. Jen prázdné rampy a světla, co občas samy zhasnou.

Když se pozorně zaposloucháš, možná to ticho slyšíš i odsud.

---

V kalendáři máš **DATUM]**.

Já také.` },
};

const SCENARIO_STORY = `Příběh únikové hry

Depa 1361, 1364, 1368 a 1367 jsou dnes jen čísla v systému.

Budovy stojí. Rampy, pásy, klece, skenery – všechno je tam.

Jen lidé chybí.

Nejdřív se mluvilo o nehodách. Pak o „bezpečnostních incidentech“. Nakonec padla slova, která už nejde vzít zpět: masakr, vražda, pachatel na útěku. Policie je oficiálně ve hře, ale v kuloárech firmy se říká něco jiného – situace není pod kontrolou.

Společným jmenovatelem všech čtyř dep je jedno označení:

balík 13A.

Neidentifikovaná zásilka, bez odesílatele, ručně psaná adresa, jen číslo a jednoduchý symbol.

Po každém „výskytu“ zásilky 13A zůstalo depo prázdné.

Firma reaguje zoufale, ale racionálně: zavádí krizové týmy. Každý den je náhodně vybraná skupina lidí, kteří mají hlídat budovu, kontrolovat podezřelé zásilky a být připraveni na „cokoliv“. Maily o incidentech, o mrtvých kolezích a o ztraceném bývalém zaměstnanci se šíří firmou a atmosféra houstne.

Mezi řádky je jasné jedno:

jednou z těch náhodně vybraných skupin budete i vy.

Týden před „dnem D“ přichází první oficiální mail z oddělení bezpečnosti: přiznání, že čtyři depa přišla o všechny zaměstnance, že existuje podezřelý bývalý zaměstnanec, který znal zabezpečení budov a zmizel, a že policie sice spolupracuje, ale neví, kde je.

O pár dní později druhý mail:

[KONKRÉTNÍ DEN A DATUM] – vy jste krizový tým pro vaše depo. Není to simulace, není to školení, je to „reálné opatření“.

A pak přijde třetí zpráva.

Už ne z firemní adresy, ale z něčeho zvláštního. Záhadného.

Předmět: „13A“.

Text krátký, chladný a osobní: připomínka čtyř prázdných dep, jejich data, váš den, vaše depo.

V jednom z odstavců věta, která se nedá vymazat z hlavy:

„Až uvidíš 13A, už tam nejsem na cestě.

Už jsem u vás.“`;

const SCENARIO_START = `Začátek -

Hráči přijdou na školení v zasedačce - 6 Modletice. Lektor jim představí uvod do hry: (Viz výše).
Představí pravidla hry - Vysílačky - čas -  kam nesmí chodit a na co nesmí sahat.
Musí se zmínit důležitá bezpečnostní pravidla: - Kde bude nouzový klíč, co dělat v případě promlémů atd.
Hráči nechají v zasedačce 6 telefony (Krom 1 - nouzového, pro případ potřeby - bezpečnosti). A přemístí se do křídla kde se bude hra odehrávat - (Chodba kde je zasedačka 50 a 10.
Zde bude již hra připravena. Hrací pole bude chodba - 50 a 10 (Obě zasedačky budou mít offline čtečky na ID karty). záchod, kuchynka bude mimoherně volně přístupná - v kuchynce taky bude připravené občerstvení (Jedná se o krizový štáb o který musí být postaráno).

Chodba bude nenápadná tmavá (zalepené okna) - musím vyřešit světla - určitě koupit nějaké led pásky chytré osvětlení.
Uprostřed chodbi bude osvícená skříň která díky tmě bude krásně vynikat. Po otevření tam na ně bude čekat zásilka 13A. V tu chvíli za nimi hlasitě uzamknu dveře a vypnu osvětlení.
(Práce v chodbě tak bude jen s baterkami, které dostanou před vstupem) 10 a 50 už budou osvětlené.

Po vyluštění všech náležitostí dostanou ID kartu k 50 - pokračování hry.
Po 50 pujdou od 10. Desítku bych chtěl rozdělit na 2 části (je tam takový nevyužitý cíp, chtěl bych ho zaskládat skříněma a jednu skříň udělat dutou aby se dalo skříní prolést - a tam bude finále celé hry).`;

// ---------- UI helpers ----------
function clearActive(){ buttons.forEach(b => b.classList.remove("active")); }

function showBack(onClick){
  backBtn.classList.remove("hidden");
  backBtn.onclick = onClick;
}
function hideBack(){
  backBtn.classList.add("hidden");
  backBtn.onclick = null;
}

function openPanel(key){
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  renderSection(key);
}
function closePanel(){
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  clearActive();
  hideBack();
  panelBody.innerHTML = "";
  panelH.textContent = "—";
}

function setActive(btn){
  clearActive();
  btn.classList.add("active");
}

function addRipple(btn, x, y){
  const r = document.createElement("span");
  r.className = "ripple";
  r.style.left = x + "px";
  r.style.top = y + "px";
  btn.appendChild(r);
  setTimeout(() => r.remove(), 750);
}

// ---------- renderers ----------
function renderSection(key){
  hideBack();
  panelH.textContent = TITLES[key] ?? "—";
  panelBody.innerHTML = "";

  if (key === "scenario") renderScenarioMain();
  else if (key === "materials") renderMaterials();
  else if (key === "board") renderBoard();
  else if (key === "activities") renderActivities();
}

/* ✅ FIX: renderScenarioMain vždy vyčistí panel + schová zpět */
function renderScenarioMain(){
  hideBack();
  panelH.textContent = TITLES.scenario;
  panelBody.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.className = "prose";

  const p = document.createElement("p");
  p.textContent = "Týden před unikovkou přijdou zaměstnancům 3 emaily.";
  wrap.appendChild(p);

  const row = document.createElement("div");
  row.className = "email-row";
  row.appendChild(makeEmailBtn("Email 1", () => renderEmail("email1")));
  row.appendChild(makeEmailBtn("Email 2", () => renderEmail("email2")));
  row.appendChild(makeEmailBtn("Email 3", () => renderEmail("email3")));
  wrap.appendChild(row);

  wrap.appendChild(makeH3("Příběh únikové hry"));
  wrap.appendChild(makeParagraphsFromText(SCENARIO_STORY.replace(/^Příběh únikové hry\s*/i, "")));

  wrap.appendChild(makeH3("Začátek"));
  wrap.appendChild(makeParagraphsFromText(SCENARIO_START.replace(/^Začátek\s*-\s*/i, "")));

  panelBody.appendChild(wrap);
}

function renderEmail(emailKey){
  const email = EMAILS[emailKey];
  panelH.textContent = email?.title ?? "Email";
  panelBody.innerHTML = "";

  showBack(() => renderScenarioMain());

  const wrap = document.createElement("div");
  wrap.className = "prose";
  wrap.appendChild(makeParagraphsFromText(email.body));
  panelBody.appendChild(wrap);
}

function renderMaterials(){
  hideBack();
  panelH.textContent = TITLES.materials;
  panelBody.innerHTML = "";

  const state = loadMaterialsState();
  const wrap = document.createElement("div");
  wrap.className = "prose";

  const info = document.createElement("p");
  info.textContent = "Klikáním můžeš zaškrtávat položky. Stav se ukládá v prohlížeči.";
  wrap.appendChild(info);

  const list = document.createElement("div");
  list.className = "checklist";

  MATERIAL_ITEMS.forEach(item => {
    const checked = state[item.id] ?? item.checked;

    const label = document.createElement("label");
    label.className = "check" + (checked ? " done" : "");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = !!checked;

    const text = document.createElement("span");
    text.textContent = item.label;

    input.addEventListener("change", () => {
      label.classList.toggle("done", input.checked);
      state[item.id] = input.checked;
      saveMaterialsState(state);
    });

    label.appendChild(input);
    label.appendChild(text);
    list.appendChild(label);
  });

  wrap.appendChild(list);

  const note = document.createElement("div");
  note.className = "small-note";
  note.textContent = "Pozn.: Dvě položky „Kamera“ jsou vedené zvlášť (kamera-1 a kamera-2).";
  wrap.appendChild(note);

  panelBody.appendChild(wrap);
}

function renderBoard(){
  hideBack();
  panelH.textContent = TITLES.board;
  panelBody.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.className = "prose";

  const intro = document.createElement("p");
  intro.textContent = "Trasa hry (v pořadí):";
  wrap.appendChild(intro);

  const route = document.createElement("div");
  route.className = "route";

  BOARD_STEPS.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "route-step";

    const pin = document.createElement("div");
    pin.className = "step-pin";
    const n = document.createElement("div");
    n.className = "step-n";
    n.textContent = String(i + 1);
    pin.appendChild(n);

    const body = document.createElement("div");
    const t = document.createElement("div");
    t.className = "step-title";
    t.textContent = s.title;

    const sub = document.createElement("p");
    sub.className = "step-sub";
    sub.textContent = s.sub;

    body.appendChild(t);
    body.appendChild(sub);

    card.appendChild(pin);
    card.appendChild(body);
    route.appendChild(card);
  });

  wrap.appendChild(route);
  panelBody.appendChild(wrap);
}

function renderActivities(){
  hideBack();
  panelH.textContent = TITLES.activities;
  panelBody.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.className = "prose";
  const p = document.createElement("p");
  p.textContent = "Zatím bez obsahu.";
  wrap.appendChild(p);
  panelBody.appendChild(wrap);
}

function makeEmailBtn(label, onClick){
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "email-btn";
  btn.addEventListener("click", onClick);

  const ico = document.createElement("span");
  ico.innerHTML = `
    <svg class="mail-ico" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16v12H4V6Z" stroke="currentColor" stroke-width="1.8" opacity=".95"/>
      <path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.8" opacity=".9" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  const text = document.createElement("span");
  text.textContent = label;

  btn.appendChild(ico);
  btn.appendChild(text);
  return btn;
}

function makeH3(text){
  const h3 = document.createElement("h3");
  h3.textContent = text;
  return h3;
}

function makeParagraphsFromText(text){
  const frag = document.createDocumentFragment();
  const blocks = String(text).split(/\n\s*\n/g);

  blocks.forEach(block => {
    const trimmed = block.trim();
    if (!trimmed) return;

    // list
    const lines = trimmed.split("\n").map(l => l.trim());
    const looksLikeList = lines.length > 1 && lines.every(l => l.startsWith("- "));

    if (looksLikeList){
      const ul = document.createElement("ul");
      lines.forEach(l => {
        const li = document.createElement("li");
        li.textContent = l.replace(/^-+\s*/, "");
        ul.appendChild(li);
      });
      frag.appendChild(ul);
      return;
    }

    // quote if block starts with >
    if (trimmed.startsWith(">")){
      const bq = document.createElement("blockquote");
      bq.textContent = trimmed.replace(/^>\s?/gm, "");
      frag.appendChild(bq);
      return;
    }

    const p = document.createElement("p");
    p.textContent = trimmed.replace(/\n/g, " ");
    frag.appendChild(p);
  });

  return frag;
}

// localStorage
function loadMaterialsState(){
  try{
    const raw = localStorage.getItem(MATERIALS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch{
    return {};
  }
}
function saveMaterialsState(state){
  try{ localStorage.setItem(MATERIALS_STORAGE_KEY, JSON.stringify(state)); }catch{}
}

// events
buttons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const rect = btn.getBoundingClientRect();
    addRipple(btn, e.clientX - rect.left, e.clientY - rect.top);
    setActive(btn);
    openPanel(btn.dataset.key);
  });
});

closeBtn.addEventListener("click", closePanel);
backdrop.addEventListener("click", closePanel);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePanel();
});
