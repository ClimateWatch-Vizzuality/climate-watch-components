export const data = [
  { x: 2020, y: [ 25770000000, 18680000000 ], label: 'BAU', isRange: true },
  { x: 2025, y: 33230000000, label: 'Unconditional', isRange: false },
  { x: 2030, y: 0, label: 'Not Quantifiable', isRange: true }
];

export const config = {
  dividerLine: { pre: 'Historical Emissions', post: 'Projected Emissions' },
  projectedColumns: [
    { label: 'BAU', color: '#113750' },
    { label: 'Quantified', color: '#ffc735' },
    { label: 'Not Quantifiable', color: '#b1b1c1' }
  ],
  projectedLabel: {
    // Optional
    lenghtLimit: 10,
    labelOffset: 10,
    dY: 20
  }
};
