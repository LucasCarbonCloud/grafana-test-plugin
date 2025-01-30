import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addBooleanSwitch({
      path: 'showPercentage',
      name: 'Show Percentage',
      defaultValue: true,
    })
    .addNumberInput({
      path: 'cardSize',
      name: 'Card size',
      description: 'Card size in pixels',
      defaultValue: 70,
      category: ['Layout'],
    })
    .addNumberInput({
      path: 'podNameSize',
      name: 'Pod name size',
      description: 'Pod name size in pixels',
      defaultValue: 10,
      category: ['Layout'],
    })
    .addNumberInput({
      path: 'usageTextSize',
      name: 'Usage text size',
      description: 'Usage text size in pixels',
      defaultValue: 12,
      category: ['Layout'],
    })
    .addNumberInput({
      path: 'usageIconSize',
      name: 'Usage icon size',
      description: 'Usage icon size in pixels',
      defaultValue: 14,
      category: ['Layout'],
    })

    .addTextInput({
      path: 'podNameColumnName',
      name: 'Pod',
      description: 'The column name of the pod in the result set',
      defaultValue: 'pod',
      category: ['Column names'],
    })
    .addTextInput({
      path: 'cpuColumnName',
      name: 'CPU',
      description: 'The column name of the CPU in the result set',
      defaultValue: 'cpu',
      category: ['Column names'],
    })
    .addTextInput({
      path: 'cpuRequestColumnName',
      name: 'CPU request',
      description: 'The column name of the CPU limit in the result set',
      defaultValue: 'cpu_request',
      category: ['Column names'],
    })
    .addTextInput({
      path: 'memoryColumnName',
      name: 'Memory',
      description: 'The column name of the memory in the result set',
      defaultValue: 'memory',
      category: ['Column names'],
    })
    .addTextInput({
      path: 'memoryLimitColumnName',
      name: 'Memory limit',
      description: 'The column name of the memory limit in the result set',
      defaultValue: 'memory_limit',
      category: ['Column names'],
    })
    .addNumberInput({
      path: 'cpuErrorLevel',
      name: 'CPU error level',
      description: 'Level in percent when error state',
      defaultValue: 90,
      category: ['Levels'],
    })
    .addNumberInput({
      path: 'memoryErrorLevel',
      name: 'Memory error level',
      description: 'Level in percent when error state',
      defaultValue: 90,
      category: ['Levels'],
    })
    .addColorPicker({
      path: 'errorColor',
      name: 'Error color',
      description: 'color when error state',
      defaultValue: 'red',
      category: ['Levels'],
    })
    .addNumberInput({
      path: 'cpuWarningLevel',
      name: 'CPU warning level',
      description: 'Level in percent when warning state',
      defaultValue: 75,
      category: ['Levels'],
    })
    .addNumberInput({
      path: 'memoryWarningLevel',
      name: 'Memory warning level',
      description: 'Level in percent when warning state',
      defaultValue: 75,
      category: ['Levels'],
    })
    .addColorPicker({
      path: 'warningColor',
      name: 'Warning color',
      description: 'color when warning state',
      defaultValue: 'orange',
      category: ['Levels'],
    })
    .addNumberInput({
      path: 'cpuLowLevel',
      name: 'CPU low utilization level',
      description: 'Level in percent when utilization is too low',
      defaultValue: 30,
      category: ['Levels'],
    })
    .addNumberInput({
      path: 'memoryLowLevel',
      name: 'Memory low utilization level',
      description: 'Level in percent when utilization is too low',
      defaultValue: 30,
      category: ['Levels'],
    })
    .addColorPicker({
      path: 'lowColor',
      name: 'Low Utilization color',
      description: 'color when utilization is too low',
      defaultValue: 'semi-dark-purple',
      category: ['Levels'],
    })
    .addColorPicker({
      path: 'okColor',
      name: 'OK color',
      description: 'color when ok state',
      defaultValue: 'green',
      category: ['Levels'],
    })
    .addColorPicker({
      path: 'unknownColor',
      name: 'Unknown status color',
      description: 'color when unknown state',
      defaultValue: '#373737',
      category: ['Levels'],
    });
});
