export interface BrandConfig {
  name: string;
  tagline: string;
  creativeConcept: string;
  targetTransformation: string;
  pricePlaceholder: string;
  shippingPlaceholder: string;
  guaranteeLegalPlaceholder: string;
  countryPlaceholder: string;
  factoryWarranty: string;
  labClaimNote: string;
}

export interface ProductSpecs {
  power: string;
  voltage: string;
  tankCapacity: string;
  continuousSteam: string;
  garmentsPerTank: string;
  maxTemperature: string;
  heatUpTime: string;
  heatUpTimeNote: string;
  steamLevels: string;
  dryIronMode: boolean;
  swivelPlate: boolean;
  innerTankMaterial: string;
  bodyMaterial: string;
  display: string;
  dockIncluded: boolean;
  measuringCupIncluded: boolean;
  storageBagIncluded: boolean;
  plugTypes: string[];
  weightPlaceholder: string;
  dimensionsPlaceholder: string;
}

export interface HonestyFeature {
  title: string;
  desc: string;
}

export interface HonestyLabelItem {
  does: HonestyFeature[];
  doesNot: HonestyFeature[];
  cordRationale: {
    title: string;
    description: string;
  };
}

export interface ComparisonRow {
  feature: string;
  traditionalIron: string;
  cheapSteamer: string;
  liso: string;
}

export interface LifestyleScene {
  id: string;
  number: string;
  title: string;
  caption: string;
  context: string;
  imagePlaceholderText: string;
  aspectRatio: string;
}

export interface BoxItem {
  id: string;
  name: string;
  annotation: string;
  includedCount: string;
  placeholderText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  verified: boolean;
}
