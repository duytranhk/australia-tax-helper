import {TaxYears, YearlyResidenceTaxRates} from '../models';

export class LibConstants {
  public static YearlyResidenceTaxRates: YearlyResidenceTaxRates[] = [
    {
      years: TaxYears.From2020To2021,
      rates: [
        {
          amount: 0,
          rate: 0,
          requiredAmount: 0,
        },
        {
          amount: 18201,
          rate: 0.19,
          requiredAmount: 0,
        },
        {
          amount: 45001,
          rate: 0.325,
          requiredAmount: 5092,
        },
        {
          amount: 120001,
          rate: 0.37,
          requiredAmount: 29467,
        },
        {
          amount: 180001,
          rate: 0.45,
          requiredAmount: 51667,
        },
      ],
      offsetRates: [
        {
          incomeThreadShot: 37500,
          defaultOffset: 700,
          offsetRate: 0,
          amount: 0,
        },
        {
          incomeThreadShot: 45000,
          defaultOffset: 700,
          offsetRate: 0.05,
          amount: 37500,
        },
        {
          incomeThreadShot: 66667,
          defaultOffset: 700,
          offsetRate: 0.15,
          amount: 45000,
        },
      ],
    },
  ];
}
