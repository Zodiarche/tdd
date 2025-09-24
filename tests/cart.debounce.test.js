const Cart = require("../src/cart");
jest.useFakeTimers();

const item1 = { id: "SKU1", name: "Item", price: 10 };
const item2 = { id: "SKU2", name: "Objet", price: 20 };

test("Recalcul debouncé à 200ms", () => {
  const cart = new Cart();
  const spy = jest.spyOn(cart, "_recalculate");

  cart.add(item1, 1);
  cart.add(item2, 1);
  cart.updateQuantity("SKU1", 3);

  expect(spy).not.toHaveBeenCalled();
  jest.advanceTimersByTime(199);
  expect(spy).not.toHaveBeenCalled();
  jest.advanceTimersByTime(1);
  expect(spy).toHaveBeenCalledTimes(1);
});
