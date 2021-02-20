import _ = require('lodash');
import {LibConstants} from './Constants/lib.const';
import {
  TaxYears,
  IncomeTaxResult,
  YearlyResidenceTaxRates,
  IncomeTaxRate,
  LitoOffsetRate,
} from './models';

export class AustralianTaxHelper {
  /**
   *
   * @param annualIncome Gross income per year
   * @param year Each financial year has different tax rates
   * @param isForeignResidence Australian residence and foreigner have different tax rates
   */

  public static CalculateIncomeTax(
    annualIncome: number,
    year: TaxYears,
    isForeignResidence = false
  ): IncomeTaxResult {
    if (isForeignResidence) return new IncomeTaxResult(0, 0, 0); // TODO

    const yearRates = _.find(
      LibConstants.YearlyResidenceTaxRates,
      c => c.years === year
    );

    if (!yearRates) return new IncomeTaxResult(0, 0, 0);

    const incomeTax = AustralianTaxHelper.GetIncomeTax(
      annualIncome,
      yearRates.rates
    );

    const lito = AustralianTaxHelper.GetLito(
      annualIncome,
      yearRates.offsetRates
    );

    return new IncomeTaxResult(incomeTax, 0, lito);
  }

  private static GetIncomeTax(
    annualIncome: number,
    rates: IncomeTaxRate[]
  ): number {
    const incomeRate = _.last(_.filter(rates, r => annualIncome >= r.amount));
    return !incomeRate
      ? 0
      : incomeRate.requiredAmount +
          incomeRate.rate * (annualIncome - incomeRate.amount - 1);
  }

  private static GetLito(
    annualIncome: number,
    rates: LitoOffsetRate[]
  ): number {
    const litoRate = _.first(
      _.filter(rates, r => annualIncome <= r.incomeThreadShot)
    );
    return !litoRate
      ? 0
      : litoRate.defaultOffset -
          (annualIncome - litoRate.amount) * litoRate.offsetRate;
  }
}
