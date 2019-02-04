export const powerPercentage = value => `${Math.floor((0.6 + ((value / 48) * 0.6)) * 100)}%`;

export const throwerTypeOptions = [
  {
    label: 'RhBh/LhFh',
    value: 'rhbh',
  },
  {
    label: 'LhBh/RhFh',
    value: 'lhbh',
  },
];

export const flightColorOptions = [
  {
    label: 'yellow',
    value: 'yellow',
  },
  {
    label: 'blue',
    value: 'blue',
  },
  {
    label: 'red',
    value: 'red',
  },
  {
    label: 'purple',
    value: 'purple',
  },
  {
    label: 'orange',
    value: 'orange',
  },
  {
    label: 'green',
    value: 'green',
  },
  {
    label: 'magenta',
    value: 'magenta',
  },
  {
    label: 'vermillion',
    value: 'vermillion',
  },
  {
    label: 'amber',
    value: 'amber',
  },
  {
    label: 'chartreuse',
    value: 'chartreuse',
  },
  {
    label: 'teal',
    value: 'teal',
  },
  {
    label: 'violet',
    value: 'violet',
  },
];
