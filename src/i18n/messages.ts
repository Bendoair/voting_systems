export type Locale = 'hu' | 'en'

type Dict = Record<string, string>

export const hu: Dict = {
  'brand.title': 'Választási rendszerek',
  'brand.kitchen': 'Reformkonyha',
  'brand.tagline': 'Hogyan alakítják a szabályok a képviseletet, Magyarország reformvitájának kontextusában',
  'nav.home': 'Kezdőlap',
  'nav.tour': 'Útmutató',
  'nav.systems': 'Rendszerek',
  'nav.simulate': 'Szimuláció',
  'nav.case': 'Esettanulmány',
  'nav.exercises': 'Játékok',
  'nav.lang': 'EN',
  'nav.langSwitch': 'Váltás angolra',
  'nav.theme': 'Színséma',
  'nav.themeDark': 'Sötét',
  'nav.themeLight': 'Világos',
  'nav.main': 'Főmenü',
  'compact.home.guide': 'Hol kezdjem?',
  'compact.home.guideClose': 'Bezárás',
  'segment.dots': 'Szövegszakaszok',
  'compact.sim.tabs': 'Szimuláció panelek',
  'compact.sim.parties': 'Pártok',
  'compact.sim.map': 'Térkép',
  'compact.sim.results': 'Eredmény',
  'compact.sim.geo': 'Geo',
  'compact.case.tabs': 'Esettanulmány szakaszok',
  'compact.case.diet': 'Preferencia',
  'compact.case.list': 'Lista',
  'compact.case.fptp': 'FPTP',
  'compact.case.ranked': 'IRV',
  'compact.case.twoRound': 'Kétforduló',
  'compact.case.geo': 'Földrajz',
  'compact.case.explore': 'Tovább',
  'compact.case.paneTabs': 'Rendszer nézet',
  'compact.case.summary': 'Összegzés',
  'compact.case.map': 'Térkép',
  'compact.systems.tabs': 'Rendszer csoportok',
  'compact.systems.list': 'Lista',
  'compact.systems.local': 'Helyi',
  'compact.systems.mixed': 'Vegyes',
  'compact.detail.tabs': 'Rendszer részletek',
  'compact.detail.summary': 'Összegzés',
  'compact.detail.pros': 'Előny/Hátrány',
  'compact.detail.examples': 'Példák',
  'compact.syspick.tabs': 'Rendszertipp',
  'compact.syspick.deal': 'Mezőny',
  'compact.syspick.pick': 'Választás',
  'compact.syspick.revealTabs': 'Eredmény nézet',
  'compact.syspick.seats': 'Mandátumok',
  'compact.syspick.map': 'Térkép',
  'compact.ex.flavorLink': 'Történet',
  'compact.gerry.rulesP3b':
    'panelen kiválaszthatod a körzetet. A panelt / sávot a képernyő alján lévő kis gombra koppintva nyithatod meg.',
  'compact.gerry.rulesP5b': ' gombot (az alsó sávban).',
  'compact.gerry.rulesP8b': 'gomb (szintén az alsó sávban) helyreteszi a határokat.',
  'compact.openlist.tabs': 'Listahely',
  'compact.openlist.you': 'Te',
  'compact.openlist.campaign': 'Kampány',
  'compact.openlist.rulesP1':
    'A Te fülön: a jelöltkártyád, alatta a lista élő sorrendje. A színezés mutatja, ki van bent a mai D’Hondt-küszöb szerint.',
  'compact.openlist.rulesP2':
    'A Kampány fülön: a te listahelyed, a hét számlálója, majd három kártya - kampány a pártért, kiegyensúlyozott kampány, kampány magadért. A tervezett hatás általában bejön, de néha elhal 🌧️ vagy túlteljesít ⚡.',
  'compact.openlist.rulesP3':
    'Alul a függőleges oszlopok a pártok aktuális arányát mutatják. A többi párt listáját nem látod, csak az aggregált lengést: kampányolhatnak, vagy belviszályba kavarodhatnak.',
  'compact.openlist.rulesP4':
    'Az utolsó hét után jönnek az eredmények. Remélhetőleg bent vagy! Milyen izgi...',
  'home.cta.tour': 'Kezdd az útmutatóval',
  'home.cta.systems': 'Rendszerek magyarázata',
  'home.cta.simulate': 'Próbáld a térképen',
  'home.cta.case': 'Esettanulmány',
  'home.lead':
    'Ez az oldal a különböző szavazási módszereket (a választási rendszereket) járja körül: hogyan alakítják a szabályok a képviseletet.',
  'home.guide.tour': 'Útmutató',
  'home.guide.tourDesc': 'vezetett magyarázat, lépésről lépésre',
  'home.guide.systems': 'Rendszerek',
  'home.guide.systemsDesc': 'részletes magyarázók minden modellhez',
  'home.guide.case': 'Esettanulmány',
  'home.guide.caseDesc': 'ugyanazok a szavazatok, összehasonlítva a szabályok között',
  'home.guide.simulate': 'Szimuláció',
  'home.guide.simulateDesc': 'játssz a számokkal, pártokkal és rendszerekkel',
  'home.guide.games': 'Játékok',
  'home.guide.gamesDesc': 'ha már ismered a rendszereket, teszteld a tudásod játékokkal',

  'systems.title': 'Választási rendszerek',
  'systems.intro':
    'Minden rendszer másra teszi a hangsúlyt: helyi felelősség, arányosság, egyszerűség, vagy hogy kevesebben kényszerüljenek taktikai szavazásra. Kattints egyre a részletekhez és a valós példákhoz.',
  'systems.section.local': 'Helyi képviselők',
  'systems.section.localIntro':
    'Minden körzetben egy győztes van. Erős a helyi kapcsolat, de az országos arányosság gyakran sérül.',
  'systems.section.list': 'Listás rendszerek',
  'systems.section.listIntro':
    'A mandátumokat pártlistákról osztják, zárt vagy nyílt sorrenddel. Az eredmény általában közelebb van a szavazatarányhoz.',
  'systems.section.mixed': 'Vegyes rendszerek',
  'systems.section.mixedIntro':
    'Helyi egyéni ág és lista együtt. A részletszabályok döntik el, mennyire arányos a végeredmény. Magyarország is ide tartozik.',
  'systems.gerry.cta': 'Gerrymander játék',
  'systems.gerry.title': 'Gerrymander játék',
  'systems.syspick.cta': 'Rendszertipp játék',
  'systems.syspick.link': 'Próbáld ki: melyik rendszer adná a legtöbb mandátumot a te pártodnak?',
  'systems.openlist.cta': 'Listahely játék',

  'ex.title': 'Játékok',
  'ex.intro': 'Rövid játékok, amelyek megmutatják, hogyan torzíthatják a szabályok és a határok a képviseletet.',
  'ex.back': '← Játékok',
  'ex.gerry.cardTitle': 'Gerrymander',
  'ex.gerry.badge': 'Mini-játék',
  'ex.gerry.cardBlurb':
    'A gerrymandering azt jelenti, hogy a választókörzetek határait szándékosan úgy rajzolják, hogy egy tábor több mandátumot szerezzen, mint amennyi a szavazataránya alapján „járna”. Tipikus trükkök: az ellenfél összezsúfolása kevés körzetbe (packing), vagy szétaprózása többbe (cracking), így a kisebbség is többséget nyerhet a parlamentben.',
  'ex.gerry.play': 'Játszom',
  'ex.gerry.title': 'Gerrymander: Borókásvölgyhátság',
  'ex.gerry.county': 'Borókásvölgyhátság megye térképe',
  'ex.gerry.rules':
    'Te vagy a kisebbség Borókásvölgyhátságban. Tisztes szavazáson az ellenfél győzne. Szerencsére most te vagy hatalmon, és újrarajzolhatod a körzethatárokat. Légy kreatív! Ne törődj a természetes határokkal! Ne feledd: a te győzelmed Borókásvölgyhátság legjobb érdeke!',
  'ex.gerry.rulesLink': 'Játékszabályok',
  'ex.gerry.rulesClose': 'Bezárás',
  'ex.gerry.rulesP1': 'Ez Borókásvölgyhátság megye teljes térképe.',
  'ex.gerry.rulesP2':
    'A térkép eredeti színezése a szavazók eloszlását mutatja. Minden pixel egy szavazó; a színeket és a szavazók összlétszámát a térkép mellett látod.',
  'ex.gerry.rulesP3a': 'A',
  'ex.gerry.rulesP3b': 'panelen kiválaszthatod a körzetet.',
  'ex.gerry.rulesP4a': 'Körzet bővítéséhez',
  'ex.gerry.rulesP4em': 'karikázz be egy területet',
  'ex.gerry.rulesP4b': 'a térképen. Új területet újabb karikázással adhatsz hozzá.',
  'ex.gerry.rulesP5a': 'Ha hibáztál, használd a',
  'ex.gerry.rulesP5b': ' gombot.',
  'ex.gerry.rulesP6':
    'Ha kész egy körzettel, válaszd a következőt a panelen, és kezdj újra karikázni.',
  'ex.gerry.rulesP7a': 'A jelenleg kiválasztott körzet',
  'ex.gerry.rulesP7em': 'a korábbi fölé rajzol',
  'ex.gerry.rulesP7b': '.',
  'ex.gerry.rulesP8a': 'Ne izgulj a kis szélekért vagy határokért. A',
  'ex.gerry.rulesP8b': 'gomb helyreteszi a határokat.',
  'ex.gerry.rulesP9': 'Sok sikert!',
  'ex.gerry.drawHint': 'Aktív körzettel karikázz be egy területet a térképen.',
  'ex.gerry.view': 'Nézet',
  'ex.gerry.viewVoters': 'Szavazók',
  'ex.gerry.viewDistricts': 'Körzetek',
  'ex.gerry.you': 'Te',
  'ex.gerry.them': 'Ellenfél',
  'ex.gerry.districts': 'Körzetek',
  'ex.gerry.district': 'Körzet',
  'ex.gerry.undo': 'Visszavonás',
  'ex.gerry.redo': 'Újra',
  'ex.gerry.status': 'Állás',
  'ex.gerry.seatsWon': 'megnyert körzet',
  'ex.gerry.need': 'kell',
  'ex.gerry.unfilled': 'Üres cellák',
  'ex.gerry.sizeHint': 'A körzetek mérete legyen a cél közelében',
  'ex.gerry.almostFill': 'Megvan a többség, töltsd ki / javítsd a határokat a győzelemhez.',
  'ex.gerry.sizeWarn': 'méret?',
  'ex.gerry.winSeat': 'tiéd',
  'ex.gerry.loseSeat': 'ellenfél',
  'ex.gerry.tie': 'döntetlen',
  'ex.gerry.victory':
    'Győzelem! Borókásvölgyhátság „akarata” érvényesült, a kisebbségből többség lett a térképen.',
  'ex.gerry.defeat':
    'Minden cella ki van osztva, de nincs meg a többség. Töröld, rajzolj újra, vagy kérj új térképet.',
  'ex.gerry.clear': 'Törlés',
  'ex.gerry.clearAll': 'Összes törlése',
  'ex.gerry.fillBorders': 'Maradék kitöltése',
  'ex.gerry.clearDistrict': 'Körzet törlése',
  'ex.gerry.newMap': 'Új térkép',
  'ex.gerry.difficulty': 'Nehézség',
  'ex.gerry.diff.easy': 'Könnyű',
  'ex.gerry.diff.medium': 'Közepes',
  'ex.gerry.diff.hard': 'Nehéz',
  'ex.gerry.diff.insane': 'Őrült',

  'ex.syspick.cardTitle': 'Rendszertipp',
  'ex.syspick.badge': 'Mini-játék',
  'ex.syspick.cardBlurb':
    'Ugyanazok a szavazatok és ugyanaz a földrajz más számlálási szabály alatt más mandátumarányt adhat. A többségi egyéni rendszerek jutalmazhatják a koncentrált táborokat; az arányos listák közelebb tartják a mandátumokat a szavazatarányhoz; a vegyes és rangsoroló szabályok máshová tolják a kompromisszumot. A „legjobb” rendszer a te pártod helyzetétől függ.',
  'ex.syspick.play': 'Játszom',
  'ex.syspick.title': 'Rendszertipp',
  'ex.syspick.rulesL1': 'Kaptál egy pártot a pakliból.',
  'ex.syspick.rulesL2':
    'A szavazatok és a földrajz már megvannak, te csak a számlálási szabályt választod.',
  'ex.syspick.rulesL3':
    'Nem kell megnyerned a választást: az a cél, hogy eltaláld, melyik rendszer adná a legtöbb mandátumot a te pártodnak.',
  'ex.syspick.rulesL4': 'Tippelj bátran!',
  'ex.syspick.rulesLink': 'Játékszabályok',
  'ex.syspick.rulesClose': 'Bezárás',
  'ex.syspick.rulesP1':
    'Minden körben új pártfelállást kapsz (általában 3–5 párt). A te részesedésed tipikusan ~25% körül mozog (±20); ritkán (~10%) két nagy párt csap össze, és te az egyik vagy.',
  'ex.syspick.rulesP2':
    'Látod a népszerűséget, a hús↔növény pozíciókat és a megyék preferenciatérképét.',
  'ex.syspick.rulesP3':
    'Válassz egy rendszert a szekciók chipjei közül. Győzelem: eltaláltad azt (vagy azokat), ahol a te pártod a legtöbb mandátumot kapja.',
  'ex.syspick.rulesP4':
    'Ha bizonytalan vagy a szabályokban, nyisd meg a rendszerek magyarázóit, ugyanazok a motorok futnak, mint a szimulációban.',
  'ex.syspick.rulesP5': 'Sok sikert!',
  'ex.syspick.youAre': 'A te pártod',
  'ex.syspick.you': 'te',
  'ex.syspick.lineup': 'Pártok a körben',
  'ex.syspick.polarization': 'Polarizáció',
  'ex.syspick.choose': 'Válaszd a rendszert',
  'ex.syspick.chooseHint': 'Egy kattintás, utána kiderül, hol jártál volna a legjobban.',
  'ex.syspick.revealTitle': 'Eredmények a te pártodnak',
  'ex.syspick.revealHint': 'Minden rendszer ugyanazzal a bemenettel futott. A kiemeltek a maximális mandátumot adják.',
  'ex.syspick.seats': 'mandátum',
  'ex.syspick.bestTag': 'legjobb',
  'ex.syspick.yourPick': 'a tipped',
  'ex.syspick.victory':
    'Talált! A tippeddel {seats} mandátum, ez a maximum ebben a körben.',
  'ex.syspick.defeat':
    'Majdnem. A tippeddel {seats} mandátum; a maximum {best} lett volna ({systems}).',
  'ex.syspick.ranking': 'Mandátumok rendszerek szerint',
  'ex.syspick.fullResult': 'Teljes kiosztás: {system}',
  'ex.syspick.newDeal': 'Új kör',
  'ex.syspick.toSystems': 'Rendszerek magyarázata',
  'ex.syspick.geoTitle': 'Földrajz',
  'ex.syspick.geoBlurb': 'Megyék hús ↔ növény alapja ebben a körben.',
  'ex.syspick.nationalLean': 'Országos: {lean}',
  'ex.syspick.mapResults': 'Eredmény a térképen',
  'ex.syspick.mapResultsHint':
    'Ugyanaz a választás, más szabályok. A fülek váltják a térképet, a tipped és a legjobb ki van emelve.',
  'ex.syspick.chip.local': 'Egyéni',
  'ex.syspick.chip.closed-list': 'Lista',
  'ex.syspick.chip.mixed': 'Vegyes',
  'ex.syspick.chip.open-list': 'Nyílt lista',
  'ex.syspick.chip.ranked': 'IRV',
  'ex.syspick.chip.two-round': 'Kétfordulós',
  'ex.syspick.chip.borda': 'Borda',
  'ex.syspick.chip.approval': 'Támogató',
  'ex.syspick.chipDesc.local': 'Relatív többség nyer körzetenként',
  'ex.syspick.chipDesc.closed-list': 'Arányos listás (nyílt / zárt)',
  'ex.syspick.chipDesc.mixed': 'Egyéni + lista együtt',
  'ex.syspick.chipDesc.open-list': 'Listán belül jelöltet is erősíthetsz',
  'ex.syspick.chipDesc.ranked': 'Rangsorolás; átvitelek a körzetben',
  'ex.syspick.chipDesc.two-round': 'Döntő a két élmezőny között',
  'ex.syspick.chipDesc.borda': 'Pontok a teljes rangsorért',
  'ex.syspick.chipDesc.approval': 'Több X; a legtöbb támogatás nyer',

  'ex.openlist.cardTitle': 'Listahely',
  'ex.openlist.badge': 'Mini-játék',
  'ex.openlist.cardBlurb':
    'Nyílt listás arányos rendszerben két számolás fut együtt: a párt szavazataránya (D’Hondt) mondja meg, hány mandátumot kap a lista; a személyes támogatás pedig azt, hogy a listáról ki tölti be ezeket a helyeket. A zárt lista ugyanannyi mandátumot oszt, de befagyasztja a sorrendet.',
  'ex.openlist.play': 'Játszom',
  'ex.openlist.title': 'Listahely',
  'ex.openlist.rulesL1': 'Zedország új, nyílt listás rendszerrel választ.',
  'ex.openlist.rulesL2':
    'Most már nem csak a pártokra, hanem a konkrét politikusokra is lehet szavazni.',
  'ex.openlist.rulesL3':
    'A legjobbat akarod a pártodnak, de te sem akarsz kimaradni.',
  'ex.openlist.rulesL4': 'Van még néhány kampányhét - hozd ki belőle a legtöbbet!',
  'ex.openlist.rulesLink': 'Játékszabályok',
  'ex.openlist.rulesClose': 'Bezárás',
  'ex.openlist.rulesP1':
    'Bal oldalon a te igazolványod, jobb oldalon a lista élő sorrendje. A színezés mutatja, ki van bent a mai D’Hondt-küszöb szerint.',
  'ex.openlist.rulesP2':
    'Lent három kártya: kampány a pártért, kiegyensúlyozott kampány, kampány magadért. A tervezett hatás általában bejön, de néha elhal 🌧️ vagy túlteljesít ⚡.',
  'ex.openlist.rulesP3':
    'A függőleges oszlopok a pártok aktuális arányát mutatják. A többi párt listáját nem látod, csak az aggregált lengést: kampányolhatnak, vagy belviszályba kavarodhatnak.',
  'ex.openlist.rulesP4':
    'Az utolsó hét után jönnek az eredmények. Remélhetőleg bent vagy! Milyen izgi...',
  'ex.openlist.rulesP5': 'Sok sikert!',
  'ex.openlist.youAre': 'A te jelölted',
  'ex.openlist.you': 'te',
  'ex.openlist.in': 'bent',
  'ex.openlist.out': 'kint',
  'ex.openlist.week': 'Kampány: {n}. hét / {total}',
  'ex.openlist.projected': 'Becsült mandátum: {n}',
  'ex.openlist.standings': 'Pártok állása',
  'ex.openlist.newDeal': 'Új kör',
  'ex.openlist.act.party': 'Kampány a pártért',
  'ex.openlist.act.balanced': 'Kiegyensúlyozott kampány',
  'ex.openlist.act.own': 'Kampány magadért',
  'ex.openlist.actHint.party': 'A lista erősödik; te alig mozdulsz.',
  'ex.openlist.actHint.balanced': 'Kicsit a párt, kicsit te.',
  'ex.openlist.actHint.own': 'Te feljebb lépsz; ez nem feltétlenül segít a pártnak.',
  'ex.openlist.news.you': 'A pártod hete',
  'ex.openlist.news.field': 'A mezőny',
  'ex.openlist.you.party.planned': 'Pártos hét: a lista szavazataránya nőtt, a te pontod alig mozdult.',
  'ex.openlist.you.party.fizzle': 'A pártkampány elhalt, sőt visszafelé sült el.',
  'ex.openlist.you.party.overperform': 'A pártkampány túlteljesített: a lista látványosan erősödött.',
  'ex.openlist.you.balanced.planned': 'Kiegyensúlyozott hét: a párt és te is kaptatok egy kicsit.',
  'ex.openlist.you.balanced.fizzle': 'A vegyes hét nem jött össze.',
  'ex.openlist.you.balanced.overperform': 'A vegyes hét mindkét oldalon jobban sikerült a vártnál.',
  'ex.openlist.you.own.planned': 'Saját kampány: te feljebb léptél a listán; a párt alig mozdult.',
  'ex.openlist.you.own.fizzle': 'A saját hét nem hozta a várt emelkedést.',
  'ex.openlist.you.own.overperform': 'A saját kampány berobbant: a listán nagyot léptél.',
  'ex.openlist.field.campaign': 'A {party} a saját jelöltjeit tolta - az arányuk nőtt.',
  'ex.openlist.field.infight': 'A {party} belviszályba kavarodott - az arányuk esett.',
  'ex.openlist.field.quiet': 'A többi párt csendes maradt.',
  'ex.openlist.mate.self':
    '{name} magára kampányolt, és ez a te helyezésedet vagy a küszöböt is átírta.',
  'ex.openlist.counting': 'Számolás…',
  'ex.openlist.final': 'Végleges eredmény',
  'ex.openlist.victory': 'Bejutottál. Helyezésed: {rank}. A párt {seats} mandátumot hozott.',
  'ex.openlist.defeat': 'Kimaradtál. Helyezésed: {rank}; a párt {seats} mandátumot hozott.',
  'ex.openlist.closed.bothIn': 'Zárt listán, az eredeti sorrenddel, te is bejutottál volna.',
  'ex.openlist.closed.openSaved': 'Zárt listán kimaradtál volna - a nyílt lista emelt be.',
  'ex.openlist.closed.openCost': 'Zárt listán bent lettél volna - a nyílt lista mást tolt előre.',
  'ex.openlist.closed.bothOut': 'Zárt listán, az eredeti sorrenddel, sem fértél volna be.',

  'systems.simulate': 'Próbáld a szimulációban',
  'systems.pros': 'Előnyök',
  'systems.cons': 'Hátrányok',
  'systems.when': 'Mikor segít / árt',
  'systems.examples': 'Jelentős példák (Wikipedia)',
  'systems.back': 'Összes rendszer',

  'sys.local.name': 'Helyi képviselők (egyéni, FPTP)',
  'sys.local.summary':
    'Minden választókerületben az kapja az egyetlen mandátumot, aki a legtöbb szavazatot kapja, akkor is, ha nincs abszolút többsége.',
  'sys.local.rationale':
    'A klasszikus „egy körzet, egy képviselő” modell. A választó konkrét személyre szavaz, aki a térséget képviseli a parlamentben. A szabály egyszerű: aki a legtöbbet kapja, az nyer, akkor is, ha a szavazatok többsége más jelöltekre ment.\n\nErős a helyi felelősség: van kit számon kérni. Országosan viszont gyakran eltorzul a pártok aránya. A kisebb pártok, ha a támogatásuk szétszóródik, kevés mandátumot szereznek, vagy semmit.',
  'sys.local.pros':
    'Erős helyi kötődés: van „a te képviselőd”, akit számon kérhetsz.\n\nEgyszerű szavazólap, gyorsan átlátható eredmény.\n\nKönnyebben ad stabil kormánytöbbséget, mint a tiszta arányos rendszerek.',
  'sys.local.cons':
    'A vesztes jelöltekre leadott szavazatok nem hoznak mandátumot („elveszett” szavazatok).\n\nA szavazatarány és a mandátumarány jelentősen eltérhet. Előfordulhat „fordított győzelem” is: a több szavazatot kapó párt kevesebb helyet szerez.\n\nErősen ösztönzi a taktikai szavazást: sokan az „esélyesebbre” szavaznak, nem a legszimpatikusabbra.\n\nA körzethatárok húzása (gerrymandering) önmagában is politikai fegyver lehet.',
  'sys.local.when':
    'Akkor vonzó, ha a helyi felelősség és a személyes képviselet a legfontosabb.\n\nRosszul szolgálja azt, hogy a parlament tükrözze az országos pártarányokat. A magyar reformvitában ezért gyakran éri kritika, ha az egyéni ág túl erős.',

  'sys.closed-list.name': 'Pártlisták (zárt lista)',
  'sys.closed-list.summary':
    'A választó pártra szavaz; a mandátumokat arányosan osztják. A listán belüli sorrendet a párt határozza meg.',
  'sys.closed-list.rationale':
    'Zárt listás arányos rendszerben a szavazatok elsősorban pártokra mennek. A párt előre rögzített listájáról annyi jelölt jut be, ahány mandátumot a párt megszerzett, például D’Hondt-módszerrel.\n\nA parlament összetétele általában közel áll a nemzeti vagy regionális szavazatarányokhoz. A taktikai „kisebbik rossz” nyomás csökken, mert a kisebb pártokra leadott szavazatok is hozhatnak mandátumot, a küszöbtől függően.\n\nA kompromisszum: a választó nem dönt közvetlenül arról, hogy a párt melyik konkrét embere kerüljön be.',
  'sys.closed-list.pros':
    'Jobban tükrözi a szavazatarányt; kevesebb az „elveszett” szavazat.\n\nKisebb pártok és új szereplők is szóhoz juthatnak, ha átlépik a küszöböt.\n\nKevesebb a kényszer, hogy taktikai okból a nagy táborok felé állj át.',
  'sys.closed-list.cons':
    'Gyengébb a közvetlen kapcsolat képviselő és választó között.\n\nA pártvezetés kapuőr: aki a lista elején van, szinte biztosan bejut, a választó beleszólása kevés.\n\nA képviselők inkább a pártnak tartozhatnak felelősséggel, mint a választókerületnek.\n\nMagas bejutási küszöb mellett az arányosság romlik, és újra megjelenik a taktikai szavazás.',
  'sys.closed-list.when':
    'Jó választás, ha a szavazatok és a mandátumok aránya a fő szempont.\n\nKevesebben állnak mellé ott, ahol ragaszkodnak a név szerint megválasztott helyi képviselőhöz. A magyar vitában gyakran ez a viszonyítási pont, ha „tisztább arányosságról” van szó.',

  'sys.mixed.name': 'Vegyes rendszer (a magyarhoz hasonló)',
  'sys.mixed.summary':
    'Egyéni körzeti győztesek és országos (vagy területi) lista. A mai magyar modell rokona; a szimuláció egyszerűsített kompenzációt használ.',
  'sys.mixed.rationale':
    'A vegyes rendszerek helyi képviselőt és listás mandátumot is adnak. Magyarország 2011 óta egyéni többségi ágat és országos listát kombinál. A részletszabályok (győzteskompenzáció, töredékszavazatok) döntően befolyásolják, mennyire arányos a végeredmény.\n\nA német típusú MMP célja általában az, hogy a lista „kijavítsa” az egyéni ág torzítását. A magyar gyakorlatban az egyéni ág súlya és a kompenzáció módja miatt a rendszer gyakran a helyi győzteseket erősíti.\n\nA reformviták központi kérdése: mennyit számítson a helyi győzelem, és mennyire kövesse a parlament a nemzeti szavazatarányt.',
  'sys.mixed.pros':
    'Van helyi arc és országos pártképviselet is.\n\nA magyar választóknak ismerős; kompromisszumként könnyebb elfogadtatni.\n\nElméletben ötvözheti a személyes felelősséget és az arányosságot, ha a listás ág elég erős, és valóban kompenzál.',
  'sys.mixed.cons':
    'Bonyolult szabályok: a választók nehezen látják át, hogyan lesz a szavazatból mandátum.\n\nHa az egyéni ág dominál, vagy a kompenzáció a győzteseket jutalmazza, az arányosság sérül.\n\nKét szavazat, két logika: taktikai viselkedés mindkét ágon megjelenhet.\n\nA nemzetközi „vegyes” címke elfedi a nagy különbségeket, például a német MMP és a magyar rendszer között.',
  'sys.mixed.when':
    'Jó kiindulópont a jelenlegi rendszer megértéséhez.\n\nHa arányosabb parlament a cél, a vita általában a listás ág erősítése, a győzteskompenzáció újragondolása vagy egy tisztább arányos modell felé mozdul.',

  'sys.open-list.name': 'Nyílt lista (sorbeli beleszólással)',
  'sys.open-list.summary':
    'Arányos pártmandátumok, de a választó a listán belüli sorrendet is befolyásolhatja.',
  'sys.open-list.rationale':
    'A nyílt lista megtartja az arányos pártképviseletet, miközben a választó beleszólhat abba, hogy a párt melyik jelöltjei jutnak be. Tipikusan pártra és jelöltre is lehet szavazni; a preferenciák átrendezhetik a lista sorrendjét.\n\nEz részben választ ad a zárt lista kritikájára, hogy a párt dönti el, ki kerül be, anélkül hogy visszatérne a tiszta egyéni többségi rendszerhez. Finnország, Hollandia vagy Brazília különböző erősségű nyílt listás változatokat használ.\n\nA reformvitában gyakran erős ajánlat: arányosság és személyes választás együtt.',
  'sys.open-list.pros':
    'Arányos mandátumelosztás a pártok között.\n\nA választó befolyásolhatja, ki kerül be a pártból; erősebb a személyes legitimáció.\n\nTomítja a teljesen zárt lista elitizmus-érzetét, miközben megtartja a listás arányosság előnyeit.',
  'sys.open-list.cons':
    'Bonyolultabb a szavazólap és a számolás.\n\nListán belüli verseny: a kampány pártársak ellen is folyhat, ami feszültséget szül.\n\nTöbb utánajárás: a választónak több nevet kell ismernie.\n\nHa a preferencia hatása gyenge, gyakorlatilag majdnem zárt listaként működik.',
  'sys.open-list.when':
    'Különösen vonzó, ha arányosságot akarsz, de nem fogadod el, hogy csak a pártvezetés döntsön a személyekről.\n\nA magyar vitában gyakran „középút” a tiszta egyéni rendszer és a teljesen zárt lista között.',

  'sys.ranked.name': 'Rangsoros szavazás (IRV)',
  'sys.ranked.summary':
    'A választó rangsorolja a jelölteket. A leggyengébb kiesik, szavazatai a következő preferenciára kerülnek, amíg valaki többséget nem szerez.',
  'sys.ranked.rationale':
    'Az azonnali második forduló (instant-runoff, IRV) célja, hogy a győztes szélesebb támogatást mutasson, és csökkenjen a „kisebbik rossz” kényszere: ha a kedvenced kiesik, a második vagy harmadik helyen megjelölt jelölt még számíthat.\n\nAusztrália képviselőháza ezt a logikát használja egyéni körzetekben. Fontos: önmagában az IRV nem ad arányos parlamentet, továbbra is körzetenként egy győztes van. Az arányossághoz többmandátumos STV vagy listás elem kell.\n\nA magyar vitában inkább az egyéni ág reformjaként merül fel, nem a teljes arányos váltás helyettesítőjeként.',
  'sys.ranked.pros':
    'Csökkenti, hogy a hasonló jelöltek szétaprózzák a tábort, és a „csak a két esélyesre” taktikai nyomást.\n\nA preferenciák átvitele után a győztesnek általában többsége van, vagy legalábbis szélesebb a támogatása.\n\nLehetővé teszi, hogy a választó őszintébben rangsorolja a kisebb jelölteket is.',
  'sys.ranked.cons':
    'Körzetenként egy mandátum mellett országos arányosságot nem ad.\n\nBonyolultabb számolni és elmagyarázni, mint a relatív többséget.\n\nRitka, de létező stratégiai furcsaságok is előfordulhatnak, például hogy valakinek árt, ha többen teszik első helyre.\n\nA „többségi” érzés körzetenként érvényesül, nem feltétlenül a parlament egészére.',
  'sys.ranked.when':
    'Egyéni versenyekben akkor hasznos, ha a cél a taktikai nyomás csökkentése.\n\nNem helyettesíti a listás arányosságot, ha a vita a nemzeti mandátumarányról szól.',

  'sys.two-round.name': 'Többfordulós (kétfordulós) szavazás',
  'sys.two-round.summary':
    'Ha senki sem szerez abszolút többséget az első fordulóban, a két élen álló (vagy a szabály szerinti továbbjutók) között második forduló dönt.',
  'sys.two-round.rationale':
    'A kétfordulós rendszer a francia elnökválasztásról ismert, de sok országban egyéni képviselőválasztásokon is használják. Magyarország 1990–2010 között az egyéni ágon kétfordulós logikát alkalmazott.\n\nAz első fordulóban a kisebb jelöltek „üzenhetnek” és mérhetik az erejüket; a másodikban a táborok összeállhatnak. A győztes végül abszolút többséget szerez a döntőben, ez erős legitimációs érv.\n\nOrszágos arányosságot azonban ez sem garantál: továbbra is helyi győztesekből áll össze a kép.',
  'sys.two-round.pros':
    'A végső győztesnek többségi támogatása van a döntő fordulóban.\n\nAz első fordulóban a kisebb erők is megjelenhetnek anélkül, hogy a szavazat azonnal „elveszne”.\n\nIsmerős európai minta; korábban a magyar gyakorlatnak is része volt.',
  'sys.two-round.cons':
    'Költségesebb és hosszabb: két választási nap.\n\nA második fordulóban erős taktikai átállás és alkuk jelennek meg.\n\nOrszágosan továbbra is torzíthat, ha a mandátumok egyéni körzetekből jönnek.\n\nA második forduló alacsonyabb részvétele megváltoztathatja az eredményt.',
  'sys.two-round.when':
    'Egyéni tisztségeknél (elnök, polgármester, egyéni képviselő) akkor jó, ha a többségi legitimáció a cél.\n\nOrszágos arányossághoz listás vagy arányos elem kell mellé.',

  'sys.borda.name': 'Rangsoros szavazás (Borda)',
  'sys.borda.summary':
    'A választó rangsorolja a jelölteket. Az első hely n−1 pontot ér, a második n−2-t, az utolsó semmit. A körzetet a legtöbb pont nyeri.',
  'sys.borda.rationale':
    'A Borda-számlálás is rangsoros szavazólapot használ, mint az IRV, de másképp számol: senki nem esik ki menet közben. Minden helyezés pontot ad, ezért a széles körben elfogadható, gyakran középen álló jelölt előnyben van azzal szemben, akinek sok, de szűk első helye van.\n\nEz pont az ellenkezője annak, ami az IRV-nél gyakran megesik: hogy a középen álló kiesik. Nauru a rokon Dowdall-változatot használja (1, ½, ⅓…); Kiribati is módosított Borda-szabályt alkalmazott. A magyar reformvitában ritkán merül fel, de tanulságos: nem kell senkinek az első választásának lenned ahhoz, hogy nyerj.\n\nA szimulációban minden elsőhelyes tábor magát teszi elsőnek, a többieket a hús–növény közelség szerint rangsorolja.',
  'sys.borda.pros':
    'A kompromisszumos jelöltet jutalmazza, nem csak azt, akinek sok első helye van.\n\nMinden helyezés számít, nem csak az, ami a kiesés után átkerül.\n\nKönnyebb elmagyarázni, mint a körönkénti kiesést: pontok, aztán összeg.',
  'sys.borda.cons':
    'Továbbra is körzetenként egy mandátum: országos arányosságot nem ad.\n\nÖsztönzi, hogy a veszélyes riválist szándékosan a lista aljára tegyék.\n\nA nagyon hasonló jelöltek elvihetik egymás pontjait, vagy felhígíthatják a mezőnyt.\n\nHa valakit a lista végére teszel, az is megváltoztathatja, ki nyer.',
  'sys.borda.when':
    'Akkor érdekes, ha a cél egy szélesebb egyetértésű helyi győztes, nem a tábor leghangosabb neve.\n\nNem helyettesíti a listás arányosságot, és nem ugyanaz, mint az IRV, akkor sem, ha mindkettő szavazólapon rangsorolunk.',

  'sys.approval.name': 'Támogató szavazás (Approval)',
  'sys.approval.summary':
    'A választó annyi X-et tehet, amennyit akar: minden jelöltről külön dönt, támogatja vagy sem. A körzetet a legtöbb támogatás nyeri.',
  'sys.approval.rationale':
    'Támogató szavazáskor nincs rangsor és nincs kiesés. Minden jelöltről külön döntés: igen vagy nem. Aki a legtöbb igent kapja, az nyer. Így egy tábor több, egymáshoz közeli jelöltet is támogathat anélkül, hogy szétaprózná magát, mint a relatív többségnél.\n\nFargo (Észak-Dakota) és St. Louis helyi választásokon használta. A szavazólap egyszerűbb, mint a teljes rangsor, de a taktika más: meddig mered X-szel támogatni a második kedvencedet, ha azzal a kedvencedet is veszélyezteted?\n\nA szimulációban minden elsőhelyes tábor magát és a hús–növény tengelyen közeli pártokat támogatja, az ellentétes oldalt nem.',
  'sys.approval.pros':
    'Egyszerű szavazólap: X vagy sem, ahányat csak akarsz.\n\nTomítja, hogy a hasonló jelöltek szétaprózzák a tábort, mert együtt is kaphatnak támogatást.\n\nNincs kiesési kör, és nincs második választási nap.',
  'sys.approval.cons':
    'Körzetenként egy mandátum mellett a parlament továbbra sem arányos.\n\nNem derül ki, kit szeretsz jobban a támogatottak közül.\n\nHa túl sok X-et teszel, a riválisod is nyerhet.\n\nA győztesnek nem kell többség, elég a relatív legtöbb igen.',
  'sys.approval.when':
    'Jól mutatja, hogy a relatív többség spoiler-hatását egyszerű lappal is lehet enyhíteni.\n\nEgyéni tisztségeknél (polgármester, körzeti képviselő) merül fel. Országos arányossághoz lista kell mellé.',

  'sim.title': 'Magyarország-szimuláció',
  'sim.intro':
    'Állítsd be az ország jelenlegi helyzetét. Adj hozzá vagy törölj pártokat, állítsd be az országos szavazatarányukat és a politikai irányultságukat (húspárti – növénykedvelő). Nézd az eredményt a térképen!',
  'sim.introNote':
    'A megyéknek is van hús–növény preferenciájuk, ami befolyásolja az eredményt. Ezek is állíthatók.',
  'sim.introLink': 'Magyarázat',
  'sim.introClose': 'Bezárás',
  'sim.system': 'Rendszer',
  'sim.setup': 'Rendszer és mandátumok',
  'sim.seats': 'Mandátumok száma',
  'sim.seatsFold': 'Mandátumbeállítások',
  'sim.districtSeats': 'Egyéni mandátumok (vegyes)',
  'sim.districtMethod': 'Egyéni mandátum szabálya',
  'sim.districtMethod.plurality': 'Győztes mindent visz (HU-szerű)',
  'sim.districtMethod.ranked': 'Rangsorolt szavazás (IRV)',
  'sim.districtMethod.two-round': 'Kétfordulós',
  'sim.districtMethod.plurality.note':
    'Relatív többség körzetenként + enyhe győztes-kompenzáció a listán (egyszerűsített HU minta).',
  'sim.districtMethod.ranked.note':
    'Ugyanaz a vegyes keret, de a körzeteket IRV dönti el, a kieső pártok szavazatai a hús↔növény tengelyen közeli pártokhoz kerülnek (nem a jelenlegi arányok szerint).',
  'sim.districtMethod.two-round.note':
    'Körzetenként két forduló; a kiesők a két döntős közül a közelebbi ízlésűhöz mennek. A lista továbbra is D’Hondt.',
  'sim.parties': 'Pártok',
  'sim.addParty': 'Új Párt',
  'sim.remove': 'Törlés',
  'sim.voteShare': 'Szavazatarány',
  'sim.voteSum': 'Összesen',
  'sim.voteRemaining': 'Még kiosztható',
  'sim.voteOver': 'Túllépés',
  'sim.proportionalize': 'Arányosítás 100%-ra',
  'sim.dietLean': 'Hús ↔ növény',
  'sim.diet.meat': 'Hús',
  'sim.diet.slightMeat': 'Kicsit hús',
  'sim.diet.mid': 'Közép',
  'sim.diet.slightPlant': 'Kicsit növény',
  'sim.diet.plant': 'Növény',
  'sim.geography': 'Földrajz (hús ↔ növény)',
  'sim.geographyOpen': 'Földrajz',
  'sim.geographyClosed': 'Földrajzi különbségek beállítása',
  'sim.geographyNote':
    'Megyénkénti hús↔növény preferencia. A polarizáció % azt határozza meg, mennyire tolja el ez a preferencia a szavazatokat az országos átlagtól. Egy megyén belül a körzetek között enyhe eltérések lehetnek.',
  'sim.polarization': 'Polarizáció',
  'sim.countyDiet': 'Megye hús↔növény',
  'sim.resetGeo': 'Földrajz alaphelyzet',
  'sim.partyName': 'Párt neve',
  'sim.partyColor': 'Szín',
  'sim.results': 'Eredmény',
  'sim.votes': 'Szavazat %',
  'sim.seatPct': 'Mandátum %',
  'sim.map': 'Megyék és Budapest',
  'sim.mapNote':
    'Hivatalos megyehatárok. Körzeti rendszereknél a szín a megyében legtöbb körzetet nyerő párté; listás rendszereknél a szavazatvezetőé. Élénkebb szín = nagyobb előny.',
  'sim.mapNoteDistrict':
    'Valós OEVK-határok (106 körzet). A szín a körzet győztesét mutatja (nem az első preferencia %-ot). Listás rendszereknél ez egybeesik a szavazatvezetővel.',
  'sim.mapDistrictView': 'Körzet nézet',
  'sim.mapCountyView': 'Megye nézet',
  'sim.mapError': 'A térkép nem tölthető be.',
  'sim.districts': 'Körzeti győztesek',
  'sim.openList': 'Nyílt lista sorrend (példa)',
  'sim.readout': 'Összefoglaló',
  'sim.disprop': 'Aránytalanság',
  'sim.reset': 'Alapértelmezett pártok',
  'sim.gain': '{name} nyer a győztes mindent visz logikából (+{pp} százalékpont mandátum a szavazathoz képest).',
  'sim.loss': '{name} alulreprezentált a szavazatarányához képest ({pp} százalékpont).',
  'sim.fair': '{name} nagyjából arányos ebben a futásban.',
  'sim.listFair': '{name}: szavazat≈mandátum (listás arányosság). Δ={pp} százalékpont',

  'tour.title': 'Útmutató: ízelítő a különböző szabályokból',
  'tour.next': 'Tovább',
  'tour.prev': 'Vissza',
  'tour.step': 'Lépés',
  'tour.of': '/',
  'tour.done': 'Ugrás a rendszerekhez',
  'tour.case': 'Esettanulmány',
  'tour.sim': 'Szimuláció indítása',
  'tour.explore.case': 'Esettanulmány',
  'tour.explore.caseBlurb':
    'Részletes példa: hogyan vezethet a szabályok megváltoztatása egészen más eredményhez ugyanazokból a szavazatokból.',
  'tour.explore.systems': 'Rendszerek',
  'tour.explore.systemsBlurb':
    'A legelterjedtebb választási rendszerek magyarázata, hogyan működnek, és mire jók.',
  'tour.explore.games': 'Játékok',
  'tour.explore.gamesBlurb':
    'Játssz a szabályokkal. Nézd meg, tényleg érted-e az egyes rendszerek előnyeit ezeken a gyakorlatokon keresztül.',
  'tour.explore.sim': 'Szimuláció',
  'tour.explore.simBlurb':
    'Hideg számok és számítások. Nézd meg, melyik rendszer és párt milyen eredményt érhet el, majd állítsd a számokat kedved szerint.',
  'tour.compassAria': 'Preferencia-iránytű',
  'tour.party.fruit': 'Gyümölcs Párt',
  'tour.party.veg': 'Zöldség Párt',
  'tour.party.pork': 'Sertés Párt',
  'tour.party.chicken': 'Csirke Párt',
  'tour.party.fish': 'Hal Párt',

  'tour.s1.title': 'Különbözünk',
  'tour.s1.body':
    'Emberek vagyunk, más a nézetünk, más a szükségünk, más a vágyunk. Ami neked fontos, másnak lehet közömbös; amit te elutasítasz, más épp azt keresi. A politika ebből a különbözőségből indul: hogyan döntünk együtt, ha nem akarjuk ugyanazt.',

  'tour.s2.title': 'Nincs tökéletes egyezés',
  'tour.s2.body':
    'Egy párt soha nem fog minden kérdésben pontosan egyezni veled. Kezdjük két üggyel: hús vagy növény; hagyományos ételek vagy új ételtalálmányok. Két tengely még ábrázolható, a térkép működik. Nézd, mi történik, ahogy jönnek az újabb ügyek.',
  'tour.s2.dims': '{n} dimenzió',
  'tour.s2.ax3Neg': 'Olcsó',
  'tour.s2.ax3Pos': 'Ínyenc',
  'tour.s2.ax4Neg': 'Gyors',
  'tour.s2.ax4Pos': 'Lassan főtt',
  'tour.s2.cap2': 'Két ügy: a térkép működik',
  'tour.s2.cap3': 'Harmadik ügy: olcsó ↔ ínyenc. Még megy.',
  'tour.s2.cap4':
    'Negyedik ügy: ezt már nem lehet őszintén lerajzolni, 4D kellene hozzá.',
  'tour.s2.capMore': 'És jön a következő ügy… és a következő…',
  'tour.s2.capAll': 'A valódi preferenciáid ennyi tengelyen élnek',
  'tour.s2.replay': 'Újra',

  'tour.s3.title': 'Élelmiszer-iránytű',
  'tour.s3.body':
    'Helyezd el magad: hús ↔ növény, hagyományos ↔ Reformkonyha. Kattints a síkra.',
  'tour.s3.xNeg': 'Hús',
  'tour.s3.xPos': 'Növény',
  'tour.s3.yNeg': 'Hagyományos',
  'tour.s3.yPos': 'Reform',
  'tour.s3.you': 'Te',

  'tour.s4.title': 'Pártok a térképen',
  'tour.s4.body': 'A pártok is pozíciókat foglalnak el. Senki nincs pontosan ott, ahol te, csak közelebb vagy távolabb.',

  'tour.s5.title': 'Szavazás a hozzánk legközelebb álló értékekre',
  'tour.s5.body':
    'A pontok választók. Vidd rá az egeret egyre: megjelenik a név, a preferencia, és a vonal a legközelebbi párthoz.',
  'tour.hoverHint': 'Vidd rá az egeret egy pontra',
  'tour.prefers': 'Preferencia',

  'tour.s6.title': 'Taktikai szavazás: Emma',
  'tour.s6.body':
    'Emma szigorú vegetáriánus: húsos pártra soha nem szavazna. Igazából a Gyümölcs Pártot szereti, de tudja, hogy annak kevés az esélye, ezért a Zöldség Pártra szavaz, hogy a „nagyobb rosszat” visszafogja. Ez a taktikai szavazás.',
  'tour.s6.true': 'Igaz preferencia',
  'tour.s6.tact': 'Taktikai szavazat',

  'tour.s7.title': 'Ugyanazok az emberek, más szabályok',
  'tour.s7.body':
    'Fedezd fel tovább, hogyan működnek a különböző rendszerek, milyen problémákat oldanak meg, és milyeneket hozhatnak még létre.',

  'case.title': 'Esettanulmány: ugyanazok a szavazatok, más szabályok',
  'case.intro':
    'Befagyasztott szimuláció: Alma (növény, 44%) áll négy húsos párttal (~56%) szemben, Szőlő kicsit erősebb (15%), a többiek ~13–14%. A szabályok döntik el, hogy a mandátumok a preferenciát követik-e, vagy a megosztott tábor „elrontja” magát.',
  'case.diet.title': 'A preferencia: hús ↔ növény',
  'case.diet.blurb':
    'Oszlopdiagram: X = preferencia (közép = 0), Y = szavazat %. Azonos pozíción a pártok egymásra rakódnak. Átvitelkor a kiesők a közeli ízléshez mennek.',
  'case.diet.xAxis': 'Preferencia (közép = 0)',
  'case.diet.yAxis': 'Szavazat %',
  'case.diet.plotAria': 'Oszlopdiagram: pártok a hús–növény tengelyen (halmozott, ha azonos preferencia)',
  'case.diet.camps': 'Húsos tábor együtt: {meat}% · Növényes tábor: {plant}%',
  'case.pref.title': 'Preferencia vs mandátumok',
  'case.pref.note': 'Húsos vs növényes tábor, szavazatarány állandó; a mandátumarány a szabályokkal változik.',
  'case.pref.votes': 'Szavazat',
  'case.pref.seats': 'Mandátum',
  'case.results': 'Mandátumok pártonként',
  'case.list.title': '1. Tiszta listás arányosság',
  'case.list.body':
    'A megyék színei eltérnek, Budapest növényesebb, a keleti megyék húsosabbak. Országosan a ~56% húsos / ~44% növényes szavazat arányosan jelenik meg a mandátumokban is. A lista követi a preferenciát; a földrajz a térképen látszik, a parlamentben nem torzít el.',
  'case.bridge.title': 'Miért nézzük külön a helyi rendszereket?',
  'case.bridge.body':
    'A vegyes modellek egyéni körzeti ágat is használnak. A torzítás nagy része ott születik, főleg ha a többségi preferencia több pártra szakad. A következő jelenetek ezért csak a helyi képviselőválasztást vizsgálják (106 OEVK).',
  'case.fptp.title': '2. Győztes mindent visz (FPTP)',
  'case.fptp.body':
    'Alma 44%; a húsos oldal négy részre szakad (~13–15%). A kisebb pártok szavazatai „eldobódnak”, ezért az Alma sok körzetben relatív többséggel nyer, még ahol a hely húsos többségű. A spoiler a preferenciát elrejti.',
  'case.fptp.highlight':
    'Alma: {votes}% szavazat → {seatPct}% mandátum ({seats}/106). A megosztott húsos szavazat nagy része „eldobódik”.',
  'case.fptp.diet':
    'Húsos preferencia {meatVotes}% → {meatSeatPct}% mandátum ({meatSeats} vs {plantSeats} növényes). Az IRV/kétforduló összevonja a tábort.',
  'case.ranked.title': '3a. Rangsorolt szavazás (IRV)',
  'case.ranked.body':
    'A kieső húsos pártok szavazatai a tengelyen közeli párthoz mennek. Ez a taktikai összeállás: ahol az Alma csak a megosztott húsos mező miatt nyert volna, ott a húsos tábor átveszi. Nézd a preferencia–mandátum sávot: a szavazatarány változatlan (~56% hús / ~44% növény), a mandátumarány viszont már a többségi preferenciához igazodik. Előny: a mandátumok erősebben követik a preferenciát. Hátrány: továbbra is egyéni győzteses, tehát marad némi aránytalanság.',
  'case.ranked.diet':
    'Ugyanaz a {meatVotes}% húsos preferencia → {meatSeatPct}% mandátum ({meatSeats} vs {plantSeats} növényes). Az átvitelek a preferenciához igazítják az eredményt.',
  'case.twoRound.title': '3b. Kétfordulós választás',
  'case.twoRound.body':
    'Csak a két éllovas megy tovább; a többiek a közelebbi döntőshöz igazodnak a hús↔növény tengelyen. Gyakran hasonló, mint az IRV: a megosztott húsos többség összeállhat. A pártonkénti mandátumok és a térkép is ezt mutatja — a húsos oldal több körzetet visz, mint FPTP alatt. Előny: a második fordulóban a preferencia „láthatóvá” válik. Hátrány: két választási nap, erős taktikai alkuk, és a mandátumok még mindig nem tökéletesen arányosak.',
  'case.twoRound.diet':
    'Húsos tábor: {meatVotes}% szavazat → {meatSeatPct}% mandátum ({meatSeats} vs {plantSeats}). A második forduló újra a preferencia szerint rendezi a versenyt.',
  'case.geo.title': 'Földrajz: hús ↔ növény alap',
  'case.geo.body':
    'A megyék saját hús↔növény alapja (nem a választási győztes). Budapest és a nyugat növényesebb; a keleti megyék húsosabbak. Ez a háttér hajtja a körzeti szavazatokat a szimulációban.',
  'case.geo.mapAria': 'Megyék színezése a hús–növény preferencia szerint',
  'case.cta.games': 'Játékok',
  'case.cta.systems': 'Részletes magyarázók',
  'case.cta.simulate': 'Játsz a szimulációval',
  'case.tour.modeGroup': 'Megjelenítés',
  'case.tour.modeTour': 'Animált túra',
  'case.tour.modePage': 'Egyszerű oldal',
  'case.tour.step': 'Lépés',
  'case.tour.of': '/',
  'case.tour.prev': 'Előző',
  'case.tour.next': 'Következő',
  'case.tour.done': 'Kész',
  'case.tour.s1.meat':
    'Négy párt preferálja a húst, de egyikük sem túl nagy.',
  'case.tour.s1.plant':
    'Csak egy párt preferálja a növényi ételt, az viszont nagy.',
  'case.tour.s1.ladder':
    'A két tábor összevont szavazataránya: kb. 56% húsos, 44% növényes.',
  'case.tour.s2.body':
    'Ahogy láthatod, a mandátumok nagyjából követik az emberek tényleges preferenciáit, enyhe regionális eltérésekkel a szavazásban.',
  'case.tour.s3.body':
    'Egyéni győzteses (FPTP) rendszerben a legnagyobb párt a szavazatok nagy részét „elsöpri”. Ez erős torzításhoz vezethet.',
  'case.tour.s4.a':
    'Rangsorolt szavazásnál a kieső húsos pártok szavazatai a közeli ízléshez mennek. A megosztott többség összeáll: a hús növény feletti tényleges preferenciája most a mandátumokban is átjön.',
  'case.tour.s4.b':
    'Nézd a preferencia vs mandátum sávot: a szavazatarány változatlan, a mandátumsáv viszont már a többséget követi. Egyéni győzteses rendszer lévén még mindig marad némi aránytalanság.',
  'case.tour.s5.a':
    'Kétfordulós rendszerben csak a két éllovas marad; a többiek a közelebbi döntőshöz igazodnak. A pártonkénti mandátumok ismét a húsos többséget mutatják — hasonlóan az IRV-hez.',
  'case.tour.s5.b':
    'A térképen is látszik a váltás: sok körzet, amit FPTP alatt a megosztott húsos mező miatt Alma vitt volna, most a többségi preferencia szerint dől el. A preferencia láthatóbb, de a mandátumok továbbra sem tökéletesen arányosak.',

  'footer.note': '2026. Made with ❤️ by Bendoair',
}

export const en: Dict = {
  'brand.title': 'Voting systems',
  'brand.kitchen': 'Reformed Kitchen',
  'brand.tagline': 'How rules shape representation, in the context of Hungary’s reform debate',
  'nav.home': 'Home',
  'nav.tour': 'Guided tour',
  'nav.systems': 'Systems',
  'nav.simulate': 'Simulate',
  'nav.case': 'Case study',
  'nav.exercises': 'Games',
  'nav.lang': 'HU',
  'nav.langSwitch': 'Switch to Hungarian',
  'nav.theme': 'Theme',
  'nav.themeDark': 'Dark',
  'nav.themeLight': 'Light',
  'nav.main': 'Main menu',
  'compact.home.guide': 'Where to start?',
  'compact.home.guideClose': 'Close',
  'segment.dots': 'Text segments',
  'compact.sim.tabs': 'Simulation panels',
  'compact.sim.parties': 'Parties',
  'compact.sim.map': 'Map',
  'compact.sim.results': 'Results',
  'compact.sim.geo': 'Geo',
  'compact.case.tabs': 'Case study sections',
  'compact.case.diet': 'Preference',
  'compact.case.list': 'List',
  'compact.case.fptp': 'FPTP',
  'compact.case.ranked': 'IRV',
  'compact.case.twoRound': 'Two-round',
  'compact.case.geo': 'Geography',
  'compact.case.explore': 'Explore',
  'compact.case.paneTabs': 'System view',
  'compact.case.summary': 'Summary',
  'compact.case.map': 'Map',
  'compact.systems.tabs': 'System groups',
  'compact.systems.list': 'List',
  'compact.systems.local': 'Local',
  'compact.systems.mixed': 'Mixed',
  'compact.detail.tabs': 'System detail',
  'compact.detail.summary': 'Summary',
  'compact.detail.pros': 'Pros/cons',
  'compact.detail.examples': 'Examples',
  'compact.syspick.tabs': 'System pick',
  'compact.syspick.deal': 'Lineup',
  'compact.syspick.pick': 'Pick',
  'compact.syspick.revealTabs': 'Result view',
  'compact.syspick.seats': 'Seats',
  'compact.syspick.map': 'Map',
  'compact.ex.flavorLink': 'Story',
  'compact.gerry.rulesP3b':
    'panel. The panel/sleeve can be opened by clicking the small button on the bottom of the screen.',
  'compact.gerry.rulesP5b': '. (Found in the sleeve)',
  'compact.gerry.rulesP8b': 'button (also found in the sleeve) will fix the borders.',
  'compact.openlist.tabs': 'List place',
  'compact.openlist.you': 'You',
  'compact.openlist.campaign': 'Campaign',
  'compact.openlist.rulesP1':
    'On You: your ID card sits above the live list order. Tint shows who is in under today’s D’Hondt cutoff.',
  'compact.openlist.rulesP2':
    'On Campaign: your list row, the week counter, then three cards - campaign for party, balanced campaign, campaign for yourself. The intended effect usually lands; sometimes it fizzles 🌧️ or overperforms ⚡.',
  'compact.openlist.rulesP3':
    'The bars below are current party shares. You do not see rival lists - only their aggregate swing. They may push their own candidates, or fall victim to infighting.',
  'compact.openlist.rulesP4':
    'After the last week, see the results. Hopefully you are in! What a nail-biter...',
  'home.cta.tour': 'Start the tour',
  'home.cta.systems': 'Explain the systems',
  'home.cta.simulate': 'Try the map lab',
  'home.cta.case': 'Case study',
  'home.lead':
    'This website explores different methods of voting (voting systems) and how the rules shape representation.',
  'home.guide.tour': 'Tour',
  'home.guide.tourDesc': 'a guided explanation, step by step',
  'home.guide.systems': 'Systems',
  'home.guide.systemsDesc': 'detailed explainers for each model',
  'home.guide.case': 'Case study',
  'home.guide.caseDesc': 'the same votes compared across rules',
  'home.guide.simulate': 'Simulation',
  'home.guide.simulateDesc': 'play around with numbers, parties, and systems',
  'home.guide.games': 'Games',
  'home.guide.gamesDesc': 'if you know the systems, test your knowledge with games',

  'systems.title': 'Voting systems',
  'systems.intro':
    'Each system prioritizes something different: local accountability, proportionality, simplicity, or reducing tactical voting. Open one for details and real-world examples.',
  'systems.section.local': 'Local representatives',
  'systems.section.localIntro':
    'Single-member districts: one local winner. Strong constituency link, but national proportionality often suffers.',
  'systems.section.list': 'List systems',
  'systems.section.listIntro':
    'Seats come from party lists, closed or open order. Closer to national vote share.',
  'systems.section.mixed': 'Mixed systems',
  'systems.section.mixedIntro':
    'Local and list tiers together. The fine print decides how proportional the result is, Hungary sits here.',
  'systems.gerry.cta': 'Gerrymander game',
  'systems.gerry.title': 'Gerrymander game',
  'systems.syspick.cta': 'System pick game',
  'systems.syspick.link': 'Try it: which system would give your party the most seats?',
  'systems.openlist.cta': 'List place game',

  'ex.title': 'Games',
  'ex.intro': 'Short games that show how rules and boundaries can warp representation.',
  'ex.back': '← Games',
  'ex.gerry.cardTitle': 'Gerrymander',
  'ex.gerry.badge': 'Mini-game',
  'ex.gerry.cardBlurb':
    'Gerrymandering means drawing electoral district lines on purpose so one side wins more seats than its share of the vote would suggest. Classic moves: packing opponents into a few districts, or cracking them across many, so a minority can still take a majority of seats.',
  'ex.gerry.play': 'Play now',
  'ex.gerry.title': 'Gerrymander: Upper-Juniperhollow-on-the-Heights',
  'ex.gerry.county': 'Upper-Juniperhollow-on-the-Heights County Map',
  'ex.gerry.rules':
    'You are the minority in Upper-Juniperhollow-on-the-Heights. In a fair vote, your opponent would win. Luckily you are currently in power, and you get to redraw the district lines. Be creative! Do not care about natural boundaries! Remember: you winning is in the best interest of Upper-Juniperhollow-on-the-Heights!',
  'ex.gerry.rulesLink': 'Game rules',
  'ex.gerry.rulesClose': 'Close',
  'ex.gerry.rulesP1': 'This is the whole map of Upper-Juniperhollow-on-the-Heights County.',
  'ex.gerry.rulesP2':
    'The original coloring of the map represents the voter distribution. Each pixel is one voter; the colors and total voter count are shown next to the map.',
  'ex.gerry.rulesP3a': 'You can select the district on the',
  'ex.gerry.rulesP3b': 'panel.',
  'ex.gerry.rulesP4a': 'To add to a district,',
  'ex.gerry.rulesP4em': 'circle an area on the map',
  'ex.gerry.rulesP4b': '. You can add a new area by circling a new region.',
  'ex.gerry.rulesP5a': 'If you made a mistake, use',
  'ex.gerry.rulesP5b': '.',
  'ex.gerry.rulesP6':
    'Once finished with a district, select the next one on the panel and start circling.',
  'ex.gerry.rulesP7a': 'The currently selected district will',
  'ex.gerry.rulesP7em': 'draw over the previous one',
  'ex.gerry.rulesP7b': '.',
  'ex.gerry.rulesP8a': 'Do not fret about small edges or boundaries. The',
  'ex.gerry.rulesP8b': 'button will fix the borders.',
  'ex.gerry.rulesP9': 'Good luck!',
  'ex.gerry.drawHint': 'With a district selected, circle an area on the map.',
  'ex.gerry.view': 'View',
  'ex.gerry.viewVoters': 'Voters',
  'ex.gerry.viewDistricts': 'Districts',
  'ex.gerry.you': 'You',
  'ex.gerry.them': 'Opponent',
  'ex.gerry.districts': 'Districts',
  'ex.gerry.district': 'District',
  'ex.gerry.undo': 'Undo',
  'ex.gerry.redo': 'Redo',
  'ex.gerry.status': 'Status',
  'ex.gerry.seatsWon': 'districts won',
  'ex.gerry.need': 'need',
  'ex.gerry.unfilled': 'Unfilled cells',
  'ex.gerry.sizeHint': 'Keep district sizes near the target',
  'ex.gerry.almostFill': 'You have the majority, fill remaining space to lock in the win.',
  'ex.gerry.sizeWarn': 'size?',
  'ex.gerry.winSeat': 'yours',
  'ex.gerry.loseSeat': 'theirs',
  'ex.gerry.tie': 'tie',
  'ex.gerry.victory':
    'Victory! The “will” of Upper-Juniperhollow-on-the-Heights prevails, minority votes, majority of seats.',
  'ex.gerry.defeat':
    'The map is fully assigned, but you don’t have the majority. Clear, redraw, or deal a new map.',
  'ex.gerry.clear': 'Clear',
  'ex.gerry.clearAll': 'Clear all',
  'ex.gerry.fillBorders': 'Fill Remaining Space',
  'ex.gerry.clearDistrict': 'Clear district',
  'ex.gerry.newMap': 'New map',
  'ex.gerry.difficulty': 'Difficulty',
  'ex.gerry.diff.easy': 'Easy',
  'ex.gerry.diff.medium': 'Medium',
  'ex.gerry.diff.hard': 'Hard',
  'ex.gerry.diff.insane': 'Insane',

  'ex.syspick.cardTitle': 'System pick',
  'ex.syspick.badge': 'Mini-game',
  'ex.syspick.cardBlurb':
    'The same votes and the same geography can yield different seat shares under different counting rules. Majority single-member systems can reward concentrated camps; proportional lists keep seats closer to vote share; mixed and ranked rules shift the trade-offs elsewhere. Which system is “best” depends on where your party sits.',
  'ex.syspick.play': 'Play now',
  'ex.syspick.title': 'System pick',
  'ex.syspick.rulesL1': 'You drew a party from the deck.',
  'ex.syspick.rulesL2':
    'The votes and the map are already dealt, you only choose the counting rules.',
  'ex.syspick.rulesL3':
    'You do not need to win the election: your job is to guess which system would award your party the most seats.',
  'ex.syspick.rulesL4': 'Take the shot!',
  'ex.syspick.rulesLink': 'Game rules',
  'ex.syspick.rulesClose': 'Close',
  'ex.syspick.rulesP1':
    'Each round deals a fresh lineup (usually 3–5 parties). Your vote share is typically around ~25% (±20); about 10% of the time you face a two-party duel as one of two large camps.',
  'ex.syspick.rulesP2':
    'You see vote shares, meat↔plant positions, and the county preference map.',
  'ex.syspick.rulesP3':
    'Pick a system from the section chips. You win if you chose a system (or any tied systems) that maximizes your party’s seats.',
  'ex.syspick.rulesP4':
    'If the rules feel fuzzy, open the system explainers, the same engines run as in the simulation.',
  'ex.syspick.rulesP5': 'Good luck!',
  'ex.syspick.youAre': 'Your party',
  'ex.syspick.you': 'you',
  'ex.syspick.lineup': 'Parties this round',
  'ex.syspick.polarization': 'Polarization',
  'ex.syspick.choose': 'Pick a system',
  'ex.syspick.chooseHint': 'One click, then you see where you would have done best.',
  'ex.syspick.revealTitle': 'Seats for your party',
  'ex.syspick.revealHint': 'Every system ran on the same inputs. Highlights mark the maximum seat count.',
  'ex.syspick.seats': 'seats',
  'ex.syspick.bestTag': 'best',
  'ex.syspick.yourPick': 'your pick',
  'ex.syspick.victory':
    'Nailed it! Your pick yields {seats} seats, the maximum this round.',
  'ex.syspick.defeat':
    'Close. Your pick yields {seats} seats; the maximum was {best} ({systems}).',
  'ex.syspick.ranking': 'Seats by system',
  'ex.syspick.fullResult': 'Full allocation: {system}',
  'ex.syspick.newDeal': 'New round',
  'ex.syspick.toSystems': 'System explainers',
  'ex.syspick.geoTitle': 'Geography',
  'ex.syspick.geoBlurb': 'County meat ↔ plant baselines this round.',
  'ex.syspick.nationalLean': 'National: {lean}',
  'ex.syspick.mapResults': 'Results on the map',
  'ex.syspick.mapResultsHint':
    'Same election, different rules. Tabs switch the map, your pick and the best are highlighted.',
  'ex.syspick.chip.local': 'FPTP',
  'ex.syspick.chip.closed-list': 'List',
  'ex.syspick.chip.mixed': 'Mixed',
  'ex.syspick.chip.open-list': 'Open list',
  'ex.syspick.chip.ranked': 'IRV',
  'ex.syspick.chip.two-round': 'Two-round',
  'ex.syspick.chip.borda': 'Borda',
  'ex.syspick.chip.approval': 'Approval',
  'ex.syspick.chipDesc.local': 'Plurality wins each district',
  'ex.syspick.chipDesc.closed-list': 'Proportional list (open / closed)',
  'ex.syspick.chipDesc.mixed': 'Local seats plus a list',
  'ex.syspick.chipDesc.open-list': 'Boost candidates on the list',
  'ex.syspick.chipDesc.ranked': 'Rank choices; transfers locally',
  'ex.syspick.chipDesc.two-round': 'Runoff between the top two',
  'ex.syspick.chipDesc.borda': 'Points for the full ranking',
  'ex.syspick.chipDesc.approval': 'As many Xs as you like; most wins',

  'ex.openlist.cardTitle': 'List place',
  'ex.openlist.badge': 'Mini-game',
  'ex.openlist.cardBlurb':
    'Open-list PR is two coupled counts: party vote share (D’Hondt) sets how many seats the list wins; personal preference decides who fills those seats. Closed list shares the first count and freezes the second.',
  'ex.openlist.play': 'Play now',
  'ex.openlist.title': 'List place',
  'ex.openlist.rulesL1':
    'Zedcountry is electing with a fancy new open-list system.',
  'ex.openlist.rulesL2':
    'In this election it is not just the parties, but the specific politicians, that can get votes.',
  'ex.openlist.rulesL3':
    'You want the best for your party, but you don’t want to get left out either.',
  'ex.openlist.rulesL4':
    'There are still a few weeks of campaigning left - try and make the most of it!',
  'ex.openlist.rulesLink': 'Game rules',
  'ex.openlist.rulesClose': 'Close',
  'ex.openlist.rulesP1':
    'Left is your ID card; right is the live list order. Tint shows who is in under today’s D’Hondt cutoff.',
  'ex.openlist.rulesP2':
    'Below, three cards: campaign for party, balanced campaign, campaign for yourself. The intended effect usually lands; sometimes it fizzles 🌧️ or overperforms ⚡.',
  'ex.openlist.rulesP3':
    'The vertical bars are current party shares. You do not see rival lists - only their aggregate swing. They may push their own candidates, or fall victim to infighting.',
  'ex.openlist.rulesP4':
    'After the last week, see the results. Hopefully you are in! What a nail-biter...',
  'ex.openlist.rulesP5': 'Good luck!',
  'ex.openlist.youAre': 'Your candidate',
  'ex.openlist.you': 'you',
  'ex.openlist.in': 'in',
  'ex.openlist.out': 'out',
  'ex.openlist.week': 'Campaign: Week {n} / {total}',
  'ex.openlist.projected': 'Projected seats: {n}',
  'ex.openlist.standings': 'Party standings',
  'ex.openlist.newDeal': 'New deal',
  'ex.openlist.act.party': 'Campaign for Party',
  'ex.openlist.act.balanced': 'Balanced Campaign',
  'ex.openlist.act.own': 'Campaign for Yourself',
  'ex.openlist.actHint.party': 'The list rises; you barely move.',
  'ex.openlist.actHint.balanced': 'A little for the party, a little for you.',
  'ex.openlist.actHint.own': 'You climb; that won’t necessarily help the party.',
  'ex.openlist.news.you': 'Your party’s week',
  'ex.openlist.news.field': 'The field',
  'ex.openlist.you.party.planned': 'Party week: list share rose; your personal score barely moved.',
  'ex.openlist.you.party.fizzle': 'The party campaign fizzled - or backfired.',
  'ex.openlist.you.party.overperform': 'The party campaign overperformed: the list surged.',
  'ex.openlist.you.balanced.planned': 'Balanced week: the party and you both ticked up a little.',
  'ex.openlist.you.balanced.fizzle': 'The mixed week did not land.',
  'ex.openlist.you.balanced.overperform': 'The mixed week beat the plan on both sides.',
  'ex.openlist.you.own.planned': 'Own campaign: you climbed the list; the party barely moved.',
  'ex.openlist.you.own.fizzle': 'The self week did not deliver the climb you wanted.',
  'ex.openlist.you.own.overperform': 'Your self campaign exploded: a big jump on the list.',
  'ex.openlist.field.campaign': '{party} pushed their own candidates - their share rose.',
  'ex.openlist.field.infight': '{party} fell victim to infighting - their share slipped.',
  'ex.openlist.field.quiet': 'The other parties stayed quiet.',
  'ex.openlist.mate.self':
    '{name} campaigned for themselves, and that changed your rank or the cutoff.',
  'ex.openlist.counting': 'Counting…',
  'ex.openlist.final': 'Final result',
  'ex.openlist.victory': 'You are in. Rank {rank}. The party won {seats} seats.',
  'ex.openlist.defeat': 'You missed the cut. Rank {rank}; the party won {seats} seats.',
  'ex.openlist.closed.bothIn': 'On a closed list, in the original order, you would have gotten in too.',
  'ex.openlist.closed.openSaved': 'A closed list would have left you out - the open list brought you in.',
  'ex.openlist.closed.openCost': 'A closed list would have seated you - the open list pushed someone else in.',
  'ex.openlist.closed.bothOut': 'On a closed list, in the original order, you would still have missed it.',

  'systems.simulate': 'Simulate with this',
  'systems.pros': 'Pros',
  'systems.cons': 'Drawbacks',
  'systems.when': 'When it helps / hurts',
  'systems.examples': 'Notable examples (Wikipedia)',
  'systems.back': 'All systems',

  'sys.local.name': 'Local representatives (FPTP)',
  'sys.local.summary':
    'In each constituency, the candidate with the most votes wins the single seat, even without an absolute majority.',
  'sys.local.rationale':
    'The classic “one district, one representative” model. Voters choose a person who will speak for the area. The rule is simple: most votes wins, even if most ballots went to someone else.\n\nThat gives strong local accountability and a clear face to blame or praise, but nationally it often warps party seat shares. Smaller parties with geographically scattered support can win few or no seats.',
  'sys.local.pros':
    'Strong local link: there is “your MP” to hold to account.\n\nSimple ballot and a fast, transparent result.\n\nCan produce stable governing majorities more easily than pure PR.',
  'sys.local.cons':
    'Votes for losing candidates do not elect anyone (“wasted” votes).\n\nNational vote share and seat share can diverge sharply, including “wrong winner” elections where the party with more votes wins fewer seats.\n\nStrongly encourages tactical voting for the “viable” candidate rather than the sincere first choice.\n\nDistrict boundary drawing (gerrymandering) can itself become a political weapon.',
  'sys.local.when':
    'Attractive when local responsibility and personal representation are the top priority.\n\nA poor fit if the goal is a parliament that mirrors national party preferences, a frequent criticism when the single-member tier is too strong in Hungary’s reform debate.',

  'sys.closed-list.name': 'Party lists (closed list)',
  'sys.closed-list.summary':
    'Voters choose a party; seats are allocated proportionally. The party fixes the order of candidates on the list.',
  'sys.closed-list.rationale':
    'Under closed-list PR, ballots go primarily to parties. As many candidates enter as the party wins seats (e.g. via D’Hondt), in the party’s pre-set order.\n\nParliament usually tracks national (or regional) vote shares closely. The “lesser evil” pressure eases because votes for smaller parties can still yield seats, depending on thresholds.\n\nThe trade-off: voters do not directly pick which individuals from the party get in.',
  'sys.closed-list.pros':
    'Closer match between votes and seats; fewer wasted ballots.\n\nSmaller parties and new entrants can win a voice if they clear the threshold.\n\nLess pressure to abandon sincere preferences for large blocks.',
  'sys.closed-list.cons':
    'Weaker direct local MP–voter link.\n\nParty leadership as gatekeeper: those at the top of the list are almost guaranteed entry.\n\nMPs may be more accountable to the party than to a geographic district.\n\nHigh thresholds reintroduce disproportionality and tactical voting.',
  'sys.closed-list.when':
    'A strong choice when fairness between votes and seats is the goal.\n\nLess popular where people insist on a named local representative. In Hungary’s debate it is often the reference point for “cleaner proportionality.”',

  'sys.mixed.name': 'Mixed system (Hungary-like)',
  'sys.mixed.summary':
    'Single-member district winners plus a national (or regional) list. Related to Hungary’s current model, the simulation uses a simplified compensation rule.',
  'sys.mixed.rationale':
    'Mixed systems give both a local representative and list seats. Since 2011 Hungary combines a single-member plurality tier with a national list; details such as winner compensation and surplus votes heavily shape how proportional the outcome is.\n\nGerman-style MMP usually aims for the list to correct district distortions. In Hungarian practice, the weight of the district tier and the form of compensation often strengthen local winners.\n\nReform debates center on how much a local win should count versus how closely parliament should track the national vote.',
  'sys.mixed.pros':
    'A local face and national party representation.\n\nFamiliar to Hungarian voters; sellable as a compromise.\n\nIn principle can combine personal accountability with proportionality (if the list tier is strong and truly compensatory).',
  'sys.mixed.cons':
    'Complex rules: voters struggle to see how a ballot becomes a seat.\n\nIf the district tier dominates or compensation rewards winners, proportionality suffers.\n\nTwo votes / two logics: tactical behavior can appear on both tiers.\n\nThe “mixed” label hides large differences (e.g. German MMP vs. Hungary).',
  'sys.mixed.when':
    'The right place to start for understanding the status quo.\n\nIf the goal is a fairer parliament, debate typically moves toward a stronger list tier, revisiting winner compensation, or a cleaner proportional model.',

  'sys.open-list.name': 'Open list (preferential list)',
  'sys.open-list.summary':
    'Proportional party seats, but voters can also reshape order within the list through preference votes.',
  'sys.open-list.rationale':
    'Open lists keep proportional party representation while giving voters a say in which candidates from the party enter. Ballots may mark a party and/or candidates; preferences can reorder the list.\n\nThat answers part of the closed-list “gatekeeper” critique without returning to pure single-member plurality. Finland, the Netherlands, and Brazil use open-list variants of different strength.\n\nIn reform discussions it is often a strong option: proportionality plus personal choice.',
  'sys.open-list.pros':
    'Proportional allocation among parties.\n\nVoters can influence who from the party gets in, stronger personal legitimacy.\n\nSoftens the elitism of fully closed lists while keeping list-PR benefits.',
  'sys.open-list.cons':
    'More complex ballots and counting.\n\nIntra-party competition: campaigning against running mates can create tension.\n\nInformation cost: voters need to know more names.\n\nIf preference effects are weak, it behaves almost like a closed list.',
  'sys.open-list.when':
    'Especially attractive if you want proportionality but reject letting only party leaders pick the people.\n\nIn Hungary’s debate it is often pitched as a middle path between pure local FPTP and fully closed lists.',

  'sys.ranked.name': 'Ranked choice (IRV)',
  'sys.ranked.summary':
    'Voters rank candidates. The weakest is eliminated and ballots transfer to the next preference until someone has a majority.',
  'sys.ranked.rationale':
    'Instant-runoff voting (IRV) aims for broader winner support and less “lesser evil” pressure: if your favorite is eliminated, your next ranks still matter.\n\nAustralia’s House of Representatives uses this logic in single-member seats. Important: IRV alone does not make a proportional parliament, there is still one winner per district. Proportionality needs multi-member STV or a list element.\n\nIn Hungary it appears more as a reform of the single-member tier than as a full substitute for proportional change.',
  'sys.ranked.pros':
    'Reduces spoiler effects and “only the top two” tactical pressure.\n\nThe winner typically shows majority (or at least broader) support after transfers.\n\nLets voters sincerely rank smaller candidates without “wasting” the ballot.',
  'sys.ranked.cons':
    'Does not deliver national proportionality in single-member districts.\n\nHarder to count and explain than FPTP.\n\nRare but real strategic quirks (e.g. non-monotonicity) exist in theory.\n\n“Majoritarian” legitimacy is per district, not necessarily for parliament as a whole.',
  'sys.ranked.when':
    'Useful in single-seat races when the goal is less tactical pressure.\n\nNot a substitute for list proportionality when the debate is about national seat shares.',

  'sys.two-round.name': 'Multi-round (two-round) voting',
  'sys.two-round.summary':
    'If nobody wins an absolute majority in round one, a runoff between the top two (or other qualifiers under the rules) decides.',
  'sys.two-round.rationale':
    'The two-round system is famous from French presidential elections and is also used for many single-member legislative races. Hungary used a two-round logic on the single-member tier from 1990–2010.\n\nRound one lets smaller candidates measure strength; round two lets camps coalesce. The eventual winner has an absolute majority in the runoff, a strong legitimacy argument.\n\nIt still does not guarantee national proportionality: the chamber is built from local winners.',
  'sys.two-round.pros':
    'The final winner has majority support in the decisive round.\n\nRound one lets smaller forces appear without an immediately “wasted” vote.\n\nA familiar European pattern; historically part of Hungarian practice too.',
  'sys.two-round.cons':
    'Costlier and longer (two election days).\n\nRound two brings heavy tactical shifts and bargaining.\n\nNationally still distorting if seats come from single-member districts.\n\nLower turnout in the runoff can change the result.',
  'sys.two-round.when':
    'Works well for single offices (president, mayor, single-member MP) when majority legitimacy is the goal.\n\nNeeds a list or proportional element alongside it for national fairness.',

  'sys.borda.name': 'Ranked choice (Borda)',
  'sys.borda.summary':
    'Voters rank candidates. First place is worth n−1 points, second n−2, last zero. Most points wins the district.',
  'sys.borda.rationale':
    'Borda uses the same ranked ballot as IRV, but counts differently: nobody is eliminated. Every rank scores points, so a broadly acceptable (often centrist) candidate beats a narrower first-place lead.\n\nThat is the opposite of IRV’s “center squeeze.” Nauru uses the related Dowdall weights (1, 1/2, 1/3…); Kiribati has used a modified Borda rule. It rarely appears in Hungary’s reform debate, but it teaches a sharp lesson: you don’t have to be anyone’s first choice to win.\n\nIn the simulation each first-preference camp ranks itself first and the others by meat↔plant closeness.',
  'sys.borda.pros':
    'Rewards a compromise candidate, not only a loud first-place pile.\n\nEvery rank counts, not only transfers after elimination.\n\nEasier to explain than round-by-round knockouts: points, then a total.',
  'sys.borda.cons':
    'Still one winner per district: no national proportionality.\n\nInvites burial: rank a dangerous rival last on purpose.\n\nClones (similar candidates) can split points or dilute the field.\n\nNot later-no-harm: an extra lower rank can change the winner.',
  'sys.borda.when':
    'Interesting when the goal is a broadly agreeable local winner, not the loudest name in the camp.\n\nNot a substitute for list PR, and not the same as IRV, even though both use a ranked ballot.',

  'sys.approval.name': 'Approval voting',
  'sys.approval.summary':
    'Voters may mark as many Xs as they like: approve a candidate or not. Most approvals wins the district.',
  'sys.approval.rationale':
    'Under approval there is no ranking and no elimination. Each candidate is a yes/no. Whoever has the most yeses wins. A camp can support several nearby names without spoiling itself the way FPTP does.\n\nFargo (North Dakota) and St. Louis have used it locally. The ballot is simpler than a full ranking, but the tactic is different: how far do you dare approve your second choice if that might beat your favorite?\n\nIn the simulation each first-preference camp approves itself and parties close on the meat↔plant axis (not the opposite side).',
  'sys.approval.pros':
    'Simple ballot: X or not, as many as you want.\n\nSoftens spoilers, because nearby candidates can share support.\n\nNo elimination rounds and no second election day.',
  'sys.approval.cons':
    'Still not proportional in single-member districts.\n\nDoes not say whom you prefer among those you approved.\n\nTactics: “too many” Xs can elect a rival.\n\nThe winner needs only the most yeses, not a majority.',
  'sys.approval.when':
    'A useful teaching tool when the debate is whether FPTP spoilers can be eased with a simple ballot.\n\nComes up for single offices (mayor, district MP); national fairness still needs a list beside it.',

  'sim.title': 'Hungary simulation',
  'sim.intro':
    'Set up the current situation in the country. Add or remove parties, set their national vote share and their political leaning (prefer meat – prefer plant). See the results on the map!',
  'sim.introNote':
    'The counties have meat–plant preferences that influence the results. These can also be changed.',
  'sim.introLink': 'About',
  'sim.introClose': 'Close',
  'sim.system': 'System',
  'sim.setup': 'System & seats',
  'sim.seats': 'Total seats',
  'sim.seatsFold': 'Seat settings',
  'sim.districtSeats': 'District seats (mixed)',
  'sim.districtMethod': 'District seat rule',
  'sim.districtMethod.plurality': 'First past the post (HU-like)',
  'sim.districtMethod.ranked': 'Ranked choice (IRV)',
  'sim.districtMethod.two-round': 'Two-round runoff',
  'sim.districtMethod.plurality.note':
    'Plurality in each district plus mild winner compensation on the list (simplified HU pattern).',
  'sim.districtMethod.ranked.note':
    'Same mixed frame, but districts use IRV, eliminated ballots transfer to parties close on the meat↔plant axis (not proportional to current totals).',
  'sim.districtMethod.two-round.note':
    'Majority runoff in each district; eliminated ballots go to the closer finalist on the diet axis. List stays D’Hondt.',
  'sim.parties': 'Parties',
  'sim.addParty': 'Add party',
  'sim.remove': 'Remove',
  'sim.voteShare': 'Vote share',
  'sim.voteSum': 'Total',
  'sim.voteRemaining': 'Left to assign',
  'sim.voteOver': 'Over by',
  'sim.proportionalize': 'Scale to 100%',
  'sim.dietLean': 'Meat ↔ plant',
  'sim.diet.meat': 'Meat',
  'sim.diet.slightMeat': 'Slight meat',
  'sim.diet.mid': 'Middle',
  'sim.diet.slightPlant': 'Slight plant',
  'sim.diet.plant': 'Plant',
  'sim.geography': 'Geography (meat ↔ plant)',
  'sim.geographyOpen': 'Geography',
  'sim.geographyClosed': 'Set geographic differences',
  'sim.geographyNote':
    'Per-county meat↔plant preference. Polarization % determines how strongly this preference pulls votes away from the national average. Districts within a county may show slight variations.',
  'sim.polarization': 'Polarization',
  'sim.countyDiet': 'County meat↔plant',
  'sim.resetGeo': 'Reset geography',
  'sim.partyName': 'Party name',
  'sim.partyColor': 'Color',
  'sim.results': 'Results',
  'sim.votes': 'Vote %',
  'sim.seatPct': 'Seat %',
  'sim.map': 'Counties and Budapest',
  'sim.mapNote':
    'Official county boundaries. Under district systems, color is the party that won the most seats there; under list systems, the vote leader. Stronger leads look more saturated.',
  'sim.mapNoteDistrict':
    'Real OEVK boundaries (106 districts). Color shows who won the district (not first-preference %). Under list systems that matches the vote leader.',
  'sim.mapDistrictView': 'District view',
  'sim.mapCountyView': 'County view',
  'sim.mapError': 'Map could not be loaded.',
  'sim.districts': 'District winners',
  'sim.openList': 'Open-list order (example)',
  'sim.readout': 'Readout',
  'sim.disprop': 'Disproportionality',
  'sim.reset': 'Reset default parties',
  'sim.gain': '{name} gains from winner-take-district logic (+{pp} pp seats vs votes).',
  'sim.loss': '{name} under-rewarded vs vote share ({pp} pp).',
  'sim.fair': '{name} roughly proportional under this run.',
  'sim.listFair': '{name}: vote≈seat (list proportionality). Δ={pp} pp',

  'tour.title': 'Tour: a taste of the different rules',
  'tour.next': 'Next',
  'tour.prev': 'Back',
  'tour.step': 'Step',
  'tour.of': 'of',
  'tour.done': 'Go to systems',
  'tour.case': 'Case study',
  'tour.sim': 'Open simulation',
  'tour.explore.case': 'Case study',
  'tour.explore.caseBlurb':
    'A detailed case study showing how changing the system can lead to vastly different outcomes from the same votes.',
  'tour.explore.systems': 'Systems',
  'tour.explore.systemsBlurb':
    'Clear explainers of the most common voting systems, how each works and what it is for.',
  'tour.explore.games': 'Games',
  'tour.explore.gamesBlurb':
    'Play with the rules yourself. See whether you really grasp each system’s strengths through these exercises.',
  'tour.explore.sim': 'Simulate',
  'tour.explore.simBlurb':
    'Cold, hard numbers. See what systems and parties might achieve, then tweak the inputs to your liking.',
  'tour.compassAria': 'Preference compass',
  'tour.party.fruit': 'Fruit Party',
  'tour.party.veg': 'Vegetable Party',
  'tour.party.pork': 'Pork Party',
  'tour.party.chicken': 'Chicken Party',
  'tour.party.fish': 'Fish Party',

  'tour.s1.title': 'We differ',
  'tour.s1.body':
    'We are people, different views, different needs, different wants. What matters to you may leave someone else cold; what you reject may be exactly what they seek. Politics starts from that difference: how do we decide together when we do not want the same things?',

  'tour.s2.title': 'No perfect match',
  'tour.s2.body':
    'No party will match you on every issue. Start with two: meat or plant; old-school dishes or new food inventions. Two axes still draw fine, the map works. Watch what happens as more issues arrive.',
  'tour.s2.dims': '{n} dimensions',
  'tour.s2.ax3Neg': 'Cheap',
  'tour.s2.ax3Pos': 'Fine dining',
  'tour.s2.ax4Neg': 'Quick',
  'tour.s2.ax4Pos': 'Slow-cooked',
  'tour.s2.cap2': 'Two issues: the map works',
  'tour.s2.cap3': 'Third issue: cheap ↔ fine dining. Still fine.',
  'tour.s2.cap4': 'Fourth issue: no honest way to draw it, that would need 4D.',
  'tour.s2.capMore': 'And the next issue… and the next…',
  'tour.s2.capAll': 'Your real preferences live on this many axes',
  'tour.s2.replay': 'Replay',

  'tour.s3.title': 'Food compass',
  'tour.s3.body':
    'Place yourself: meat ↔ plant, traditional ↔ Reformed Kitchen. Click the plane.',
  'tour.s3.xNeg': 'Meat',
  'tour.s3.xPos': 'Plant',
  'tour.s3.yNeg': 'Traditional',
  'tour.s3.yPos': 'Reformed',
  'tour.s3.you': 'You',

  'tour.s4.title': 'Parties on the map',
  'tour.s4.body': 'Parties take positions too. Nobody sits exactly where you do, only nearer or farther.',

  'tour.s5.title': 'Vote for the nearest',
  'tour.s5.body':
    'Each dot is a voter. Hover one to see their name, preference, and a line to the nearest party.',
  'tour.hoverHint': 'Hover a dot',
  'tour.prefers': 'Prefers',

  'tour.s6.title': 'Tactical voting: Emma',
  'tour.s6.body':
    'Emma is a strict vegetarian, she would never vote for a meat party. She truly prefers Fruit Party, but knows it cannot win enough to matter, so she votes Vegetable Party to block a worse outcome. That is tactical voting.',
  'tour.s6.true': 'True preference',
  'tour.s6.tact': 'Tactical vote',

  'tour.s7.title': 'Same people, different rules',
  'tour.s7.body':
    'Explore further to see how different systems work, what problems they solve, and what problems they might yet present.',

  'case.title': 'Case study: same votes, different rules',
  'case.intro':
    'A frozen simulation: Apple (plant, 44%) vs four meat parties (~56%), Grape slightly ahead (15%), the others ~13–14%. The rules decide whether seats follow that preference, or the split camp spoils itself.',
  'case.diet.title': 'The preference: meat ↔ plant',
  'case.diet.blurb':
    'Bar chart: X = preference (middle = 0), Y = vote %. Parties on the same spot stack in different colors. On transfers, eliminated ballots move to a nearby taste.',
  'case.diet.xAxis': 'Preference (middle = 0)',
  'case.diet.yAxis': 'Vote %',
  'case.diet.plotAria': 'Bar chart of parties on the meat–plant axis (stacked when preference matches)',
  'case.diet.camps': 'Meat camp combined: {meat}% · Plant camp: {plant}%',
  'case.pref.title': 'Preference vs seats',
  'case.pref.note': 'Meat vs plant camps, vote share is fixed; seat share changes with the rules.',
  'case.pref.votes': 'Votes',
  'case.pref.seats': 'Seats',
  'case.results': 'Seats by party',
  'case.list.title': '1. Pure list proportionality',
  'case.list.body':
    'County colours differ, Budapest leans plant, the east leans meat. Nationally the ~56% meat / ~44% plant vote still shows up proportionally in seats. The list tracks the preference; geography shows on the map without warping parliament.',
  'case.bridge.title': 'Why look at local systems separately?',
  'case.bridge.body':
    'Mixed models also use a single-member district tier. Much of the distortion is born there, especially when a majority preference is split across several parties. The next scenes therefore examine only the local-representative contest (106 OEVK).',
  'case.fptp.title': '2. First past the post (FPTP)',
  'case.fptp.body':
    'Apple 44%; the meat side is split four ways (~13–15%). Smaller parties’ votes are “wasted,” so Apple wins many districts on a plurality, even where the place is meat-majority. The spoiler hides the preference.',
  'case.fptp.highlight':
    'Apple: {votes}% of votes → {seatPct}% of seats ({seats}/106). Much of the split meat vote is wasted.',
  'case.fptp.diet':
    'Meat preference {meatVotes}% → {meatSeatPct}% of seats ({meatSeats} vs {plantSeats} plant). IRV/runoff consolidates the camp.',
  'case.ranked.title': '3a. Ranked choice (IRV)',
  'case.ranked.body':
    'Eliminated meat parties transfer along the diet axis to a nearby party. That tactical consolidation flips districts Apple would have won only because the meat field was split. Watch the preference-vs-seats bars: vote share stays ~56% meat / ~44% plant, but seat share now tracks the majority preference. Upside: seats follow preference more strongly. Downside: still one winner per district, so some disproportionality remains.',
  'case.ranked.diet':
    'Same {meatVotes}% meat preference → {meatSeatPct}% of seats ({meatSeats} vs {plantSeats} plant). Transfers realign the result with the preference.',
  'case.twoRound.title': '3b. Two-round runoff',
  'case.twoRound.body':
    'Only the top two advance; others align with the closer finalist on the meat↔plant axis. Often similar to IRV: the split meat majority can coalesce. Seats-by-party and the map both show it — the meat side takes more districts than under FPTP. Upside: the runoff makes the preference visible. Downside: two election days, heavy tactical bargaining, and seats still are not perfectly proportional.',
  'case.twoRound.diet':
    'Meat camp: {meatVotes}% of votes → {meatSeatPct}% of seats ({meatSeats} vs {plantSeats}). Round two again sorts the race by preference.',
  'case.geo.title': 'Geography: meat ↔ plant baseline',
  'case.geo.body':
    'Counties colored by their meat↔plant baseline (not election winners). Budapest and the west lean plant; eastern counties lean meat. That backdrop drives district votes in the simulation.',
  'case.geo.mapAria': 'Counties colored by meat–plant preference',
  'case.cta.games': 'Games',
  'case.cta.systems': 'Deep explainers',
  'case.cta.simulate': 'Play with the simulation',
  'case.tour.modeGroup': 'Display mode',
  'case.tour.modeTour': 'Animated tour',
  'case.tour.modePage': 'Simple page',
  'case.tour.step': 'Step',
  'case.tour.of': 'of',
  'case.tour.prev': 'Previous',
  'case.tour.next': 'Next',
  'case.tour.done': 'Done',
  'case.tour.s1.meat':
    'There are 4 parties preferring meat, but neither is too big.',
  'case.tour.s1.plant':
    'Only one party prefers plant food, but it is large.',
  'case.tour.s1.ladder':
    'The combined camp vote share: about 56% meat, 44% plant.',
  'case.tour.s2.body':
    'As you can see, the seats roughly match the actual preferences of people with slight regional variations in voting patterns.',
  'case.tour.s3.body':
    'In a first-past-the-post system the largest party sweeps most of the votes. This can lead to large distortions.',
  'case.tour.s4.a':
    'Under ranked choice, eliminated meat parties transfer to a nearby taste. The split majority consolidates: the real meat-over-plant preference now shows up in seats as well.',
  'case.tour.s4.b':
    'Look at the preference vs seats bars: vote share is unchanged, but the seat bar now follows the majority. Because it is still winner-take-all locally, some disproportionality remains.',
  'case.tour.s5.a':
    'In a two-round system only the top two remain; everyone else aligns with the closer finalist. Seats by party again show the meat majority — much like IRV.',
  'case.tour.s5.b':
    'The map shows the shift too: many districts Apple would have taken under FPTP only because the meat field was split now follow the majority preference. Preference is more visible, but seats are still not perfectly proportional.',

  'footer.note': '2026. Made with ❤️ by Bendoair',
}
