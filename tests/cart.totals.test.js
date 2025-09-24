const Cart = require("../src/cart");
const { computeVAT } = require("../src/vat");

const item1 = { id: "SKU1", name: "Item", price: 10 };
const item2 = { id: "SKU2", name: "Objet", price: 20 };

describe("Cart.totals", () => {
  test("Somme HT et TVA", () => {
    const cart = new Cart();
    cart.add(item1, 2); // 20 HT
    cart.add(item2, 3); // 60 HT
    const total = cart.totals();
    expect(total.subtotalHT).toBeCloseTo(80);
    expect(total.vat).toBeCloseTo(16);
    expect(total.ttc).toBeCloseTo(96);
  });
});

describe("computeVAT", () => {
  test("Calculs cohérents", () => {
    const { ht, vat, ttc } = computeVAT(100);
    expect(ht).toBeCloseTo(100);
    expect(vat).toBeCloseTo(20);
    expect(ttc).toBeCloseTo(120);
  });
});
