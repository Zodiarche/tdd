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

  _scheduleRecalc() {}
}
module.exports = Cart;
