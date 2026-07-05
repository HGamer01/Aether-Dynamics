export type ActiveTab = 'home' | 'about' | 'tech' | 'applications' | 'pricing' | 'contact';

export type VesselType = 'urban' | 'aerospace' | 'orbital' | 'luxury';

export interface SimulationSpecs {
  vesselType: string;
  corePower: number;
  altitude: number;
  fieldStabilization: number;
  propulsionFrequency: number;
}

export interface DiagnosticResult {
  summary: string;
  resonanceAnalysis: string;
  recommendations: string[];
  metrics: {
    liftCoefficient: number;
    energyDispersionRate: number;
    gravitationalDeflection: number;
    stabilityFactor: number;
  };
}

export interface ApplicationCard {
  id: string;
  title: string;
  category: string;
  description: string;
  specs: string[];
  status: string;
  metric: string;
  imageSeed: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarSeed: string;
}

export interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  specs: {
    maxLoad: string;
    energyEfficiency: string;
    warpRadius: string;
  };
  isPopular: boolean;
}
