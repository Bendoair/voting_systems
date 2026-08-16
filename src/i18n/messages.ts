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
  'nav.theme': 'Színséma',
  'nav.themeDark': 'Sötét',
  'nav.themeLight': 'Világos',
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

  'systems.title': 'Választási rendszerek',
  'systems.intro':
    'Minden rendszer más prioritást szolgál: helyi elszámoltathatóság, arányosság, egyszerűség vagy a taktikai szavazás csökkentése. Nyiss meg egyet a részletekért és valós példákért.',
  'systems.section.local': 'Helyi képviselők',
  'systems.section.localIntro':
    'Egyéni körzetek: egy nyertes helyi szinten. Erős helyi kapcsolat, de a nemzeti arányosság gyakran megsínyli.',
  'systems.section.list': 'Listás rendszerek',
  'systems.section.listIntro':
    'A mandátumok pártlistákról jutnak el, zárt vagy nyílt sorrenddel. Közelebb állnak a nemzeti szavazatarányhoz.',
  'systems.section.mixed': 'Vegyes rendszerek',
  'systems.section.mixedIntro':
    'Helyi és listás ág együtt. A részletek döntik el, mennyire arányos a végeredmény, Magyarország is ide tartozik.',
  'systems.gerry.cta': 'Gerrymander játék',
  'systems.gerry.title': 'Gerrymander játék',
  'systems.syspick.cta': 'Rendszertipp játék',
  'systems.syspick.link': 'Próbáld ki: melyik rendszer adná a legtöbb mandátumot a te pártodnak?',

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
  'ex.syspick.chipDesc.local': 'Relatív többség nyer körzetenként',
  'ex.syspick.chipDesc.closed-list': 'Arányos listás (nyílt / zárt)',
  'ex.syspick.chipDesc.mixed': 'Egyéni + lista együtt',
  'ex.syspick.chipDesc.open-list': 'Listán belül jelöltet is erősíthetsz',
  'ex.syspick.chipDesc.ranked': 'Rangsorolás; átvitelek a körzetben',
  'ex.syspick.chipDesc.two-round': 'Döntő a két élmezőny között',

  'systems.simulate': 'Szimuláció ezzel',
  'systems.pros': 'Előnyök',
  'systems.cons': 'Hátrányok',
  'systems.when': 'Mikor segít / árt',
  'systems.examples': 'Jelentős példák (Wikipedia)',
  'systems.back': 'Összes rendszer',

  'sys.local.name': 'Helyi képviselők (egyéni, FPTP)',
  'sys.local.summary':
    'Minden választókerületben a legtöbb szavazatot kapó jelölt nyeri el az egyetlen mandátumot, abszolút többség nélkül is.',
  'sys.local.rationale':
    'A klasszikus „egy körzet, egy képviselő” modell. A választó konkrét személyre szavaz, aki a térséget képviseli a parlamentben. A szabály egyszerű: aki a legtöbb szavazatot kapja, az nyer, még akkor is, ha a szavazatok többsége más jelöltekre ment.\n\nEz erős helyi elszámoltathatóságot és világos felelősséget ad, de országos szinten gyakran torzítja a pártok arányát. A kisebb pártok, amelyek támogatottsága szétszórt, kevés vagy semmilyen mandátumot sem szerezhetnek.',
  'sys.local.pros':
    'Erős helyi kötődés: van „a te képviselőd”, akit számonkérhetsz.\n\nEgyszerű szavazólap és gyors, átlátható eredmény.\n\nStabil kormánytöbbséget könnyebben eredményezhet, mint a tiszta arányos rendszerek.',
  'sys.local.cons':
    'A vesztes jelöltekre leadott szavazatok nem eredményeznek mandátumot („elveszett” szavazatok).\n\nA nemzeti szavazatarány és a mandátumarány jelentősen eltérhet, akár „fordított győzelem” is előfordulhat, ahol a több szavazatot kapó párt kevesebb helyet szerez.\n\nErősen ösztönzi a taktikai szavazást: sokan a „esélyesebb” jelöltre szavaznak, nem a legszimpatikusabbra.\n\nA körzethatárok húzása (gerrymandering) önmagában is politikai fegyver lehet.',
  'sys.local.when':
    'Akkor vonzó, ha a helyi felelősség és a személyes képviselet a legfontosabb prioritás.\n\nGyengén szolgálja azt a célt, hogy a parlament tükrözze az országos pártpreferenciákat, ezért a magyar reformvitában gyakran kritikák tárgya, ha az egyéni ág túl erős.',

  'sys.closed-list.name': 'Pártlisták (zárt lista)',
  'sys.closed-list.summary':
    'A választó pártra szavaz; a mandátumokat arányosan osztják szét. A listán belüli sorrendet a párt határozza meg.',
  'sys.closed-list.rationale':
    'Zárt listás arányos rendszerben a szavazatok elsősorban pártokra mennek. A párt előre rögzített listájáról annyi jelölt jut be, ahány mandátumot a párt megszerzett (pl. D’Hondt-módszerrel).\n\nA parlament összetétele általában közel áll a nemzeti (vagy regionális) szavazatarányokhoz. A taktikai „kisebbik rossz” nyomás csökken, mert a kisebb pártokra leadott szavazatok is mandátumot eredményezhetnek, küszöbök függvényében.\n\nA kompromisszum: a választó nem dönt közvetlenül arról, hogy a párt melyik konkrét embere kerüljön be.',
  'sys.closed-list.pros':
    'Jobban tükrözi a szavazatarányt; kevesebb „elveszett” szavazat.\n\nKisebb pártok és új szereplők is szóhoz juthatnak, ha átlépik a küszöböt.\n\nKevesebb kényszer a taktikai átállásra nagy egypárti blokkok felé.',
  'sys.closed-list.cons':
    'Gyengébb a közvetlen helyi képviselő-választó kapcsolat.\n\nA pártvezetés „kapuőr”: a lista elején lévők szinte biztosan bejutnak, a választó beleszólása korlátozott.\n\nA képviselők a párt felé elszámoltathatóbbak lehetnek, mint a választókerület felé.\n\nMagas bejutási küszöb mellett az arányosság romlik, és újra megjelenik a taktikai szavazás.',
  'sys.closed-list.when':
    'Erős választás, ha a cél a szavazatok és a mandátumok közötti igazságosság.\n\nKevesebb támogatást kap ott, ahol az emberek ragaszkodnak a név szerint megválasztott helyi képviselőhöz. A magyar vitában gyakran ez a referencia a „tisztább arányosság” irányába.',

  'sys.mixed.name': 'Vegyes rendszer (magyarhoz hasonló)',
  'sys.mixed.summary':
    'Egyéni körzeti győztesek + országos (vagy területi) lista. A mai magyar modell rokona, a szimuláció egyszerűsített kompenzációs logikát használ.',
  'sys.mixed.rationale':
    'A vegyes rendszerek helyi képviselőt és listás mandátumot is adnak. Magyarország 2011 óta egyéni többségi ágat és országos listát kombinál; a részletszabályok (győzteskompenzáció, töredékszavazatok) döntően befolyásolják, mennyire arányos a végeredmény.\n\nA német típusú MMP célja tipikusan az, hogy a lista „kijavítsa” az egyéni ág torzítását. A magyar gyakorlatban az egyéni ág súlya és a kompenzáció módja miatt a rendszer gyakran a helyi győzteseket erősíti.\n\nA reformviták központi kérdése: mennyit számítson a helyi győzelem, és mennyire kövesse a parlament a nemzeti szavazatarányt.',
  'sys.mixed.pros':
    'Van helyi arc és országos pártképviselet is.\n\nIsmerős a magyar választóknak; kompromisszumként eladható.\n\nElméletben ötvözheti a személyes elszámoltathatóságot és az arányosságot (ha a listás ág elég erős és valóban kompenzáló).',
  'sys.mixed.cons':
    'Bonyolult szabályok: a választók nehezen látják át, hogyan lesz a szavazatból mandátum.\n\nHa az egyéni ág dominál vagy a kompenzáció a győzteseket jutalmazza, az arányosság sérül.\n\nKét szavazat / két logika: taktikai viselkedés mindkét ágon megjelenhet.\n\nA nemzetközi „vegyes” címke elfedi a nagy különbségeket (pl. német MMP vs. magyar rendszer).',
  'sys.mixed.when':
    'Jó kiindulópont a status quo megértéséhez.\n\nHa a cél az arányosabb parlament, a vita jellemzően a listás ág erősítése, a győzteskompenzáció újragondolása vagy tisztább arányos modell felé mozdul.',

  'sys.open-list.name': 'Nyílt lista (preferenciális lista)',
  'sys.open-list.summary':
    'Arányos pártmandátumok, de a választó a listán belüli sorrendet is befolyásolhatja preferenciális szavazattal.',
  'sys.open-list.rationale':
    'A nyílt lista megtartja az arányos pártképviseletet, miközben a választóknak beleszólást ad abba, hogy a párt melyik jelöltjei jutnak be. Tipikusan pártra és/vagy jelöltre is lehet szavazni; a preferenciák átrendezhetik a lista sorrendjét.\n\nEz részben választ ad a zárt lista „pártkapuőr” kritikájára, anélkül hogy visszatérne a tiszta egyéni többségi rendszerhez. Finnország, Hollandia vagy Brazília különböző erősségű nyílt listás változatokat használ.\n\nA reform-kontextusban gyakran erős jelölt: arányosság + személyes választás.',
  'sys.open-list.pros':
    'Arányos mandátumelosztás pártok között.\n\nA választó befolyásolhatja, ki kerül be a pártból, nagyobb személyes legitimáció.\n\nCsökkenti a teljesen zárt lista elitizmus-érzetét, miközben megtartja a listás arányosság előnyeit.',
  'sys.open-list.cons':
    'Bonyolultabb szavazólap és számolás.\n\nListán belüli verseny: a kampány pártársak ellen is folyhat, ami feszültséget szül.\n\nInformációs költség: a választónak több nevet kell ismernie.\n\nHa a preferenciahatás gyenge, gyakorlatilag majdnem zárt listaként működik.',
  'sys.open-list.when':
    'Különösen vonzó, ha arányosságot akarsz, de nem fogadod el, hogy csak a pártvezetés döntsön a személyekről.\n\nA magyar vitában gyakran „középút” a tiszta egyéni rendszer és a teljesen zárt lista között.',

  'sys.ranked.name': 'Rangsoros szavazás (IRV)',
  'sys.ranked.summary':
    'A választó rangsorolja a jelölteket. A leggyengébb kiesik, szavazatai átkerülnek a következő preferenciára, amíg valaki többséget nem szerez.',
  'sys.ranked.rationale':
    'Az azonnali második forduló (instant-runoff, IRV) célja, hogy a győztes szélesebb támogatást mutasson, és csökkenjen a „kisebbik rossz” kényszere: ha a kedvenced kiesik, a második (harmadik…) helyen megjelölt jelölt még számíthat.\n\nAusztrália képviselőháza ezt a logikát használja egyéni körzetekben. Fontos: önmagában az IRV nem arányos parlamentet ad, továbbra is körzetenként egy győztes van. Az arányossághoz többmandátumos STV vagy listás elem kell.\n\nA magyar kontextusban inkább az egyéni ág reformjaként merül fel, nem a teljes arányos váltás helyettesítőjeként.',
  'sys.ranked.pros':
    'Csökkenti a spoiler-hatást és a taktikai „csak a két esélyesre” nyomást.\n\nA győztesnek tipikusan többségi (vagy legalábbis szélesebb) támogatása van a preferenciák után.\n\nLehetővé teszi, hogy a választó őszintébben rangsorolja a kisebb jelölteket is.',
  'sys.ranked.cons':
    'Országos arányosságot nem biztosít egymandátumos körzetekben.\n\nBonyolultabb a számolás és a magyarázat, mint az FPTP.\n\nRitka, de létező stratégiai paradoxonok (pl. non-monotonicity) elméletben előfordulhatnak.\n\nA „többségi” érzés körzetenként érvényesül, nem feltétlenül a parlament egészére.',
  'sys.ranked.when':
    'Hasznos egyéni versenyekben, ha a cél a taktikai nyomás csökkentése.\n\nNem helyettesíti a listás arányosságot, ha a vita tárgya a nemzeti mandátumarány.',

  'sys.two-round.name': 'Többfordulós (kétfordulós) szavazás',
  'sys.two-round.summary':
    'Ha senki sem szerez abszolút többséget az első fordulóban, a két élen álló (vagy a szabály szerinti továbbjutók) között második forduló dönt.',
  'sys.two-round.rationale':
    'A kétfordulós rendszer a francia elnökválasztásról ismert, de sok országban egyéni képviselőválasztásokon is használják. Magyarország 1990–2010 között az egyéni ágon kétfordulós logikát alkalmazott.\n\nAz első fordulóban a kisebb jelöltek „üzenhetnek” és mérhetik az erejüket; a másodikban a táborok összeállhatnak. A győztes végül abszolút többséget szerez a döntőben, ez erős legitimációs érv.\n\nOrszágos arányosságot azonban ez sem garantál: továbbra is helyi győztesekből áll össze a kép.',
  'sys.two-round.pros':
    'A végső győztesnek többségi támogatása van a döntő fordulóban.\n\nAz első forduló lehetővé teszi a kisebb erők megjelenését anélkül, hogy azonnal „elveszne” a szavazat.\n\nIsmerős európai minta; historikusan része volt a magyar gyakorlatnak is.',
  'sys.two-round.cons':
    'Költségesebb és hosszabb (két választási nap).\n\nA második fordulóban erős taktikai átállás és alkuk jelennek meg.\n\nOrszágosan továbbra is torzíthat, ha a mandátumok egymandátumos körzetekből jönnek.\n\nAz alacsonyabb részvétel a második fordulóban megváltoztathatja az eredményt.',
  'sys.two-round.when':
    'Jól működhet egyéni tisztségekhez (elnök, polgármester, egyéni képviselő), ha a többségi legitimáció a cél.\n\nOrszágos arányossághoz listás vagy arányos elem kell mellé.',

  'sim.title': 'Magyarország-szimuláció',
  'sim.intro':
    'Állítsd be a pártok országos szavazatarányát és hús↔növény pozícióját. A megyék is állíthatók a tengelyen; a körzetek enyhe zajjal eltérnek. A helyek a tengelyen legközelebbi pártot (vagy a legközelebbi alternatívát) részesítik előnyben. Nagyjából az országos átlaghoz igazodva szavaznak.',
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
  'sim.addParty': 'Párt hozzáadása',
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
  'sim.geographyClosed': 'Földrajzi különbségek beállítása',
  'sim.geographyNote':
    'Megyénkénti alapérték. A körzetek és megyék enyhe, rögzített zajjal térnek el, a szavazat a tengelyen legközelebbi párt felé tolódik.',
  'sim.polarization': 'Földrajzi erősség',
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
    'A kieső húsos pártok szavazatai a tengelyen közeli párthoz mennek. Ez a taktikai összeállás: ahol az Alma csak a megosztott húsos mező miatt nyert volna, ott a húsos tábor átveszi. Előny: a mandátumok erősebben követik a preferenciát. Hátrány: továbbra is egyéni győzteses.',
  'case.ranked.diet':
    'Ugyanaz a {meatVotes}% húsos preferencia → {meatSeatPct}% mandátum ({meatSeats} vs {plantSeats} növényes). Az átvitelek a preferenciához igazítják az eredményt.',
  'case.twoRound.title': '3b. Kétfordulós választás',
  'case.twoRound.body':
    'Csak a két éllovas megy tovább; a többiek a közelebbi döntőshöz igazodnak a hús↔növény tengelyen. Gyakran hasonló, mint az IRV: a megosztott húsos többség összeállhat. Előny: a második fordulóban a preferencia „láthatóvá” válik. Hátrány: két választási nap, erős taktikai alkuk.',
  'case.twoRound.diet':
    'Húsos tábor: {meatVotes}% szavazat → {meatSeatPct}% mandátum ({meatSeats} vs {plantSeats}). A második forduló újra a preferencia szerint rendezi a versenyt.',
  'case.geo.title': 'Földrajz: hús ↔ növény alap',
  'case.geo.body':
    'A megyék saját hús↔növény alapja (nem a választási győztes). Budapest és a nyugat növényesebb; a keleti megyék húsosabbak. Ez a háttér hajtja a körzeti szavazatokat a szimulációban.',
  'case.geo.mapAria': 'Megyék színezése a hús–növény preferencia szerint',
  'case.cta.simulate': 'Játszd újra a szimulációban',
  'case.cta.systems': 'Részletes magyarázók',

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
  'nav.theme': 'Theme',
  'nav.themeDark': 'Dark',
  'nav.themeLight': 'Light',
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
  'ex.gerry.rulesP8a': 'Do not fret about small edges or boundaries.',
  'ex.gerry.rulesP8b': 'will fix the borders.',
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
  'ex.syspick.chipDesc.local': 'Plurality wins each district',
  'ex.syspick.chipDesc.closed-list': 'Proportional list (open / closed)',
  'ex.syspick.chipDesc.mixed': 'Local seats plus a list',
  'ex.syspick.chipDesc.open-list': 'Boost candidates on the list',
  'ex.syspick.chipDesc.ranked': 'Rank choices; transfers locally',
  'ex.syspick.chipDesc.two-round': 'Runoff between the top two',

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

  'sim.title': 'Hungary simulation',
  'sim.intro':
    'Set each party’s national vote share and meat↔plant position. Counties have editable baselines; districts add light noise. Places prefer the closest party on the axis, or the closest alternative. They vote roughly in line with the national average.',
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
  'sim.geographyClosed': 'Set geographic differences',
  'sim.geographyNote':
    'Per-county baseline. Counties and districts get light seeded noise, votes shift toward the nearest party on the axis.',
  'sim.polarization': 'Geographic strength',
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
    'Eliminated meat parties transfer along the diet axis to a nearby party. That tactical consolidation flips districts Apple would have won only because the meat field was split. Upside: seats track the preference more strongly. Downside: still one winner per district.',
  'case.ranked.diet':
    'Same {meatVotes}% meat preference → {meatSeatPct}% of seats ({meatSeats} vs {plantSeats} plant). Transfers realign the result with the preference.',
  'case.twoRound.title': '3b. Two-round runoff',
  'case.twoRound.body':
    'Only the top two advance; others align with the closer finalist on the meat↔plant axis. Often similar to IRV: the split meat majority can coalesce. Upside: the runoff makes the preference visible. Downside: two election days and heavy tactical bargaining.',
  'case.twoRound.diet':
    'Meat camp: {meatVotes}% of votes → {meatSeatPct}% of seats ({meatSeats} vs {plantSeats}). Round two again sorts the race by preference.',
  'case.geo.title': 'Geography: meat ↔ plant baseline',
  'case.geo.body':
    'Counties colored by their meat↔plant baseline (not election winners). Budapest and the west lean plant; eastern counties lean meat. That backdrop drives district votes in the simulation.',
  'case.geo.mapAria': 'Counties colored by meat–plant preference',
  'case.cta.simulate': 'Replay in the simulation',
  'case.cta.systems': 'Deep explainers',

  'footer.note': '2026. Made with ❤️ by Bendoair',
}
