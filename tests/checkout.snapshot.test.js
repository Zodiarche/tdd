const InMemoryProductRepo = require("../src/services/inMemoryProductRepo");
const CartService = require("../src/services/cartService");

const seed = [{ id: "SKU1", name: "Item", price: 10, stock: 3 }];
const client = { email: "jhondoe@email.com" };

test("Snapshot de la commande", async () => {
  const repo = new InMemoryProductRepo(seed);
  const email = { sendOrderConfirmation: jest.fn().mockResolvedValue() };
  const service = new CartService(repo, email);

  service.add("SKU1", 2);
  const order = await service.checkout(client.email);
  // Normalise la date pour snapshot stable
  order.createdAt = "2025-01-01T00:00:00.000Z";
  expect(order).toMatchSnapshot();
});
