export const config = {
  axes: {
    xBottom: { name: 'Year', unit: 'date', format: 'YYYY' },
    yLeft: { name: 'Emissions', unit: 'CO<sub>2</sub>e', format: 'number' }
  },
  theme: {
    yAllGhg: { stroke: '#00B4D2', fill: '#00B4D2' },
    yCo2: { stroke: '#0677B3', fill: '#0677B3' },
    yCh4: { stroke: '#D2187C', fill: '#D2187C' },
    yN2O: { stroke: '#FFB400', fill: '#FFB400' },
    yFGas: { stroke: '#FF7800', fill: '#FF7800' }
  },
  tooltip: {
    yAllGhg: { label: 'All GHG' },
    yCo2: { label: 'CO2' },
    yCh4: { label: 'CH4' },
    yN2O: { label: 'N2O' },
    yFGas: { label: 'F-Gas' }
  },
  animation: false,
  columns: {
    x: [ { label: 'year', value: 'x' } ],
    y: [
      { label: 'All GHG', value: 'yAllGhg' },
      { label: 'CO2', value: 'yCo2' },
      { label: 'CH4', value: 'yCh4' },
      { label: 'N2O', value: 'yN2O' },
      { label: 'F-Gas', value: 'yFGas' }
    ]
  }
};

export const initialYColumns = [
  { label: 'All GHG', value: 'yAllGhg' },
  { label: 'CO2', value: 'yCo2' },
  { label: 'CH4', value: 'yCh4' },
  { label: 'N2O', value: 'yN2O' },
  { label: 'F-Gas', value: 'yFGas' }
];

export const data = [
  {
    x: 1990,
    yAllGhg: 33823470500.000004,
    yCo2: 24697808420,
    yCh4: 6260373623,
    yN2O: 2603211690,
    yFGas: 262076768.3
  },
  {
    x: 1991,
    yAllGhg: 34008494300,
    yCo2: 24896694270,
    yCh4: 6250436642,
    yN2O: 2593531229,
    yFGas: 267832161.6
  },
  {
    x: 1992,
    yAllGhg: 33927955810,
    yCo2: 24830355700,
    yCh4: 6232559945,
    yN2O: 2591452609,
    yFGas: 273587555
  },
  {
    x: 1993,
    yAllGhg: 34051213100,
    yCo2: 24978277170,
    yCh4: 6212714853,
    yN2O: 2580878129,
    yFGas: 279342948.3
  },
  {
    x: 1994,
    yAllGhg: 34231542970.000004,
    yCo2: 25119866250,
    yCh4: 6226280491,
    yN2O: 2600297894,
    yFGas: 285098341.7
  },
  {
    x: 1995,
    yAllGhg: 34922077380,
    yCo2: 25756751920,
    yCh4: 6230246017,
    yN2O: 2644225712,
    yFGas: 290853735.1
  },
  {
    x: 1996,
    yAllGhg: 35376050940,
    yCo2: 26163539560,
    yCh4: 6234078864,
    yN2O: 2659988324,
    yFGas: 318444190.6
  },
  {
    x: 1997,
    yAllGhg: 36626681840,
    yCo2: 27115778030,
    yCh4: 6480349194,
    yN2O: 2684519972,
    yFGas: 346034646.09999996
  },
  {
    x: 1998,
    yAllGhg: 36299089570,
    yCo2: 26782316460,
    yCh4: 6439063189,
    yN2O: 2704084821,
    yFGas: 373625101.59999996
  },
  {
    x: 1999,
    yAllGhg: 36212691180,
    yCo2: 26715922420,
    yCh4: 6403498821,
    yN2O: 2692054386,
    yFGas: 401215557.1
  },
  {
    x: 2000,
    yAllGhg: 36855486840,
    yCo2: 27408957910,
    yCh4: 6370908476,
    yN2O: 2646814442,
    yFGas: 428806012.7
  },
  {
    x: 2001,
    yAllGhg: 37585676240,
    yCo2: 28087523600,
    yCh4: 6384554058,
    yN2O: 2650907141,
    yFGas: 462691434.8
  },
  {
    x: 2002,
    yAllGhg: 38771611510,
    yCo2: 28985616210,
    yCh4: 6605447805,
    yN2O: 2683970629,
    yFGas: 496576856.9
  },
  {
    x: 2003,
    yAllGhg: 39805407340,
    yCo2: 29926187870,
    yCh4: 6643817885,
    yN2O: 2704939307,
    yFGas: 530462279.1
  },
  {
    x: 2004,
    yAllGhg: 41392306790,
    yCo2: 31291664520,
    yCh4: 6779703100,
    yN2O: 2756591467,
    yFGas: 564347701.1999999
  },
  {
    x: 2005,
    yAllGhg: 42504577890,
    yCo2: 32274925700,
    yCh4: 6860697097,
    yN2O: 2770721962,
    yFGas: 598233123.4
  },
  {
    x: 2006,
    yAllGhg: 42805124640,
    yCo2: 32388853360,
    yCh4: 6991645106,
    yN2O: 2811612964,
    yFGas: 613013211.6
  },
  {
    x: 2007,
    yAllGhg: 43822884510,
    yCo2: 33305178430,
    yCh4: 7027200531,
    yN2O: 2862712247,
    yFGas: 627793299.7
  },
  {
    x: 2008,
    yAllGhg: 44206564140,
    yCo2: 33595045080.000004,
    yCh4: 7103481816,
    yN2O: 2865463859,
    yFGas: 642573387.9
  },
  {
    x: 2009,
    yAllGhg: 44091446800,
    yCo2: 33400014629.999996,
    yCh4: 7174050799,
    yN2O: 2860027893,
    yFGas: 657353476.1
  },
  {
    x: 2010,
    yAllGhg: 45760962720,
    yCo2: 34920893400,
    yCh4: 7248524098,
    yN2O: 2919411652,
    yFGas: 672133564.3
  },
  {
    x: 2011,
    yAllGhg: 47025974310,
    yCo2: 36005515560,
    yCh4: 7316971360,
    yN2O: 2980867577,
    yFGas: 722619814.1999999
  },
  {
    x: 2012,
    yAllGhg: 47583606990,
    yCo2: 36385689630,
    yCh4: 7406822224,
    yN2O: 3017989073,
    yFGas: 773106064.1
  },
  {
    x: 2013,
    yAllGhg: 48257297040,
    yCo2: 37028982290,
    yCh4: 7413958719,
    yN2O: 2990763717,
    yFGas: 823592314
  },
  {
    x: 2014,
    yAllGhg: 48892372860,
    yCo2: 37441527540,
    yCh4: 7526834317,
    yN2O: 3049932441,
    yFGas: 874078563.9
  }
];

export const domain = { x: [ 'auto', 'auto' ], y: [ null, 'auto' ] };

export const filters = [
  { value: 13, label: 'All GHG' },
  { value: 15, label: 'CH4' },
  { value: 14, label: 'CO2' },
  { value: 17, label: 'F-Gas' },
  { value: 16, label: 'N2O' }
];

export const filtersSelected = [
  { value: 13, label: 'All GHG' },
  { value: 15, label: 'CH4' },
  { value: 14, label: 'CO2' },
  { value: 16, label: 'N2O' }
];
