class Cart {
  constructor() {
    this.items = new Map();
    this.coupons = [];
    this._totalCache = null;
    this._debounceTimer = null;
  }

  add(product, quantity = 1) {
    if (!product?.id) throw new Error("Product id required");
    if (!Number.isInteger(quantity) || quantity <= 0)
      throw new Error("Quantity invalid");

    const key = product.id;
    const current = this.items.get(key);
    const nextQuantity = (current?.quantity || 0) + quantity;
    this.items.set(key, { product, quantity: nextQuantity });
    this._scheduleRecalc();
  }

  updateQuantity(productId, quantity) {
    if (!this.items.has(productId)) throw new Error("Product id unknown");
    if (!Number.isInteger(quantity)) throw new Error("Quantity invalid");
    if (quantity <= 0) return this.items.delete(productId);

    const { product } = this.items.get(productId);
    this.items.set(productId, { product, quantity });
    this._scheduleRecalc();
  }

  remove(productId) {
    this.items.delete(productId);
    this._scheduleRecalc();
  }

  _scheduleRecalc() {}
}
module.exports = Cart;
