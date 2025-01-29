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
      path: 'cpuLimitColumnName',
      name: 'CPU limit',
      description: 'The column name of the CPU limit in the result set',
      defaultValue: 'cpu_limit',
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
    .addColorPicker({
      path: 'okColor',
      name: 'OK color',
      description: 'color when ok state',
      defaultValue: 'green',
      category: ['Levels'],
    });
});
