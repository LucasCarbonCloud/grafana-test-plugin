export interface SimpleOptions {
  podNameColumnName: string;
  cpuColumnName: string;
  cpuLimitColumnName: string;
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
}
