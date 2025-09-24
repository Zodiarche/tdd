function percentOff(percentage, { expiresAt, minAmount } = {}) {
  return (amountHT, now = new Date()) => {
    if (expiresAt && now > expiresAt) return 0;
    if (minAmount && amountHT < minAmount) return 0;
    return amountHT * percentage;
  };
}

function fixedOff(euros, { expiresAt, minAmount } = {}) {
  return (amountHT, now = new Date()) => {
    if (expiresAt && now > expiresAt) return 0;
    if (minAmount && amountHT < minAmount) return 0;
    return Math.min(amountHT, euros);
  };
}
module.exports = { percentOff, fixedOff };
