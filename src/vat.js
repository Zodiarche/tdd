const FR_STANDARD_VAT = 0.2;

function computeVAT(amountHT) {
  const vat = amountHT * FR_STANDARD_VAT;
  const ttc = amountHT + vat;
  return { ht: amountHT, vat, ttc, FR_STANDARD_VAT };
}

module.exports = { computeVAT, FR_STANDARD_VAT };
