export interface CameraFeed {
  id: string;
  name: string;
  zone: string;
  status: 'ONLINE' | 'CALIBRATING' | 'ALERT';
  fps: number;
  activeShoppers: number;
  avgDwell: string;
  congestion: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  imgUrl: string;
}

export interface ZoneMetric {
  id: string;
  zoneName: string;
  captureRate: number;
  avgDwellSeconds: number;
  frictionScore: 'Low' | 'Medium' | 'High';
  staffAssigned: number;
  queueWaitMinutes: number;
  criticalAlertsCount: number;
  status: 'OPTIMIZED' | 'NEEDS_ATTENTION' | 'CRITICAL';
}

export interface DemoRequestData {
  fullName: string;
  email: string;
  companyName: string;
  storeLocations: number;
  cameraInfrastructure: string;
  preferredDate?: string;
  notes?: string;
}

export interface StoreInsightRequest {
  storeName?: string;
  activeZone?: string;
  currentShoppers?: number;
  avgDwellMinutes?: number;
  queueLength?: number;
  query?: string;
}

export interface StoreInsightResponse {
  insights: string;
  staffRecommendation: string;
  layoutFix: string;
  estimatedEfficiencyGain: string;
}
