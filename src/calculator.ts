import {taxData as currentTaxData} from './Constants/taxdata.const';
import {
  MedicareExemption,
  MedicareSurcharge,
  PayCycle,
  PayCycleResult,
} from './models';

import {roundToNearestCent} from './util';
//-----------------------------------------------------
// Constants
//-----------------------------------------------------

const week2Year = 52;
const fortnight2Year = 26;
const month2Year = 12;
const week2Month = week2Year / month2Year; //4.33
const week2Fortnight = 2;

//-----------------------------------------------------
// Tax Data
//-----------------------------------------------------
const TaxData = () => {
  return currentTaxData;
};

export class Calculator {
  public getIncome = (income: number, payCycle: PayCycle): PayCycleResult => {
    // capture data in form field
    const result = new PayCycleResult();
    switch (payCycle) {
      case PayCycle.ANNUALLY:
        result.annually = income;
        //derived
        result.monthly = result.annually / month2Year;
        result.fortnightly = result.annually / fortnight2Year;
        result.weekly = result.annually / week2Year;
        break;

      case PayCycle.MONTHLY:
        result.monthly = income;
        //derived
        result.annually = result.monthly * month2Year;
        result.fortnightly = result.annually / fortnight2Year;
        result.weekly = result.annually / week2Year;
        break;
      case PayCycle.FORTNIGHTLY:
        result.fortnightly = income;
        result.weekly = result.fortnightly / week2Fortnight;
        result.monthly = result.weekly * week2Month;
        //derived
        result.annually = result.fortnightly * fortnight2Year;

        break;
      case PayCycle.WEEKLY:
        result.weekly = income;
        result.fortnightly = result.weekly * week2Fortnight;
        result.monthly = result.weekly * week2Month;
        // derived
        result.annually = result.weekly * week2Year;

        break;
      default:
        break;
    }
    return result;
  };
  public calculateSuperannuationGuarantee = (
    income: PayCycleResult
  ): PayCycleResult => {
    const result = new PayCycleResult();
    result.annually = getSuperannuation(income.annually, false);
    result.monthly = result.annually / month2Year;
    result.fortnightly = result.annually / fortnight2Year;
    result.weekly = result.annually / week2Year;

    return result;
  };
  public calculateIncomeTax = (
    income: PayCycleResult,
    isNonResidence: boolean,
    medicareExemption: MedicareExemption
  ): PayCycleResult => {
    const result = new PayCycleResult();
    // determine the correct tax function
    let taxFunction: Function;
    let taxFunctionPAYG: Function;
    if (isNonResidence) {
      taxFunction = getNonResidentTax;
      taxFunctionPAYG = getPAYGNonResidentTax;
    } else {
      taxFunction = getIncomeTax;
      if (medicareExemption === MedicareExemption.FULL) {
        taxFunctionPAYG = getPAYGIncomeTaxFullMedicare;
      } else if (medicareExemption === MedicareExemption.HALF) {
        taxFunctionPAYG = getPAYGIncomeTaxHalfMedicare;
      } else {
        taxFunctionPAYG = getPAYGIncomeTax;
      }
    }

    // calculate tax
    result.annually = Math.round(taxFunction(income.annually));
    result.monthly = taxFunctionPAYG(income.monthly, PayCycle.MONTHLY);
    result.fortnightly = taxFunctionPAYG(
      income.fortnightly,
      PayCycle.FORTNIGHTLY
    );
    result.weekly = taxFunctionPAYG(income.weekly, PayCycle.WEEKLY);

    return result;
  };
  public calculateMedicare = (
    annualTaxableIncome: number,
    spouseIncome: number,
    dependantNo: number,
    isSenior: boolean
  ): PayCycleResult => {
    const result = new PayCycleResult();
    const family = spouseIncome || dependantNo;

    if (family) {
      result.annually = Math.max(
        getMedicareFamily(
          annualTaxableIncome,
          spouseIncome,
          dependantNo,
          isSenior
        ),
        0
      );
    } else {
      result.annually = Math.max(0, getMedicare(annualTaxableIncome, isSenior));
    }

    const medicareBaseline = getMedicare(result.annually);
    result.monthly = medicareBaseline / month2Year;
    result.fortnightly = medicareBaseline / fortnight2Year;
    result.weekly = medicareBaseline / week2Year;

    return result;
  };
  public calculateMedicareSurcharge = (
    totalTaxableIncome: number,
    isFamily: boolean,
    hasPrivateHealthcare: boolean
  ): MedicareSurcharge => {
    const surcharge = isFamily
      ? getMedicareSurchargeFamily(totalTaxableIncome)
      : getMedicareSurchargeSingle(totalTaxableIncome);
    return {
      surcharge,
      surchargeLiability: hasPrivateHealthcare ? 0 : surcharge,
    };
  };
  public calculateOffsets = (annualIncome: number) => {
    const lito = getLITO(annualIncome);
    const lamito = getLAMITO(annualIncome);
    let offset = lito + lamito;
    if (annualIncome - offset < 0) {
      offset = annualIncome;
    }

    return offset;
  };
}

///////////////////////////////////////////
// Superannuation Aux
///////////////////////////////////////////

const getSuperannuation = (taxableIncome: number, subtractive: boolean) => {
  let superannuation = 0;

  if (currentTaxData.superannuation) {
    const superBracket = currentTaxData.superannuation.brackets;
    const inc = currentTaxData.superannuation.incremental;

    superannuation = calculateBracket(
      taxableIncome,
      superBracket,
      inc,
      subtractive,
      0
    );
  } else {
    console.log("No 'superannuation' data");
  }

  return superannuation;
};

///////////////////////////////////////////
// Income Tax Aux
///////////////////////////////////////////

const getIncomeTax = (income: number) => {
  let tax = 0;

  if (TaxData().tax) {
    const bracket = TaxData().tax.brackets;
    const inc = TaxData().tax.incremental;
    tax = calculateBracket(income, bracket, inc);
  } else {
    throw new Error("No 'tax' data");
  }
  return tax;
};

const getPAYGIncomeTax = (income: number, cycle: PayCycle) => {
  const tax = calculatePAYG(income, TaxData().tax.payg, cycle);
  return tax;
};

const getPAYGIncomeTaxHalfMedicare = (income: number, cycle: PayCycle) => {
  const tax = calculatePAYG(income, TaxData().taxMedicareHalf.payg, cycle);
  return tax;
};

const getPAYGIncomeTaxFullMedicare = (income: number, cycle: PayCycle) => {
  const tax = calculatePAYG(income, TaxData().taxMedicareFull.payg, cycle);
  return tax;
};

const getNonResidentTax = (annualIncome: number) => {
  let tax = 0;
  if (TaxData().taxNonResident) {
    const bracket = TaxData().taxNonResident.brackets;
    const inc = TaxData().taxNonResident.incremental;
    tax = calculateBracket(annualIncome, bracket, inc);
  } else {
    console.log("No 'taxNonResident' data");
  }
  return tax;
};

const getPAYGNonResidentTax = (income: number, cycle: PayCycle) => {
  return calculatePAYG(income, TaxData().taxNonResident.payg, cycle);
};
///////////////////////////////////////////
// Medicare Aux
///////////////////////////////////////////
export const getMedicare = (income: number, senior = false) => {
  let medicare = 0;
  let data = undefined;

  if (senior && TaxData().medicareSenior) data = TaxData().medicareSenior;
  if (!senior && TaxData().medicare) data = TaxData().medicare;

  if (!data) {
    console.log(`No 'medicare' data. ${senior ? '(senior)' : ''}`);
    return 0;
  }

  medicare = calculateBracket(
    income,
    data.brackets,
    data.incremental,
    false,
    0
  );

  // nearest cent
  return roundToNearestCent(medicare);
};

// ref: https://www.ato.gov.au/Individuals/myTax/2020/In-detail/medicare-levy-reduction-or-exemption/?anchor=spouse

export const getMedicareFamily = (
  income: number,
  spouseIncome = 0,
  dependantsCount = 0,
  senior = false
) => {
  let medicareData = undefined;
  if (senior && TaxData().medicareSeniorFamily)
    medicareData = TaxData().medicareSeniorFamily;
  if (!senior && TaxData().medicareFamily)
    medicareData = TaxData().medicareFamily;

  let brackets = medicareData?.brackets;
  const dependantsOffset = medicareData?.dependants
    ? dependantsCount * Number(medicareData.dependants)
    : 0;

  if (dependantsOffset > 0) {
    // modify brackets for dependants offset - first clone the brackets then offset from,to

    brackets = medicareData?.brackets.map(obj => {
      const _obj = {...obj};
      const from = _obj.from;
      const to = _obj.to;
      _obj.from = from > 0 ? from + dependantsOffset : 0;
      _obj.to = to > 0 ? to + dependantsOffset : 0;
      return _obj;
    });

    // calculate runout - blend offset 10% rate into 2% rate without a step
    const m1 = brackets![brackets!.length - 1].value / 100;
    const m2 = brackets![brackets!.length - 2].value / 100;
    const runout = m1 * (dependantsOffset / (m2 - m1));

    brackets![brackets!.length - 1].from += runout;
    brackets![brackets!.length - 2].to += runout;
  }

  // const familyIncome = spouseIncome*0.704062 + income;
  const familyIncome = spouseIncome * 0.8 + income;
  const familyIncomeThreshold = spouseIncome + income;
  // if the family income in the top bracket?

  if (familyIncomeThreshold >= brackets![brackets!.length - 1].from) {
    // no family benefit
    return getMedicare(income, senior);
  }

  const baseline = getMedicare(income, senior);
  const reduction = calculateBracket(
    familyIncome,
    brackets,
    medicareData!.incremental,
    false,
    0
  );

  // these numbers get weird when sposeincome -> income
  // limit blow out:

  return Math.min(baseline, reduction);
  // return calculateBracket(familyIncome, brackets, medicareData.incremental, false, 0);
};

const getMedicareSurchargeSingle = (taxableIncome: number) => {
  let medicare_surcharge = 0;
  if (TaxData().medicareSurcharge) {
    const bracket = TaxData().medicareSurcharge.brackets;
    const inc = TaxData().medicareSurcharge.incremental;
    medicare_surcharge = calculateBracket(taxableIncome, bracket, inc, false);
  } else {
    throw new Error("No 'medicareSurcharge' data");
  }
  return medicare_surcharge;
};

const getMedicareSurchargeFamily = (familyIncome: number) => {
  let medicare_surcharge = 0;
  if (TaxData().medicareSurchargeFamily) {
    const bracket = TaxData().medicareSurchargeFamily.brackets;
    const inc = TaxData().medicareSurchargeFamily.incremental;
    medicare_surcharge = calculateBracket(familyIncome, bracket, inc, false);
  } else {
    throw new Error("No 'medicareSurchargeFamily' data");
  }
  return medicare_surcharge;
};

///////////////////////////////////////////
// Offsets (Aux)
///////////////////////////////////////////
const getLITO = (taxableIncome: number) => {
  let offset = 0;

  if (TaxData().lito) {
    const bracket = TaxData().lito.brackets;
    const inc = TaxData().lito.incremental;
    offset = calculateBracket(taxableIncome, bracket, inc, false);

    if (offset < 0) offset = 0;
    if (taxableIncome - offset < 0) {
      offset = 1 * taxableIncome;
    }
  } else {
    throw new Error("No 'lito' data");
  }
  return offset;
};

const getLAMITO = (taxableIncome: number) => {
  let offset = 0;
  if (TaxData().lamito) {
    const bracket = TaxData().lamito.brackets;
    const inc = TaxData().lamito.incremental;
    offset = calculateBracket(taxableIncome, bracket, inc, false);

    if (offset < 0) offset = 0;
    if (taxableIncome - offset < 0) {
      offset = 1 * taxableIncome;
    } // offset cannot be less than incomeTax
    //offset  = offset > 0 ? -1*offset : 0;
  } else {
    throw new Error("No 'lito' data");
  }
  return offset;
};

///////////////////////////////////////////
// PAYG
///////////////////////////////////////////
const calculatePAYG = (income: number, paygBrackets: any, cycle: PayCycle) => {
  let paygIncome;
  switch (cycle) {
    case PayCycle.MONTHLY:
      // eslint-disable-next-line no-case-declarations
      const cents = Math.round(100 * (income - Math.floor(income)));
      if (cents === 33) income += 0.01;
      paygIncome = Math.floor((income * 3) / 13);
      paygIncome += 0.99;
      break;
    case PayCycle.FORTNIGHTLY:
      paygIncome = income / 2;
      paygIncome = Math.floor(paygIncome);
      paygIncome += 0.99;
      break;
    case PayCycle.WEEKLY:
    default:
      paygIncome = Math.floor(income);
      paygIncome += 0.99;
      break;
  }

  let a = 0;
  let b = 0;
  // find bracket
  for (let i = 0; i < paygBrackets.length; i++) {
    if (paygIncome < paygBrackets[i].income || paygBrackets[i].income === 0) {
      a = paygBrackets[i].a;
      b = paygBrackets[i].b;
      break;
    }
  }

  let tax = paygIncome * a - b;
  tax = Math.round(tax);

  //convert back to cycle
  switch (cycle) {
    case PayCycle.MONTHLY:
      tax = (tax * 13) / 3;
      break;
    case PayCycle.FORTNIGHTLY:
      tax = tax * 2;
      break;
    default:
      break;
  }
  return tax;
};

///////////////////////////////////////////
// Bracket calculations
///////////////////////////////////////////

export const getBracket = (v: number, b: any) => {
  if (!v || !b) return false;
  // round to the nearest week
  for (let i = 0; i < b.length; i++) {
    if (v >= b[i].from) {
      if (v < b[i].to || b[i].to === 0) {
        return b[i];
      }
    }
  }
  return b[0];
};

export const calculateBracket = (
  v: number,
  b: any,
  incremental: number,
  subtractive?: boolean,
  cap?: any
) => {
  return calculateBracketWithRounding(
    v,
    b,
    incremental,
    subtractive,
    cap,
    0.01
  );
};

const calculateBracketATORounding = (
  v: number,
  b: any,
  incremental: number,
  subtractive?: boolean,
  cap?: any
) => {
  // round to the nearest week
  return calculateBracketWithRounding(
    v,
    b,
    incremental,
    subtractive,
    cap,
    0.52
  );
};

const calculateBracketWithRounding = (
  v: number,
  b: any,
  incremental: number,
  subtractive?: boolean,
  cap?: any,
  rounding?: number
) => {
  let r = 0;
  let inc = incremental === 1 ? true : false;

  rounding = rounding || 0.01;
  // v for value
  // b for brackets
  for (let i = 0; i < b.length; i++) {
    // for each of the brackets
    const from = Number(b[i].from) || 0;
    const to = Number(b[i].to) || 0;
    const nearest = Number(b[i].nearest) || 1;
    const val = Number(b[i].value) || 0;
    const start = Number(b[i].start) || 0;
    const end = Number(b[i].end) || 0;
    let bracketAmount;
    const type = b[i].type;

    if (b[i].incremental !== undefined) {
      inc =
        b[i].incremental === 1 || b[i].incremental === 'true' ? true : false;
    }

    // trigger on active bracket
    if (v >= from) {
      // part bracket > from and < to, otherwise it is complete bracket
      const partBracket = v <= to || to === 0;

      // calculate the value within this bracket (check cap)
      if (partBracket) {
        bracketAmount = Math.ceil((v - from) / nearest) * nearest;
      } else {
        bracketAmount = Math.ceil((to - from) / nearest) * nearest;
      }

      if (!inc && !partBracket) continue;

      switch (type) {
        case 'fixed':
          r = inc ? r + val : val; // add value of fixed component
          break;

        case 'rate':
          // eslint-disable-next-line no-case-declarations
          let rateValue = start + (bracketAmount * val) / 100;
          if (rateValue > end && val > 0) rateValue = end; // upper limit on improving rate
          if (rateValue < end && val < 0) rateValue = end; // lower limit on decending rate
          r = inc ? r + rateValue : rateValue;
          break;

        case 'percent':
          if (partBracket) {
            // part bracket
            // if the brackets are incremental take the percentage from the individual bracket
            // otherwise take a percentage from the total value
            if (inc) {
              // apply cap - (superannuation)
              if (bracketAmount > cap && cap > 0) bracketAmount = cap;
              // ATO rounding
              // let percentValue = rounding * Math.round((bracketAmount * (val / 100)) / rounding);
              const percentValue = bracketAmount * (val / 100);
              // subtractive? cap?
              r += percentValue;
            } else {
              // take the full amount not just the partial bracket value
              let percentValue =
                rounding * Math.round((v * (val / 100)) / rounding);
              // this is a superannuation option
              if (subtractive) {
                percentValue /= 1 + val / 100;
              }

              // check cap (superannuation)
              if (percentValue > cap && cap > 0) {
                percentValue = cap;
              }

              r = percentValue;
            }
          } else {
            if (inc) {
              if (bracketAmount > cap && cap > 0) bracketAmount = cap;
              const percentValue =
                rounding * Math.round((bracketAmount * (val / 100)) / rounding);

              if (r > cap && cap > 0) r = cap;
              if (subtractive) {
                r /= 1 + val / 100;
              }
              r += percentValue;
            }
          }
          break;
        default:
          break;
      }
    }
  }
  return Math.round(r * 100) / 100;
};
