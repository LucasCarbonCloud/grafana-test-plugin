import React from 'react';
import { DataFrame, PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';
import { PanelDataErrorView } from '@grafana/runtime';
import '../style.js';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

interface Pod {
  name: string;
  cpu: number;
  cpuLimit: number;
  cpuPerc: number;
  memory: number;
  memoryLimit: number;
  memoryPerc: number;
  state: string;
  color: string;
  textColor: string;
  memoryUnknown: boolean;
  cpuUnknown: boolean;
}

function colorIsDark(bgColor: string): boolean {
  let color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  let r = parseInt(color.substring(0, 2), 16); // hexToR
  let g = parseInt(color.substring(2, 4), 16); // hexToG
  let b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 <= 186;
}

// function createComponent(name: string, memory: number, memoryLimit: number): Component {
//   return { name, memory, memoryLimit };
// }

function getFieldNumber(name: string, data: DataFrame): number {
  const index = data.fields.findIndex((field) => field.name === name);
  return index !== -1 ? index : -1; // Return -1 if field name is not found
}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  const colPod = getFieldNumber(options.podNameColumnName, data.series[0]);
  const colMemory = getFieldNumber(options.memoryColumnName, data.series[0]);
  const colMemoryLimit = getFieldNumber(options.memoryLimitColumnName, data.series[0]);
  const colCpu = getFieldNumber(options.cpuColumnName, data.series[0]);
  const colCpuLimit = getFieldNumber(options.cpuLimitColumnName, data.series[0]);

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  const pods = data.series[0].fields[colPod].values.map((name, index) => {
    let pod: Pod = {
      name: name,
      memory: data.series[0].fields[colMemory].values[index],
      memoryLimit: data.series[0].fields[colMemoryLimit].values[index], // Add memoryLimit if needed
      memoryPerc: Math.round(
        (100 * data.series[0].fields[colMemory].values[index]) / data.series[0].fields[colMemoryLimit].values[index]
      ),
      cpu: data.series[0].fields[colCpu].values[index],
      cpuLimit: data.series[0].fields[colCpuLimit].values[index], // Add memoryLimit if needed
      cpuPerc: Math.round(
        (100 * data.series[0].fields[colCpu].values[index]) / data.series[0].fields[colCpuLimit].values[index]
      ),
      state: 'none',
      color: '#000000',
      textColor: '#FFFFFF',
      memoryUnknown: false,
      cpuUnknown: false,
    };

    if (!pod.memoryLimit) {
      pod.memoryUnknown = true;
    }

    if (!pod.cpuLimit) {
      pod.cpuUnknown = true;
    }

    if (pod.memoryUnknown && pod.cpuUnknown) {
      pod.state = 'unknown';
      pod.color = theme.visualization.getColorByName(options.unknownColor);
    } else if (
      (!pod.memoryUnknown && pod.memoryPerc >= options.memoryErrorLevel) ||
      (!pod.cpuUnknown && pod.cpuPerc >= options.cpuErrorLevel)
    ) {
      pod.state = 'error';
      pod.color = theme.visualization.getColorByName(options.errorColor);
    } else if (
      (!pod.memoryUnknown && pod.memoryPerc >= options.memoryWarningLevel) ||
      (!pod.cpuUnknown && pod.cpuPerc >= options.cpuWarningLevel)
    ) {
      pod.state = 'warn';
      pod.color = theme.visualization.getColorByName(options.warningColor);
    } else if (
      (!pod.memoryUnknown && pod.memoryPerc <= options.memoryLowLevel) ||
      (!pod.cpuUnknown && pod.cpuPerc <= options.cpuLowLevel)
    ) {
      pod.state = 'low';
      pod.color = theme.visualization.getColorByName(options.lowColor);
    } else {
      pod.state = 'ok';
      pod.color = theme.visualization.getColorByName(options.okColor);
    }

    if (colorIsDark(pod.color)) {
      pod.textColor = '#ffffff';
    } else {
      pod.textColor = '#000000';
    }

    return pod;
  });

  const stateOrder = ['error', 'warn', 'low', 'ok', 'unknown'];
  pods.sort((a, b) => stateOrder.indexOf(a.state) - stateOrder.indexOf(b.state));

  return (
    <div
      className={
        'overflow-y-scroll' +
        ' ' +
        cx(
          styles.wrapper,
          css`
            width: ${width}px;
            height: ${height}px;
          `
        )
      }
    >
      <div className="flex flex-wrap" style={{ background: '' }}>
        <>
          {pods.map((pod, index) => (
            <Card key={index} pod={pod} showPercentage={options.showPercentage} />
          ))}
        </>
      </div>
    </div>
  );
};

interface CardProps {
  pod: Pod;
  showPercentage: boolean;
}

const Card: React.FC<CardProps> = ({ pod, showPercentage }) => {
  let memPerc = '' + pod.memoryPerc;
  let cpuPerc = '' + pod.cpuPerc;

  if (pod.memoryUnknown) {
    memPerc = '??';
  }

  if (pod.cpuUnknown) {
    cpuPerc = '??';
  }

  return (
    <div
      className="p-2 m-2 rounded-lg w-20 h-20 hover:w-auto shadow-lg border-[{pod.textColor}] border"
      style={{ background: pod.color, color: pod.textColor, fill: pod.textColor }}
    >
      <div className="text-xs truncate">{pod.name}</div>
      <div className="flex items-center">
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c-35.3 0-64 28.7-64 64l-40 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l40 0 0 56-40 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l40 0 0 56-40 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l40 0c0 35.3 28.7 64 64 64l0 40c0 13.3 10.7 24 24 24s24-10.7 24-24l0-40 56 0 0 40c0 13.3 10.7 24 24 24s24-10.7 24-24l0-40 56 0 0 40c0 13.3 10.7 24 24 24s24-10.7 24-24l0-40c35.3 0 64-28.7 64-64l40 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-40 0 0-56 40 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-40 0 0-56 40 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-40 0c0-35.3-28.7-64-64-64l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40-56 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40-56 0 0-40zM160 128l192 0c17.7 0 32 14.3 32 32l0 192c0 17.7-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32l0-192c0-17.7 14.3-32 32-32zm192 32l-192 0 0 192 192 0 0-192z" />
        </svg>
        <div className="ml-2 truncate">{showPercentage ? `${cpuPerc}%` : `${pod.cpu}/${pod.cpuLimit}`}</div>
      </div>
      <div className="flex items-center">
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M64 64C28.7 64 0 92.7 0 128l0 7.4c0 6.8 4.4 12.6 10.1 16.3C23.3 160.3 32 175.1 32 192s-8.7 31.7-21.9 40.3C4.4 236 0 241.8 0 248.6L0 320l576 0 0-71.4c0-6.8-4.4-12.6-10.1-16.3C552.7 223.7 544 208.9 544 192s8.7-31.7 21.9-40.3c5.7-3.7 10.1-9.5 10.1-16.3l0-7.4c0-35.3-28.7-64-64-64L64 64zM576 352L0 352l0 64c0 17.7 14.3 32 32 32l48 0 0-32c0-8.8 7.2-16 16-16s16 7.2 16 16l0 32 96 0 0-32c0-8.8 7.2-16 16-16s16 7.2 16 16l0 32 96 0 0-32c0-8.8 7.2-16 16-16s16 7.2 16 16l0 32 96 0 0-32c0-8.8 7.2-16 16-16s16 7.2 16 16l0 32 48 0c17.7 0 32-14.3 32-32l0-64zM192 160l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32z" />
        </svg>
        <div className="ml-2 truncate">{showPercentage ? `${memPerc}%` : `${pod.memory}/${pod.memoryLimit}`}</div>
      </div>
    </div>
  );
};
