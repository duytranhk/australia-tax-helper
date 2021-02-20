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
export enum MedicareExemption {
  NONE = 0,
  FULL = 1,
  HALF = 2,
}

export enum PayCycle {
  WEEKLY = 'weekly',
  FORTNIGHTLY = 'fortnightly',
  MONTHLY = 'monthly',
  ANNUALLY = 'annually',
}

export interface MedicareSurcharge {
  surcharge: number;
  surchargeLiability: number;
}
export class PayCycleResult {
  weekly: number;
  fortnightly: number;
  monthly: number;
  annually: number;
  constructor() {
    this.weekly = 0;
    this.fortnightly = 0;
    this.monthly = 0;
    this.annually = 0;
  }
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
