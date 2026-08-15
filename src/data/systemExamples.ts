import type { SystemId } from '../engines/types'

export interface SystemExample {
  titleHu: string
  titleEn: string
  wikiHu?: string
  wikiEn: string
}

export interface SystemContent {
  id: SystemId
  examples: SystemExample[]
}

/**
 * Notable real-world examples with Wikipedia links (shown on system detail pages).
 */
export const SYSTEM_EXAMPLES: Record<SystemId, SystemExample[]> = {
  local: [
    {
      titleHu: 'Egyéni választókerület / First-past-the-post',
      titleEn: 'First-past-the-post',
      wikiHu: 'https://hu.wikipedia.org/wiki/Egy%C3%A9ni_v%C3%A1laszt%C3%B3ker%C3%BClet',
      wikiEn: 'https://en.wikipedia.org/wiki/First-past-the-post_voting',
    },
    {
      titleHu: 'Egyesült Királyság alsóházi választások',
      titleEn: 'United Kingdom House of Commons elections',
      wikiHu: 'https://hu.wikipedia.org/wiki/Egyes%C3%BClt_Kir%C3%A1lys%C3%A1g',
      wikiEn: 'https://en.wikipedia.org/wiki/Elections_in_the_United_Kingdom',
    },
    {
      titleHu: 'Egyesült Államok képviselőházi választások',
      titleEn: 'United States House elections',
      wikiEn: 'https://en.wikipedia.org/wiki/United_States_House_of_Representatives_elections',
    },
  ],
  'closed-list': [
    {
      titleHu: 'Arányos képviselet',
      titleEn: 'Proportional representation',
      wikiHu: 'https://hu.wikipedia.org/wiki/Ar%C3%A1nyos_v%C3%A1laszt%C3%A1si_rendszer',
      wikiEn: 'https://en.wikipedia.org/wiki/Proportional_representation',
    },
    {
      titleHu: 'Zárt lista',
      titleEn: 'Closed list',
      wikiEn: 'https://en.wikipedia.org/wiki/Closed_list',
    },
    {
      titleHu: 'Spanyolország (zárt listás PR)',
      titleEn: 'Spain (closed-list PR)',
      wikiHu: 'https://hu.wikipedia.org/wiki/Spanyolorsz%C3%A1g',
      wikiEn: 'https://en.wikipedia.org/wiki/Elections_in_Spain',
    },
    {
      titleHu: 'D’Hondt-módszer',
      titleEn: 'D’Hondt method',
      wikiHu: 'https://hu.wikipedia.org/wiki/D%E2%80%99Hondt-m%C3%B3dszer',
      wikiEn: 'https://en.wikipedia.org/wiki/D%27Hondt_method',
    },
  ],
  mixed: [
    {
      titleHu: 'Magyarország országgyűlési választási rendszere',
      titleEn: 'Elections in Hungary',
      wikiHu: 'https://hu.wikipedia.org/wiki/Magyarorsz%C3%A1g_orsz%C3%A1ggy%C5%B1l%C3%A9si_v%C3%A1laszt%C3%A1si_rendszere',
      wikiEn: 'https://en.wikipedia.org/wiki/Elections_in_Hungary',
    },
    {
      titleHu: 'Vegyes választási rendszer',
      titleEn: 'Mixed-member system',
      wikiEn: 'https://en.wikipedia.org/wiki/Mixed-member_proportional_representation',
    },
    {
      titleHu: 'Németország (MMP)',
      titleEn: 'Germany (MMP)',
      wikiHu: 'https://hu.wikipedia.org/wiki/N%C3%A9metorsz%C3%A1g',
      wikiEn: 'https://en.wikipedia.org/wiki/Electoral_system_of_Germany',
    },
    {
      titleHu: 'Új-Zéland (MMP)',
      titleEn: 'New Zealand (MMP)',
      wikiEn: 'https://en.wikipedia.org/wiki/Electoral_system_of_New_Zealand',
    },
  ],
  'open-list': [
    {
      titleHu: 'Nyílt lista',
      titleEn: 'Open list',
      wikiEn: 'https://en.wikipedia.org/wiki/Open_list',
    },
    {
      titleHu: 'Finnország',
      titleEn: 'Finland',
      wikiHu: 'https://hu.wikipedia.org/wiki/Finnorsz%C3%A1g',
      wikiEn: 'https://en.wikipedia.org/wiki/Elections_in_Finland',
    },
    {
      titleHu: 'Hollandia',
      titleEn: 'Netherlands',
      wikiHu: 'https://hu.wikipedia.org/wiki/Hollandia',
      wikiEn: 'https://en.wikipedia.org/wiki/Elections_in_the_Netherlands',
    },
    {
      titleHu: 'Brazília (nyílt listás PR)',
      titleEn: 'Brazil (open-list PR)',
      wikiEn: 'https://en.wikipedia.org/wiki/Elections_in_Brazil',
    },
  ],
  ranked: [
    {
      titleHu: 'Azonnali második forduló (IRV)',
      titleEn: 'Instant-runoff voting',
      wikiEn: 'https://en.wikipedia.org/wiki/Instant-runoff_voting',
    },
    {
      titleHu: 'Rangsoros választás',
      titleEn: 'Ranked-choice voting',
      wikiEn: 'https://en.wikipedia.org/wiki/Ranked_voting',
    },
    {
      titleHu: 'Ausztrália képviselőháza',
      titleEn: 'Australian House of Representatives',
      wikiHu: 'https://hu.wikipedia.org/wiki/Ausztr%C3%A1lia',
      wikiEn: 'https://en.wikipedia.org/wiki/Electoral_system_of_Australia',
    },
    {
      titleHu: 'Írország (STV, rokon rendszer)',
      titleEn: 'Ireland (STV, related system)',
      wikiHu: 'https://hu.wikipedia.org/wiki/%C3%8Drorsz%C3%A1g',
      wikiEn: 'https://en.wikipedia.org/wiki/Single_transferable_vote',
    },
  ],
  'two-round': [
    {
      titleHu: 'Kétfordulós szavazás',
      titleEn: 'Two-round system',
      wikiHu: 'https://hu.wikipedia.org/wiki/K%C3%A9tfordul%C3%B3s_szavaz%C3%A1s',
      wikiEn: 'https://en.wikipedia.org/wiki/Two-round_system',
    },
    {
      titleHu: 'Francia elnökválasztás',
      titleEn: 'French presidential election',
      wikiHu: 'https://hu.wikipedia.org/wiki/Franciaorsz%C3%A1g',
      wikiEn: 'https://en.wikipedia.org/wiki/Elections_in_France',
    },
    {
      titleHu: 'Magyarország (1990–2010, kétfordulós egyéni)',
      titleEn: 'Hungary 1990–2010 (two-round single-member)',
      wikiHu: 'https://hu.wikipedia.org/wiki/Magyarorsz%C3%A1g_orsz%C3%A1ggy%C5%B1l%C3%A9si_v%C3%A1laszt%C3%A1si_rendszere',
      wikiEn: 'https://en.wikipedia.org/wiki/Elections_in_Hungary',
    },
  ],
}
