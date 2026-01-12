import type {Product} from "./Product.ts";

export default class Cart {
  private items: Set<Product> = new Set();

  addItem(product: Product): void {
    this.items.add(product);
  }

  removeItem(product: Product): void {
    this.items.delete(product)
  }

  getTotalPrice(): number {
    let total = 0
    this.items.forEach(item => {
      total += item.price;
    });
    return total;
  }

  getCount(): number {
    return this.items.size;
  }
}