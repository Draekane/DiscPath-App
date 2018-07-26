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
