class InMemoryProductRepo {
  constructor(seed = []) {
    this.stock = new Map(seed.map((product) => [product.id, { ...product }]));
  }

  getById(id) {
    return this.stock.get(id) || null;
  }

  hasStock(id, quantity) {
    const product = this.getById(id);
    if (!product) throw new Error("Produit invalide");

    return product.stock >= quantity;
  }

  decrement(id, quantity) {
    const product = this.getById(id);
    if (!product) throw new Error("Produit invalide");
    if (product.stock < quantity) throw new Error("Stock insuffisant");
    product.stock -= quantity;
  }
}

module.exports = InMemoryProductRepo;
