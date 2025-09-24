class InMemoryProductRepo {
  constructor(seed = []) {
    this.stock = new Map(seed.map((product) => [product.id, { ...product }]));
  }

  getById(id) {
    return this.stock.get(id) || null;
  }

  hasStock(id, quantity) {
    const product = this.getById(id);
    if (!product) throw new Error("Ce produit n'existe pas");

    return product.stock >= quantity;
  }

  decrement(id, quantity) {
    const product = this.getById(id);
    if (!product) throw new Error("Ce produit n'existe pas");
    if (product.stock < quantity)
      throw new Error("Stock insuffisant pour ce produit");
    product.stock -= quantity;
  }
}

module.exports = InMemoryProductRepo;
