import { Stage } from '../types/game';

export const STAGES: Record<string, Stage> = {
  celestial_altar: {
    id: 'celestial_altar',
    name: 'Santuario Celeste Immensurabile',
    subtitle: 'Rovine cosmiche titaniche protette da barriere gravitazionali',
    width: 1900,
    height: 1000,
    blastZone: {
      minX: -280,
      maxX: 2180,
      minY: -350,
      maxY: 1600, // No bottom blast zone! Solid floor catches everything
    },
    platforms: [
      // MASSIVE FULL-WIDTH SOLID BASE FLOOR (cannot fall down!)
      {
        id: 'celestial_impenetrable_floor',
        x: -200,
        y: 840,
        width: 2300,
        height: 120,
        isSoft: false,
        color: '#0f172a',
      },
      // Lower Central Island
      {
        id: 'main_ground',
        x: 550,
        y: 650,
        width: 800,
        height: 50,
        isSoft: false,
        color: '#1e293b',
      },
      // Left Floating Fortress
      {
        id: 'left_solid_fortress',
        x: 180,
        y: 520,
        width: 320,
        height: 38,
        isSoft: false,
        color: '#1e293b',
      },
      // Right Floating Fortress
      {
        id: 'right_solid_fortress',
        x: 1400,
        y: 520,
        width: 320,
        height: 38,
        isSoft: false,
        color: '#1e293b',
      },
      // Mid-Air Left Soft Platform
      {
        id: 'left_mid_soft',
        x: 360,
        y: 380,
        width: 220,
        height: 16,
        isSoft: true,
        color: '#38bdf8',
      },
      // Mid-Air Right Soft Platform
      {
        id: 'right_mid_soft',
        x: 1320,
        y: 380,
        width: 220,
        height: 16,
        isSoft: true,
        color: '#38bdf8',
      },
      // Central High Apex Soft Platform
      {
        id: 'center_high_soft',
        x: 750,
        y: 450,
        width: 400,
        height: 16,
        isSoft: true,
        color: '#a855f7',
      },
      // Extreme Upper Sky Spire
      {
        id: 'sky_spire_soft',
        x: 850,
        y: 280,
        width: 200,
        height: 16,
        isSoft: true,
        color: '#facc15',
      },
    ],
    spawnPoints: [
      { x: 700, y: 580 },
      { x: 1200, y: 580 },
      { x: 340, y: 460 },
      { x: 1560, y: 460 },
    ],
    bgTheme: 'celestial',
  },

  cyber_colosseum: {
    id: 'cyber_colosseum',
    name: 'Mega Colosseo Cybernetico 2099',
    subtitle: 'Enorme metropoli olografica su più livelli con pavimentazione anti-caduta',
    width: 2000,
    height: 1050,
    blastZone: {
      minX: -300,
      maxX: 2300,
      minY: -350,
      maxY: 1600, // No bottom blast zone! Solid floor catches everything
    },
    platforms: [
      // FULL-WIDTH SOLID GROUND BARRIER
      {
        id: 'cyber_base_barrier',
        x: -250,
        y: 860,
        width: 2500,
        height: 120,
        isSoft: false,
        color: '#090d16',
      },
      // Main Center Battle Platform
      {
        id: 'main_ground',
        x: 500,
        y: 670,
        width: 1000,
        height: 55,
        isSoft: false,
        color: '#0f172a',
      },
      // Left Wing Platform
      {
        id: 'cyber_left_wing',
        x: 120,
        y: 530,
        width: 320,
        height: 40,
        isSoft: false,
        color: '#131e33',
      },
      // Right Wing Platform
      {
        id: 'cyber_right_wing',
        x: 1560,
        y: 530,
        width: 320,
        height: 40,
        isSoft: false,
        color: '#131e33',
      },
      // Soft Energy Ramps
      {
        id: 'cyber_soft_low_left',
        x: 350,
        y: 410,
        width: 240,
        height: 15,
        isSoft: true,
        color: '#06b6d4',
      },
      {
        id: 'cyber_soft_low_right',
        x: 1410,
        y: 410,
        width: 240,
        height: 15,
        isSoft: true,
        color: '#06b6d4',
      },
      {
        id: 'cyber_center_mid_soft',
        x: 720,
        y: 480,
        width: 560,
        height: 15,
        isSoft: true,
        color: '#ec4899',
      },
      {
        id: 'cyber_high_sky_left',
        x: 600,
        y: 310,
        width: 220,
        height: 15,
        isSoft: true,
        color: '#a855f7',
      },
      {
        id: 'cyber_high_sky_right',
        x: 1180,
        y: 310,
        width: 220,
        height: 15,
        isSoft: true,
        color: '#a855f7',
      },
    ],
    spawnPoints: [
      { x: 750, y: 600 },
      { x: 1250, y: 600 },
      { x: 280, y: 470 },
      { x: 1720, y: 470 },
    ],
    bgTheme: 'cyber',
  },
};

export const STAGE_LIST = Object.values(STAGES);
