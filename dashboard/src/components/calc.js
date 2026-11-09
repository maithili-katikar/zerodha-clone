export const calcHoldingsSummary = (holdings) => {
  let investment = 0;
  let currentValue = 0;

  holdings.forEach((h) => {
    investment += h.avg * h.qty;
    currentValue += h.price * h.qty;
  });

  const pnl = currentValue - investment;
  const pnlPercent = investment > 0 ? (pnl / investment) * 100 : 0;

  return { investment, currentValue, pnl, pnlPercent };
};

export const formatMoney = (n) =>
  Number(n).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });