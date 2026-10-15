import { products } from '../data/products';

export const detailedItems = (items) =>
  items.map((i) => ({ ...i, product: products.find((p) => p.id === i.id) })).filter((i) => i.product);

export function summarize(items) {
  const rows = detailedItems(items);
  const mrpTotal = rows.reduce((s, r) => s + r.product.mrp * r.qty, 0);
  const price = rows.reduce((s, r) => s + r.product.price * r.qty, 0);
  const delivery = price === 0 || price >= 500 ? 0 : 40;
  return { rows, count: rows.reduce((s, r) => s + r.qty, 0), mrpTotal, price, discount: mrpTotal - price, delivery, total: price + delivery };
}
