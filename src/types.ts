export interface SimpleOptions {
  podNameColumnName: string;
  cpuColumnName: string;
  cpuRequestColumnName: string;
  memoryColumnName: string;
  memoryLimitColumnName: string;
  showPercentage: boolean;
  cpuWarningLevel: number;
  cpuErrorLevel: number;
  memoryWarningLevel: number;
  memoryErrorLevel: number;
  okColor: string;
  warningColor: string;
  errorColor: string;
  unknownColor: string;
  memoryLowLevel: number;
  cpuLowLevel: number;
  lowColor: string;

  cardSize: number;
  podNameSize: number;
  usageTextSize: number;
  usageIconSize: number;
}
