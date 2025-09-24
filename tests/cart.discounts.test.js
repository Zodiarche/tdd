const Cart = require("../src/cart");
const { percentOff, fixedOff } = require("../src/discounts");

const item = { id: "SKU1", name: "Item", price: 10 };

describe("Coupons", () => {
  test("Applique 10% de réduction sur 50€", () => {
    const cart = new Cart();
    cart.add(item, 5); // 50€
    const discount = percentOff(0.1); // 10%
    const total = cart.totals([discount]);
    expect(total.discountHT).toBeCloseTo(5);
    expect(total.ttc).toBeCloseTo(54);
  });

  test("Applique 10% de réduction sur 50€ mais expiré donc ignore", () => {
    const cart = new Cart();
    cart.add(item, 5); // 50€
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const discount = percentOff(0.1, { expiresAt: yesterday }); // 10%
    const total = cart.totals([discount]);
    expect(total.discountHT).toBeCloseTo(0);
    expect(total.ttc).toBeCloseTo(60);
  });

  test("Applique 10% de réduction sur 50€ mais minimum requis non atteint donc ignore", () => {
    const cart = new Cart();
    cart.add(item, 5); // 50€
    const discount = percentOff(0.1, { minAmount: 100 }); // 10%
    const total = cart.totals([discount]);
    expect(total.discountHT).toBeCloseTo(0);
    expect(total.ttc).toBeCloseTo(60);
  });

  test("Applique -5€ de réduction sur 10€", () => {
    const cart = new Cart();
    cart.add(item, 1); // 10€
    const discount = fixedOff(5); // -5€
    const total = cart.totals([discount]);
    expect(total.discountHT).toBeCloseTo(5);
    expect(total.ttc).toBeCloseTo(6);
  });

  test("Applique -5€ de réduction sur 10€ mais expiré donc ignore", () => {
    const cart = new Cart();
    cart.add(item, 1);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const discount = fixedOff(5, { expiresAt: yesterday }); // -5€
    const total = cart.totals([discount]);
    expect(total.discountHT).toBeCloseTo(0);
    expect(total.ttc).toBeCloseTo(12);
  });

  test("Applique -5€ de réduction sur 10€ mais minimum requis non atteint donc ignore", () => {
    const cart = new Cart();
    cart.add(item, 1);
    const discount = fixedOff(5, { minAmount: 20 }); // -5€
    const total = cart.totals([discount]);
    expect(total.discountHT).toBeCloseTo(0);
    expect(total.ttc).toBeCloseTo(12);
  });
});
