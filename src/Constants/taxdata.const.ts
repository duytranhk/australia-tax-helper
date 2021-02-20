export const taxData = [
  {
    year: '2021',
    current: 'true',
    tax: {
      label: 'Australian Resident',
      incremental: 1,
      brackets: [
        {from: 0, to: 18200, type: 'percent', nearest: 1, value: 0},
        {from: 18200, to: 45000, type: 'percent', nearest: 1, value: 19},
        {from: 45000, to: 120000, type: 'percent', nearest: 1, value: 32.5},
        {from: 120000, to: 180000, type: 'percent', nearest: 1, value: 37},
        {from: 180000, to: 0, type: 'percent', nearest: 1, value: 45},
      ],

      payg: [
        {income: 359, a: 0, b: 0},
        {income: 438, a: 0.19, b: 68.3462},
        {income: 548, a: 0.29, b: 112.1942},
        {income: 721, a: 0.21, b: 68.3465},
        {income: 865, a: 0.219, b: 74.8369},
        {income: 1282, a: 0.3477, b: 186.2119},
        {income: 2307, a: 0.345, b: 182.7504},
        {income: 3461, a: 0.39, b: 286.5965},
        {income: 0, a: 0.47, b: 563.5196},
      ],
    },
    taxNoFreeThreshold: {
      label: 'No Tax-Free Threshold',
      incremental: 1,
      brackets: [
        {from: 0, to: 45000, type: 'percent', nearest: 1, value: 19},
        {from: 45000, to: 120000, type: 'percent', nearest: 1, value: 32.5},
        {from: 120000, to: 180000, type: 'percent', nearest: 1, value: 37},
        {from: 180000, to: 0, type: 'percent', nearest: 1, value: 45},
      ],

      payg: [
        {income: 88, a: 0.19, b: 0.19},
        {income: 371, a: 0.2348, b: 3.9639},
        {income: 515, a: 0.219, b: -1.9003},
        {income: 932, a: 0.3477, b: 64.4297},
        {income: 1957, a: 0.345, b: 61.9132},
        {income: 3111, a: 0.39, b: 150.0093},
        {income: 0, a: 0.47, b: 398.9324},
      ],
    },
    taxNonResident: {
      label: 'Non Resident',
      incremental: 1,
      brackets: [
        {from: 0, to: 120000, type: 'percent', nearest: 1, value: 32.5},
        {from: 120000, to: 180000, type: 'percent', nearest: 1, value: 37},
        {from: 180000, to: 0, type: 'percent', nearest: 1, value: 45},
      ],

      payg: [
        {income: 2307, a: 0.325, b: 0.325},
        {income: 3461, a: 0.37, b: 103.8462},
        {income: 0, a: 0.45, b: 380.7692},
      ],
    },
    taxBackpacker: {
      label: 'Backpacker',
      incremental: 1,
      brackets: [
        {from: 0, to: 45000, type: 'percent', nearest: 1, value: 15},
        {from: 45000, to: 120000, type: 'percent', nearest: 1, value: 32.5},
        {from: 120000, to: 180000, type: 'percent', nearest: 1, value: 37},
        {from: 180000, to: 0, type: 'percent', nearest: 1, value: 45},
      ],
    },
    taxMedicareHalf: {
      label: 'Half Medicare exemption',
      incremental: 1,
      payg: [
        {income: 359, a: 0.0, b: 0.0},
        {income: 721, a: 0.19, b: 68.3462},
        {income: 739, a: 0.199, b: 74.8365},
        {income: 865, a: 0.249, b: 111.8308},
        {income: 924, a: 0.3777, b: 223.2058},
        {income: 1282, a: 0.3377, b: 186.2119},
        {income: 2307, a: 0.335, b: 182.7504},
        {income: 3461, a: 0.38, b: 286.5965},
        {income: 0, a: 0.46, b: 563.5196},
      ],
    },
    taxMedicareFull: {
      label: 'Full Medicare exemption',
      incremental: 1,
      payg: [
        {income: 359, a: 0.0, b: 0.0},
        {income: 721, a: 0.19, b: 68.3462},
        {income: 865, a: 0.199, b: 74.8365},
        {income: 1282, a: 0.3277, b: 186.2115},
        {income: 2307, a: 0.325, b: 182.75},
        {income: 3461, a: 0.37, b: 286.5962},
        {income: 0, a: 0.45, b: 563.5192},
      ],
    },
    extraWitholding: {
      label: 'Extra witholding',
      incremental: 1,
      weekly: {
        brackets: [
          {from: 0, to: 724, type: 'fixed', nearest: 1, value: 0},
          {from: 724, to: 1700, type: 'fixed', nearest: 1, value: 3},
          {from: 1700, to: 3500, type: 'fixed', nearest: 1, value: 4},
          {from: 3500, to: 0, type: 'fixed', nearest: 1, value: 9},
        ],
      },
      fortnightly: {
        brackets: [
          {from: 0, to: 1400, type: 'fixed', nearest: 1, value: 0},
          {from: 1400, to: 3400, type: 'fixed', nearest: 1, value: 12},
          {from: 3400, to: 6900, type: 'fixed', nearest: 1, value: 17},
          {from: 6900, to: 0, type: 'fixed', nearest: 1, value: 37},
        ],
      },
    },
    lito: {
      incremental: 0,
      paygLoading: 1.0,
      brackets: [
        {from: 0, to: 37500, type: 'fixed', nearest: 1, value: '700'},
        {
          from: 37500,
          to: 45000,
          type: 'rate',
          nearest: 1,
          start: 700,
          end: 325,
          value: -5,
        },
        {
          from: 45000,
          to: 66667,
          type: 'rate',
          nearest: 1,
          start: 325,
          end: 0,
          value: -1.5,
        },
        {from: 66667, to: 0, type: 'fixed', nearest: 1, value: 0},
      ],
    },
    lamito: {
      incremental: 0,
      paygLoading: 1.0,
      brackets: [
        {from: 0, to: 37000, type: 'fixed', nearest: 1, value: 255},
        {
          from: 37000,
          to: 48000,
          type: 'rate',
          nearest: 1,
          start: 255,
          end: 1080,
          value: 7.5,
        },
        {from: 48000, to: 90000, type: 'fixed', nearest: 1, value: 1080},
        {
          from: 90000,
          to: 126000,
          type: 'rate',
          nearest: 1,
          start: 1080,
          end: 0,
          value: -3.0,
        },
        {from: 126000, to: 0, type: 'fixed', nearest: 1, value: 0},
      ],
    },
    mawto: {
      incremental: 1,
      paygLoading: 1.0,
      brackets: [{from: 0, to: 0, type: 'fixed', nearest: 1, value: 0}],
    },
    sapto: {
      incremental: 1,
      paygLoading: 1.0,
      single: {
        brackets: [
          {from: 0, to: 32280, type: 'fixed', nearest: 1, value: 2230},
          {from: 32280, to: 50120, type: 'percent', nearest: 1, value: -12.5},
          {
            from: 50120,
            to: 0,
            type: 'fixed',
            nearest: 1,
            value: 0,
            incremental: 'false',
          },
        ],
      },
      married: {
        brackets: [
          {from: 0, to: 28974, type: 'fixed', nearest: 1, value: 1602},
          {from: 28974, to: 83580, type: 'percent', nearest: 1, value: -12.5},
          {
            from: 83580,
            to: 0,
            type: 'fixed',
            nearest: 1,
            value: 0,
            incremental: 'false',
          },
        ],
      },
      illness: {
        brackets: [
          {from: 0, to: 31279, type: 'fixed', nearest: 1, value: 2230},
          {from: 31279, to: 95198, type: 'percent', nearest: 1, value: -12.5},
          {
            from: 95198,
            to: 0,
            type: 'fixed',
            nearest: 1,
            value: 0,
            incremental: 'false',
          },
        ],
      },
    },
    medicare: {
      incremental: 1,
      brackets: [
        {from: 0, to: 22801, type: 'percent', nearest: 1, value: 0},
        {from: 22801, to: 28501, type: 'percent', nearest: 1, value: 10.0},
        {
          from: 28501,
          to: 0,
          type: 'percent',
          nearest: 1,
          value: 2.0,
          incremental: 'false',
        },
      ],
    },
    medicareFamily: {
      incremental: 1,
      dependants: 3533,
      brackets: [
        {from: 0, to: 38474, type: 'percent', nearest: 1, value: 0},
        {from: 38474, to: 48092, type: 'percent', nearest: 1, value: 10.0},
        {
          from: 48092,
          to: 0,
          type: 'percent',
          nearest: 1,
          value: 2.0,
          incremental: 'false',
        },
      ],
    },
    medicareSenior: {
      incremental: 1,
      brackets: [
        {from: 0, to: 36056, type: 'percent', nearest: 1, value: 0},
        {from: 36056, to: 45069, type: 'percent', nearest: 1, value: 10.0},
        {
          from: 45069,
          to: 0,
          type: 'percent',
          nearest: 1,
          value: 2.0,
          incremental: 'false',
        },
      ],
    },
    medicareSeniorFamily: {
      incremental: 1,
      dependants: 3533,
      brackets: [
        {from: 0, to: 50191, type: 'percent', nearest: 1, value: 0},
        {from: 50191, to: 62738, type: 'percent', nearest: 1, value: 10.0},
        {
          from: 62738,
          to: 0,
          type: 'percent',
          nearest: 1,
          value: 2.0,
          incremental: 'false',
        },
      ],
    },
    medicareAdjustment: {
      earningThreshold: {scale2: 438, scale6: 739},
      shadeInThreshold: {scale2: 548, scale6: 924},
      annualThreshold: {scale2: 38474, scale6: 38474},
      additioalChild: {scale2: 3533, scale6: 3533},
      shadeOutMultiplier: {scale2: 0.1, scale6: 0.05},
      shadeOutDivisor: {scale2: 0.08, scale6: 0.04},
      weeklyAdjustment: {scale2: 438.48, scale6: 739.88},
      medicareLevy: {scale2: 0.02, scale6: 0.01},
    },
    medicareSurcharge: {
      incremental: 0,
      brackets: [
        {from: 0, to: 90000, type: 'percent', nearest: 1, value: 0},
        {from: 90000, to: 105000, type: 'percent', nearest: 1, value: 1.0},
        {from: 105000, to: 140000, type: 'percent', nearest: 1, value: 1.25},
        {from: 140000, to: 0, type: 'percent', nearest: 1, value: 1.5},
      ],
    },
    medicareSurchargeFamily: {
      incremental: 0,
      brackets: [
        {from: 0, to: 180000, type: 'percent', nearest: 1, value: 0},
        {from: 180000, to: 210000, type: 'percent', nearest: 1, value: 1.0},
        {from: 210000, to: 280000, type: 'percent', nearest: 1, value: 1.25},
        {from: 280000, to: 0, type: 'percent', nearest: 1, value: 1.5},
      ],
    },
    other: [],
    superannuation: {
      incremental: 0,
      concessionalCap: 25000,
      nonConcesssionalCap: 100000,
      nonConcessionalExcessTax: 0.47,
      concessionalTax: 0.15,
      rate: 9.5,
      brackets: [{from: 0, to: 0, type: 'percent', nearest: 1, value: 9.5}],
    },
    superannuationCocontribution: {
      minIncome: 39837,
      maxIncome: 54837,
      maxEntitlement: 500,
      minContribution: 20,
      reductionFactor: 0.03333,
      contributionRate: 0.5,
    },
    superannuationLISTO: {
      maxIncome: 37000,
      maxEntitlement: 500,
      minContribution: 10,
      contributionRate: 0.15,
    },
    superannuationCarryForward: {
      cap: 0,
    },
    superannuationSpouseTaxOffset: {
      spouseIncomeCap: 40000,
      rate: 0.18,
      incremental: 0,
      brackets: [
        {from: 0, to: 37000, type: 'fixed', nearest: 1, value: 3000},
        {
          from: 37000,
          to: 40000,
          type: 'rate',
          nearest: 1,
          start: 3000,
          end: 0,
          value: -100,
        },
        {from: 40000, to: 0, type: 'fixed', nearest: 1, value: 0},
      ],
    },
    division293: {
      incremental: 1,
      threshold: 250000,
      rate: 15,
      brackets: [
        {from: 0, to: 250000, type: 'percent', nearest: 1, value: 0.0},
        {from: 250000, to: 0, type: 'percent', nearest: 1, value: 15.0},
      ],
    },
    help: {
      label: 'HECS, HELP, VET, SSL, TSL',
      incremental: 0,
      brackets: [
        {from: 0, to: 46620, type: 'fixed', nearest: 1, value: 0},
        {from: 46620, to: 53827, type: 'percent', nearest: 1, value: 1.0},
        {from: 53827, to: 57056, type: 'percent', nearest: 1, value: 2.0},
        {from: 57056, to: 60480, type: 'percent', nearest: 1, value: 2.5},
        {from: 60480, to: 64109, type: 'percent', nearest: 1, value: 3.0},
        {from: 64109, to: 67955, type: 'percent', nearest: 1, value: 3.5},
        {from: 67955, to: 72032, type: 'percent', nearest: 1, value: 4.0},
        {from: 72032, to: 76355, type: 'percent', nearest: 1, value: 4.5},
        {from: 76355, to: 80936, type: 'percent', nearest: 1, value: 5.0},
        {from: 80936, to: 85793, type: 'percent', nearest: 1, value: 5.5},
        {from: 85793, to: 90940, type: 'percent', nearest: 1, value: 6.0},
        {from: 90940, to: 96397, type: 'percent', nearest: 1, value: 6.5},
        {from: 96397, to: 102180, type: 'percent', nearest: 1, value: 7.0},
        {from: 102180, to: 108310, type: 'percent', nearest: 1, value: 7.5},
        {from: 108310, to: 114708, type: 'percent', nearest: 1, value: 8.0},
        {from: 114708, to: 121699, type: 'percent', nearest: 1, value: 8.6},
        {from: 121699, to: 129000, type: 'percent', nearest: 1, value: 9.0},
        {from: 129000, to: 136740, type: 'percent', nearest: 1, value: 9.5},
        {from: 136740, to: 0, type: 'percent', nearest: 1, value: 10.0},
      ],
    },
    help_noTaxFree: {
      label: 'HECS, HELP, VET, SSL, TSL - Non resident',
      incremental: 0,
      brackets: [
        {from: 0, to: 28420, type: 'fixed', nearest: 1, value: 0},
        {from: 28420, to: 35627, type: 'percent', nearest: 1, value: 1.0},
        {from: 35627, to: 38856, type: 'percent', nearest: 1, value: 2.0},
        {from: 38856, to: 42280, type: 'percent', nearest: 1, value: 2.5},
        {from: 42280, to: 45909, type: 'percent', nearest: 1, value: 3.0},
        {from: 45909, to: 49755, type: 'percent', nearest: 1, value: 3.5},
        {from: 49755, to: 53822, type: 'percent', nearest: 1, value: 4.0},
        {from: 53822, to: 58155, type: 'percent', nearest: 1, value: 4.5},
        {from: 58155, to: 62736, type: 'percent', nearest: 1, value: 5.0},
        {from: 62736, to: 67593, type: 'percent', nearest: 1, value: 5.5},
        {from: 67593, to: 72740, type: 'percent', nearest: 1, value: 6.0},
        {from: 72740, to: 78197, type: 'percent', nearest: 1, value: 6.5},
        {from: 78197, to: 83980, type: 'percent', nearest: 1, value: 7.0},
        {from: 83980, to: 90110, type: 'percent', nearest: 1, value: 7.5},
        {from: 90110, to: 96508, type: 'percent', nearest: 1, value: 8.0},
        {from: 96508, to: 103499, type: 'percent', nearest: 1, value: 8.5},
        {from: 103499, to: 110800, type: 'percent', nearest: 1, value: 9.0},
        {from: 110800, to: 118540, type: 'percent', nearest: 1, value: 9.5},
        {from: 118540, to: 0, type: 'percent', nearest: 1, value: 10.0},
      ],
    },
    sfss: {
      label: 'SFSS',
      incremental: 0,
      brackets: [
        {from: 0, to: 46620, type: 'fixed', nearest: 1, value: 0},
        {from: 46620, to: 53827, type: 'percent', nearest: 1, value: 1.0},
        {from: 53827, to: 57056, type: 'percent', nearest: 1, value: 2.0},
        {from: 57056, to: 60480, type: 'percent', nearest: 1, value: 2.5},
        {from: 60480, to: 64109, type: 'percent', nearest: 1, value: 3.0},
        {from: 64109, to: 67955, type: 'percent', nearest: 1, value: 3.5},
        {from: 67955, to: 72032, type: 'percent', nearest: 1, value: 4.0},
        {from: 72032, to: 76355, type: 'percent', nearest: 1, value: 4.5},
        {from: 76355, to: 80936, type: 'percent', nearest: 1, value: 5.0},
        {from: 80936, to: 85793, type: 'percent', nearest: 1, value: 5.5},
        {from: 85793, to: 90940, type: 'percent', nearest: 1, value: 6.0},
        {from: 90940, to: 96397, type: 'percent', nearest: 1, value: 6.5},
        {from: 96397, to: 102180, type: 'percent', nearest: 1, value: 7.0},
        {from: 102180, to: 108310, type: 'percent', nearest: 1, value: 7.5},
        {from: 108310, to: 114708, type: 'percent', nearest: 1, value: 8.0},
        {from: 114708, to: 121699, type: 'percent', nearest: 1, value: 8.6},
        {from: 121699, to: 129000, type: 'percent', nearest: 1, value: 9.0},
        {from: 129000, to: 136740, type: 'percent', nearest: 1, value: 9.5},
        {from: 136740, to: 0, type: 'percent', nearest: 1, value: 10.0},
      ],
    },
    sfss_noTaxFree: {
      label: 'SFSS - Non resident',
      incremental: 0,
      brackets: [
        {from: 0, to: 28420, type: 'fixed', nearest: 1, value: 0},
        {from: 28420, to: 35627, type: 'percent', nearest: 1, value: 1.0},
        {from: 35627, to: 38856, type: 'percent', nearest: 1, value: 2.0},
        {from: 38856, to: 42280, type: 'percent', nearest: 1, value: 2.5},
        {from: 42280, to: 45909, type: 'percent', nearest: 1, value: 3.0},
        {from: 45909, to: 49755, type: 'percent', nearest: 1, value: 3.5},
        {from: 49755, to: 53822, type: 'percent', nearest: 1, value: 4.0},
        {from: 53822, to: 58155, type: 'percent', nearest: 1, value: 4.5},
        {from: 58155, to: 62736, type: 'percent', nearest: 1, value: 5.0},
        {from: 62736, to: 67593, type: 'percent', nearest: 1, value: 5.5},
        {from: 67593, to: 72740, type: 'percent', nearest: 1, value: 6.0},
        {from: 72740, to: 78197, type: 'percent', nearest: 1, value: 6.5},
        {from: 78197, to: 83980, type: 'percent', nearest: 1, value: 7.0},
        {from: 83980, to: 90110, type: 'percent', nearest: 1, value: 7.5},
        {from: 90110, to: 96508, type: 'percent', nearest: 1, value: 8.0},
        {from: 96508, to: 103499, type: 'percent', nearest: 1, value: 8.5},
        {from: 103499, to: 110800, type: 'percent', nearest: 1, value: 9.0},
        {from: 110800, to: 118540, type: 'percent', nearest: 1, value: 9.5},
        {from: 118540, to: 0, type: 'percent', nearest: 1, value: 10.0},
      ],
    },
  },
];

export const preBudget2020 = {
  year: '2021',
  current: 'true',
  tax: {
    label: 'Australian Resident',
    incremental: 1,
    brackets: [
      {from: 0, to: 18200, type: 'percent', nearest: 1, value: 0},
      {from: 18200, to: 37000, type: 'percent', nearest: 1, value: 19},
      {from: 37000, to: 90000, type: 'percent', nearest: 1, value: 32.5},
      {from: 90000, to: 180000, type: 'percent', nearest: 1, value: 37},
      {from: 180000, to: 0, type: 'percent', nearest: 1, value: 45},
    ],

    payg: [
      {income: 355, a: 0.0, b: 0.0},
      {income: 422, a: 0.19, b: 67.4635},
      {income: 528, a: 0.29, b: 109.7327},
      {income: 711, a: 0.21, b: 67.4635},
      {income: 1282, a: 0.3477, b: 165.4423},
      {income: 1730, a: 0.345, b: 161.9808},
      {income: 3461, a: 0.39, b: 239.8654},
      {income: 0, a: 0.47, b: 516.7885},
    ],
  },
  taxNoFreeThreshold: {
    label: 'No Tax-Free Threshold',
    incremental: 1,
    brackets: [
      {from: 0, to: 37000, type: 'percent', nearest: 1, value: 19},
      {from: 37000, to: 90000, type: 'percent', nearest: 1, value: 32.5},
      {from: 90000, to: 180000, type: 'percent', nearest: 1, value: 37},
      {from: 180000, to: 0, type: 'percent', nearest: 1, value: 45},
    ],

    payg: [
      {income: 72, a: 0.19, b: 0.19},
      {income: 361, a: 0.2342, b: 3.213},
      {income: 932, a: 0.3477, b: 44.2476},
      {income: 1380, a: 0.345, b: 41.7311},
      {income: 3111, a: 0.39, b: 103.8657},
      {income: 0, a: 0.47, b: 352.7888},
    ],
  },
  taxNonResident: {
    label: 'Non Resident',
    incremental: 1,
    brackets: [
      {from: 0, to: 90000, type: 'percent', nearest: 1, value: 32.5},
      {from: 90000, to: 180000, type: 'percent', nearest: 1, value: 37},
      {from: 180000, to: 0, type: 'percent', nearest: 1, value: 45},
    ],

    payg: [
      {income: 1730, a: 0.325, b: 0.325},
      {income: 3461, a: 0.37, b: 77.8846},
      {income: 0, a: 0.45, b: 354.8077},
    ],
  },
  taxBackpacker: {
    label: 'Backpacker',
    incremental: 1,
    brackets: [
      {from: 0, to: 37000, type: 'percent', nearest: 1, value: 15},
      {from: 37000, to: 90000, type: 'percent', nearest: 1, value: 32.5},
      {from: 90000, to: 180000, type: 'percent', nearest: 1, value: 37},
      {from: 180000, to: 0, type: 'percent', nearest: 1, value: 45},
    ],
  },
  taxMedicareHalf: {
    label: 'Half Medicare exemption',
    incremental: 1,
    payg: [
      {income: 335, a: 0.0, b: 0.0},
      {income: 711, a: 0.19, b: 67.4635},
      {income: 713, a: 0.3277, b: 165.4423},
      {income: 891, a: 0.3777, b: 201.1048},
      {income: 1282, a: 0.3377, b: 165.4425},
      {income: 1730, a: 0.335, b: 161.981},
      {income: 3461, a: 0.38, b: 239.8565},
      {income: 0, a: 0.46, b: 516.7887},
    ],
  },
  taxMedicareFull: {
    label: 'Full Medicare exemption',
    incremental: 1,
    payg: [
      {income: 335, a: 0.0, b: 0.0},
      {income: 711, a: 0.19, b: 67.4635},
      {income: 1282, a: 0.3277, b: 165.4423},
      {income: 1730, a: 0.325, b: 161.9808},
      {income: 3461, a: 0.37, b: 239.8654},
      {income: 0, a: 0.45, b: 516.7885},
    ],
  },
  extraWitholding: {
    label: 'Extra witholding',
    incremental: 1,
    weekly: {
      brackets: [
        {from: 0, to: 724, type: 'fixed', nearest: 1, value: 0},
        {from: 724, to: 1700, type: 'fixed', nearest: 1, value: 3},
        {from: 1700, to: 3500, type: 'fixed', nearest: 1, value: 4},
        {from: 3500, to: 0, type: 'fixed', nearest: 1, value: 9},
      ],
    },
    fortnightly: {
      brackets: [
        {from: 0, to: 1400, type: 'fixed', nearest: 1, value: 0},
        {from: 1400, to: 3400, type: 'fixed', nearest: 1, value: 12},
        {from: 3400, to: 6900, type: 'fixed', nearest: 1, value: 17},
        {from: 6900, to: 0, type: 'fixed', nearest: 1, value: 37},
      ],
    },
  },
};

export const FREQUENCY_DAILY = ['Week', 'Fortnight', 'Month', 'Year'];
export const FREQUENCY_HOURLY = ['Week', 'Fortnight', 'Month', 'Year'];
export const PRORATA_LIMITS = [
  [38, 76],
  [5, 10],
];
export const OVERTIME_TYPE_HOURLY = 'Hourly';
export const payOptions = [
  {
    title: 'Annually',
    type: 'fulltime',
    tipLabel: 'year',
    label: 'Annual',
    default: 60000,
    range: 'a',
  },
  {
    title: 'Monthly',
    type: 'fulltime',
    tipLabel: 'month',
    label: 'Monthly',
    default: 5000,
    range: 'm',
  },
  {
    title: 'Fortnightly',
    type: 'fulltime',
    tipLabel: 'fortnight',
    label: 'Fortnightly',
    default: 1500,
    range: 'f',
  },
  {
    title: 'Weekly',
    type: 'fulltime',
    tipLabel: 'week',
    label: 'Weekly',
    default: 750,
    range: 'w',
  },
  {
    title: 'Daily',
    type: 'daily',
    tipLabel: 'day',
    label: 'Daily',
    casual: true,
    default: 150,
    range: 'w',
  },
  {
    title: 'Hourly',
    type: 'hourly',
    tipLabel: 'hour',
    label: 'Hourly',
    casual: true,
    default: 20,
    range: 'w',
  },
];
