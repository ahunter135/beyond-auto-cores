export const currencyFormat = (value: number) => {
  const rounded = Math.round(value);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(rounded);
};

export const fullnessPrice = (fullness: number, fullPrice: number) => {
  const percent = fullness / 100;
  return parseFloat((fullPrice * percent).toFixed(0));
};
