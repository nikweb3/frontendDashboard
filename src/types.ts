export interface TelemetryData {
    id: number;
    cpuUsage: number;
    memoryUsage: number;
  }
  
  export interface Compliance {
    encryptionEnabled: boolean;
    policyCompliant: boolean;
  }
  
  export interface Sustainability {
    powerConsumption: number;
    carbonFootprint: number;
  }
  
  export interface DexScore {
    performanceScore: number;
    userFeedbackScore: number;
  }
  
  export interface Device {
    id: number;
    name: string;
    os: string;
    serialNumber: string;
    telemetryData: TelemetryData[];
    compliance: Compliance;
    sustainability: Sustainability;
    dexScore: DexScore;
  }