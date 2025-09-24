const Cart = require("../src/cart");

const item = { id: "SKU2", name: "Objet", price: 20 };

describe("Cart.updateQuantity", () => {
  test("Produit invalide", () => {
    const cart = new Cart();
    expect(() => cart.updateQuantity({}, 1)).toThrow("Produit invalide");
  });

  test("Quantité invalide", () => {
    const cart = new Cart();
    cart.add(item, 1);
    expect(() => cart.updateQuantity(item.id, "1")).toThrow(
      "Quantité invalide"
    );
  });

  test("Mettre à jour un article", () => {
    const cart = new Cart();
    cart.add(item, 1);
    cart.updateQuantity(item.id, 4);
    expect(cart.items.get(item.id).quantity).toBe(4);
  });

  test("Supprime un article si la quantité <= 0", () => {
    const cart = new Cart();
    cart.add(item, 2);
    cart.updateQuantity(item.id, 0);
    expect(cart.items.has(item.id)).toBe(false);
  });

  test("Supprime un article", () => {
    const cart = new Cart();
    cart.add(item, 2);
    cart.remove(item.id);
    expect(cart.items.size).toBe(0);
  });
});
