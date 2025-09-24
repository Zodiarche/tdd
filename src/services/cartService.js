const Cart = require("../cart");
const EmailService = require("./emailService");
const InMemoryProductRepo = require("./inMemoryProductRepo");

class CartService {
  /**
   * @param {InMemoryProductRepo} productRepo
   * @param {EmailService} emailService
   */
  constructor(productRepo, emailService) {
    this.productRepo = productRepo;
    this.emailService = emailService;
    this.cart = new Cart();
  }

  add(productId, quantity = 1) {
    const product = this.productRepo.getById(productId);
    if (!product) throw new Error("Produit inconnu");

    if (!this.productRepo.hasStock(productId, quantity))
      throw new Error("Stock insuffisant pour ce produit");

    this.cart.add(
      { id: product.id, name: product.name, price: product.price },
      quantity
    );
  }

  async checkout(email) {
    for (const { product, quantity } of this.cart.items.values()) {
      if (!this.productRepo.hasStock(product.id, quantity))
        throw new Error("Stock insuffisant pour ce produit");
    }

    for (const { product, quantity } of this.cart.items.values()) {
      this.productRepo.decrement(product.id, quantity);
    }

    const order = this._buildOrder();
    await this.emailService.sendOrderConfirmation(email, order);
    this.cart.items.clear();
    return order;
  }

  _buildOrder() {
    const lines = [...this.cart.items.values()].map(
      ({ product, quantity }) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
      })
    );
    const totals = this.cart.totals();
    return { lines, totals, createdAt: new Date().toISOString() };
  }
}
module.exports = CartService;
