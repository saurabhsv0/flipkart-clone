export const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
export const off = (price, mrp) => Math.round(((mrp - price) / mrp) * 100);
