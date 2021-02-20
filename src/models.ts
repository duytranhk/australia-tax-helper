export interface IncomeTaxRate {
  amount: number;
  rate: number;
  requiredAmount: number;
}
export interface LitoOffsetRate {
  amount: number;
  defaultOffset: number;
  offsetRate: number;
  incomeThreadShot: number;
}

export interface YearlyResidenceTaxRates {
  years: TaxYears;
  rates: IncomeTaxRate[];
  offsetRates: LitoOffsetRate[];
}

export enum TaxYears {
  From2020To2021 = '2020_2021',
}

export class IncomeTaxResult {
  public IncomeTax: number;
  public Medicare: number;
  public Offset: number;
  constructor(i: number, m: number, o: number) {
    this.IncomeTax = i;
    this.Medicare = m;
    this.Offset = o;
  }
}
