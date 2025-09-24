const Cart = require("../src/cart");

const item = { id: "SKU2", name: "Objet", price: 20 };

describe("Cart.updateQuantity", () => {
  test("Mettre à jour la quantité", () => {
    const cart = new Cart();
    cart.add(item, 1);
    cart.updateQuantity(item.id, 4);
    expect(cart.items.get(item.id).quantity).toBe(4);
  });

  test("Supprime l'article si quantité <= 0", () => {
    const cart = new Cart();
    cart.add(item, 2);
    cart.updateQuantity(item.id, 0);
    expect(cart.items.has(item.id)).toBe(false);
  });

  test("Supprime l'article explicitement", () => {
    const cart = new Cart();
    cart.add(item, 2);
    cart.remove(item.id);
    expect(cart.items.size).toBe(0);
  });
});
