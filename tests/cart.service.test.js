const InMemoryProductRepo = require("../src/services/inMemoryProductRepo");
const CartService = require("../src/services/cartService");

const seed = [{ id: "SKU1", name: "Item", price: 10, stock: 3 }];
const client = { email: "jhondoe@email.com" };

describe("CartService", () => {
  test("add: Produit inconnu", () => {
    const repo = new InMemoryProductRepo(seed);
    const service = new CartService(repo, { sendOrderConfirmation: jest.fn() });
    expect(() => service.add("UNKNOWN", 1)).toThrow("Produit inconnu");
  });

  test("add: Stock insuffisant", () => {
    const repo = new InMemoryProductRepo(seed);
    const service = new CartService(repo, { sendOrderConfirmation: jest.fn() });
    expect(() => service.add("SKU1", 5)).toThrow("Stock insuffisant");
  });

  test("add: Ajoute un article au panier", () => {
    const repo = new InMemoryProductRepo(seed);
    const email = { sendOrderConfirmation: jest.fn().mockResolvedValue() };
    const service = new CartService(repo, email);
    service.add("SKU1", 1);
    expect(service.cart.items.size).toBe(1);
  });

  test("checkout: Stock insuffisant", async () => {
    const repo = new InMemoryProductRepo(seed);
    const email = { sendOrderConfirmation: jest.fn().mockResolvedValue() };
    const service = new CartService(repo, email);

    service.add("SKU1", 2);
    repo.decrement("SKU1", 2);
    await expect(service.checkout(client.email)).rejects.toThrow(
      "Stock insuffisant"
    );
  });

  test("checkout: Passage de la commande", async () => {
    const repo = new InMemoryProductRepo(seed);
    const email = { sendOrderConfirmation: jest.fn().mockResolvedValue() };
    const service = new CartService(repo, email);

    service.add("SKU1", 2);
    const order = await service.checkout(client.email);

    expect(order.lines[0]).toMatchObject({ id: "SKU1", quantity: 2 });
    expect(repo.getById("SKU1").stock).toBe(1);
    expect(email.sendOrderConfirmation).toHaveBeenCalledTimes(1);
    expect(service.cart.items.size).toBe(0);
  });

  test("hasStock: Stock insuffisant", () => {
    const repo = new InMemoryProductRepo(seed);

    expect(repo.hasStock("SKU1", 2)).toBe(true);
    expect(repo.hasStock("SKU1", 3)).toBe(true);
    expect(repo.hasStock("SKU1", 4)).toBe(false);
  });

  test("hasStock: Produit inconnu", () => {
    const repo = new InMemoryProductRepo(seed);
    expect(() => repo.hasStock("UNKNOWN", 1)).toThrow("Produit invalide");
  });

  test("decrement: Stock insuffisant", () => {
    const repo = new InMemoryProductRepo(seed);
    expect(() => repo.decrement("SKU1", 5)).toThrow("Stock insuffisant");
  });

  test("decrement: Produit invalide", () => {
    const repo = new InMemoryProductRepo(seed);
    expect(() => repo.decrement("UNKNOWN", 1)).toThrow("Produit invalide");
  });

  test("decrement: Produit connu et stock suffisant", () => {
    const repo = new InMemoryProductRepo(seed);
    repo.decrement("SKU1", 2);
    expect(repo.getById("SKU1").stock).toBe(1);
  });
});
