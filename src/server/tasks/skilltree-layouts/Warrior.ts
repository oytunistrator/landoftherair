
const WARRIOR_TREE = {
  Warrior: {
    icon: 'abstract-053',
    desc: 'The Warrior class excels in physical combat.',
    unbuyable: true,
    root: true,
    unlocks: ['PartyDefense0', 'CarefulTouch0', 'DeathGrip0', 'NaturalArmor0', 'EagleEye0', 'SwordTricks0', 'FunkyMoves0', 'Swashbuckler0']
  },

  // ANCIENT
  AncientGrip0: {
    unlocks: ['AncientGrip1']
  },
  AncientGrip1: {
    unlocks: ['AncientGrip2']
  },
  AncientGrip2: {

  },

  AncientArmor3: {
    unlocks: ['AncientArmor4']
  },
  AncientArmor4: {
    unlocks: ['AncientArmor5']
  },
  AncientArmor5: {

  },

  // TRAITS
  PartyDefense0: {
    unlocks: ['PartyDefense1']
  },
  PartyDefense1: {
    unlocks: ['PartyDefense2']
  },
  PartyDefense2: {

  },

  CarefulTouch0: {
    unlocks: ['CarefulTouch1']
  },
  CarefulTouch1: {
    unlocks: ['CarefulTouch2']
  },
  CarefulTouch2: {

  },

  DeathGrip0: {
    unlocks: ['DeathGrip1']
  },
  DeathGrip1: {
    unlocks: ['DeathGrip2']
  },
  DeathGrip2: {
    unlocks: ['AncientGrip0']
  },

  NaturalArmor0: {
    unlocks: ['NaturalArmor1']
  },
  NaturalArmor1: {
    unlocks: ['NaturalArmor2']
  },
  NaturalArmor2: {
    unlocks: ['AncientArmor3']
  },

  EagleEye0: {
    unlocks: ['EagleEye1']
  },
  EagleEye1: {
    unlocks: ['EagleEye2']
  },
  EagleEye2: {
    unlocks: ['EagleEye3']
  },
  EagleEye3: {
    unlocks: ['EagleEye4']
  },
  EagleEye4: {

  },

  SwordTricks0: {
    unlocks: ['SwordTricks1']
  },
  SwordTricks1: {
    unlocks: ['SwordTricks2']
  },
  SwordTricks2: {
    unlocks: ['SwordTricks3']
  },
  SwordTricks3: {
    unlocks: ['SwordTricks4']
  },
  SwordTricks4: {

  },

  FunkyMoves0: {
    unlocks: ['FunkyMoves1']
  },
  FunkyMoves1: {
    unlocks: ['FunkyMoves2']
  },
  FunkyMoves2: {
    unlocks: ['FunkyMoves3']
  },
  FunkyMoves3: {
    unlocks: ['FunkyMoves4']
  },
  FunkyMoves4: {

  },

  Swashbuckler0: {
    unlocks: ['Swashbuckler1']
  },
  Swashbuckler1: {
    unlocks: ['Swashbuckler2']
  },
  Swashbuckler2: {
    unlocks: ['Swashbuckler3']
  },
  Swashbuckler3: {
    unlocks: ['Swashbuckler4']
  },
  Swashbuckler4: {

  }

};

const DUELIST_TREE = {
  Duelist: {
    icon: 'abstract-027',
    desc: 'The Duelist class excels at stylized combat - dual-wielding weapons and counter-attacking with flair and finesse.',
    unbuyable: true,
    root: true,
    unlocks: ['ForcefulStrike5', 'OffhandFinesse0', 'Riposte0', 'Boost']
  },

  // TRAITS

  ForcefulStrike5: {
    unlocks: ['ForcefulStrike6']
  },
  ForcefulStrike6: {
    unlocks: ['ForcefulStrike7', 'RageStance']
  },
  ForcefulStrike7: {
    unlocks: ['ForcefulStrike8']
  },
  ForcefulStrike8: {
    unlocks: ['ForcefulStrike9']
  },
  ForcefulStrike9: {

  },

  OffhandFinesse0: {
    unlocks: ['OffhandFinesse1']
  },
  OffhandFinesse1: {
    unlocks: ['OffhandFinesse2']
  },
  OffhandFinesse2: {
    unlocks: ['OffhandFinesse3']
  },
  OffhandFinesse3: {
    unlocks: ['OffhandFinesse4']
  },
  OffhandFinesse4: {

  },

  Riposte0: {
    unlocks: ['Riposte1']
  },
  Riposte1: {
    unlocks: ['Riposte2', 'ParryStance']
  },
  Riposte2: {
    unlocks: ['Riposte3']
  },
  Riposte3: {
    unlocks: ['Riposte4']
  },
  Riposte4: {

  },

  BoostedBoost0: {
    unlocks: ['BoostedBoost1']
  },
  BoostedBoost1: {
    unlocks: ['ImprovedBoostedBoost0']
  },

  ImprovedBoostedBoost0: {
    unlocks: ['ImprovedBoostedBoost1']
  },
  ImprovedBoostedBoost1: {

  },

  // SKILLS

  RageStance: {

  },

  ParryStance: {

  },

  Boost: {
    unlocks: ['BoostedBoost0']
  }
};

const MONK_TREE = {
  Monk: {
    icon: 'abstract-033',
    desc: 'The Monk class expands on Warrior by transforming it into an entirely hand-to-hand combat-based class.',
    unbuyable: true,
    root: true,
    unlocks: ['BrassKnuckles0', 'MartialAgility0', 'StunningFist0', 'MartialAcuity0']
  },

  // TRAITS
  BrassKnuckles0: {
    unlocks: ['BrassKnuckles1', 'Punchkick0']
  },
  BrassKnuckles1: {
    unlocks: ['BrassKnuckles2']
  },
  BrassKnuckles2: {
    unlocks: ['MirroredEnchantments0']
  },

  Punchkick0: {
    unlocks: ['Punchkick1']
  },
  Punchkick1: {

  },

  MartialAgility0: {
    unlocks: ['MartialAgility1']
  },
  MartialAgility1: {
    unlocks: ['MartialAgility2']
  },
  MartialAgility2: {
    unlocks: ['Shield', 'UnarmoredSavant0']
  },

  MartialAcuity0: {
    unlocks: ['MartialAcuity1']
  },
  MartialAcuity1: {
    unlocks: ['MartialAcuity2']
  },
  MartialAcuity2: {
    unlocks: ['Sweep', 'Rapidpunch']
  },

  StunningFist0: {
    unlocks: ['StunningFist1']
  },
  StunningFist1: {
    unlocks: ['StunningFist2']
  },
  StunningFist2: {

  },

  UnarmoredSavant0: {

  },

  MirroredEnchantments0: {

  },

  ImprovedSweep0: {

  },

  ImprovedRapidpunch0: {

  },

  Supersweep0: {

  },

  // SKILLS
  Shield: {

  },

  Sweep: {
    unlocks: ['ImprovedSweep0', 'Supersweep0']
  },

  Rapidpunch: {
    unlocks: ['ImprovedRapidpunch0']
  }
};

const PALADIN_TREE = {
  Paladin: {
    icon: 'abstract-007',
    desc: 'The Paladin excels at using big weapons, and learns some new tricks to get the most use out of them.',
    unbuyable: true,
    root: true,
    unlocks: ['Provoke', 'SterlingArmor0', 'HolyProtection0', 'SilverSkin0', 'ForcefulStrike0']
  },

  // TRAITS
  Shieldbearer0: {

  },

  PhysicalShielding0: {
    unlocks: ['PhysicalShielding1']
  },
  PhysicalShielding1: {
    unlocks: ['PhysicalShielding2']
  },
  PhysicalShielding2: {
    unlocks: ['PhysicalShielding3']
  },
  PhysicalShielding3: {
    unlocks: ['PhysicalShielding4']
  },
  PhysicalShielding4: {
    unlocks: ['Shieldbearer0']
  },

  SterlingArmor0: {
    unlocks: ['SterlingArmor1']
  },
  SterlingArmor1: {
    unlocks: ['SterlingArmor2']
  },
  SterlingArmor2: {
    unlocks: ['SterlingArmor3']
  },
  SterlingArmor3: {
    unlocks: ['SterlingArmor4']
  },
  SterlingArmor4: {

  },

  HolyProtection0: {
    unlocks: ['HolyProtection1']
  },
  HolyProtection1: {
    unlocks: ['HolyProtection2']
  },
  HolyProtection2: {
    unlocks: ['HolyProtection3']
  },
  HolyProtection3: {
    unlocks: ['HolyProtection4']
  },
  HolyProtection4: {

  },

  SilverSkin0: {
    unlocks: ['SilverSkin1']
  },
  SilverSkin1: {
    unlocks: ['SilverSkin2']
  },
  SilverSkin2: {
    unlocks: ['SilverSkin3']
  },
  SilverSkin3: {
    unlocks: ['SilverSkin4']
  },
  SilverSkin4: {

  },

  ForcefulStrike0: {
    unlocks: ['ForcefulStrike1', 'Thruststrike']
  },
  ForcefulStrike1: {
    unlocks: ['ForcefulStrike2', 'Blindstrike']
  },
  ForcefulStrike2: {
    unlocks: ['ForcefulStrike3', 'Multistrike']
  },
  ForcefulStrike3: {
    unlocks: ['ForcefulStrike4']
  },
  ForcefulStrike4: {

  },

  Multitarget0: {

  },

  Multifocus0: {
    unlocks: ['ImprovedMultifocus0']
  },

  ImprovedMultifocus0: {

  },

  DoubleThrust0: {
    unlocks: ['TripleThrust0']
  },

  TripleThrust0: {

  },

  Superstrike0: {

  },

  // SKILLS
  Provoke: {
    unlocks: ['PhysicalShielding0']
  },

  Multistrike: {
    unlocks: ['Multitarget0', 'Multifocus0', 'Superstrike0']
  },

  Blindstrike: {

  },

  Thruststrike: {
    unlocks: ['DoubleThrust0']
  }
};

export const AllTrees = [
  WARRIOR_TREE,
  DUELIST_TREE,
  MONK_TREE,
  PALADIN_TREE
];
