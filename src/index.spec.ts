import {AustralianTaxHelper} from '.';
import {TaxYears} from './models';
describe('Australia Tax Helper Test', () => {
  describe('CalculateIncomeTax: 2020 to 2021', () => {
    const taxYear = TaxYears.From2020To2021;
    it('Income 1 - Residence', () => {
      const result = AustralianTaxHelper.CalculateIncomeTax(1, taxYear);
      expect(result).toEqual(0);
    });
    it('Income 2 - Residence', () => {
      const result = AustralianTaxHelper.CalculateIncomeTax(35053.2, taxYear);
      expect(result).toEqual(3201.73);
    });
    fit('Income 3 - Residence', () => {
      const result = AustralianTaxHelper.CalculateIncomeTax(100000, taxYear);
      expect(result).toEqual(24187);
    });
  });
});
