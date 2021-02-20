export const roundToNearestCent = (value: number) => {
  return Math.round(value * 100) / 100;
};
export const roundToNearestDollar = (value: number) => {
  return Math.round(value * 1);
};

export const formatMoney = (
  number: number,
  decPlaces: number,
  decSep: string,
  thouSep: string
) => {
  decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces;
  decSep = typeof decSep === 'undefined' ? '.' : decSep;
  thouSep = typeof thouSep === 'undefined' ? ',' : thouSep;
  const sign = number < 0 ? '-' : '';
  const i = String(
    parseInt(
      (number = +Math.abs(Number(number) || 0).toFixed(decPlaces)).toString()
    )
  );
  const j = i.length > 3 ? i.length - 3 : 0;

  let str = sign;
  str += j ? i.substr(0, j) + thouSep : '';
  str += i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, '$1' + thouSep);
  str += decPlaces
    ? decSep +
      Math.abs(number - +i)
        .toFixed(decPlaces)
        .slice(2)
    : '';

  return str;
};
