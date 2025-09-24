const Cart = require("../src/cart");

const item = { id: "SKU1", name: "Item", price: 10 };

describe("Cart.add", () => {
  test("Produit invalide", () => {
    const cart = new Cart();
    expect(() => cart.add({}, 1)).toThrow("Produit invalide");
  });

  test("Quantité invalide", () => {
    const cart = new Cart();
    expect(() => cart.add(item, 0)).toThrow("Quantité invalide");
  });

  test("Ajouter un article", () => {
    const cart = new Cart();
    cart.add(item, 2);
    expect(cart.items.size).toBe(1);
    expect(cart.items.get("SKU1")).toEqual({
      product: item,
      quantity: 2,
    });
  });

  test("Cumuler un article", () => {
    const cart = new Cart();
    cart.add(item, 1);
    cart.add(item, 3);
    expect(cart.items.get("SKU1").quantity).toBe(4);
  });
});
