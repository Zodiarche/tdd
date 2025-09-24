const Cart = require("../src/cart");

const payload = { id: "1", name: "Item", price: 10 };
const quantity = 2;

test("add() ajoute un article avec quantité", () => {
  const cart = new Cart();
  expect(() => cart.add(payload, quantity)).toThrow(
    "cart.add is not a function"
  ); // Rouge
});
