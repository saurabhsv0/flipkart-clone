export const categories = [
  { name: 'Mobiles', icon: '📱' },
  { name: 'Electronics', icon: '🎧' },
  { name: 'Fashion', icon: '👕' },
  { name: 'Home', icon: '🛋️' },
  { name: 'Appliances', icon: '🧊' },
  { name: 'Beauty', icon: '💄' },
  { name: 'Toys', icon: '🧸' },
  { name: 'Grocery', icon: '🛒' },
];

// [category, brand, title, price, mrp, rating, reviews, highlights[]]
const raw = [
  ['Mobiles', 'Samsung', 'Galaxy M35 5G (Moonlight Blue, 128 GB)', 18999, 24999, 4.3, 41234, ['6 GB RAM | 128 GB ROM', '6.6 inch FHD+ sAMOLED display', '50MP triple rear camera | 13MP front', '6000 mAh battery']],
  ['Mobiles', 'Redmi', 'Note 13 Pro 5G (Arctic White, 256 GB)', 23999, 29999, 4.4, 28910, ['8 GB RAM | 256 GB ROM', '6.67 inch 120Hz AMOLED display', '200MP OIS camera', '5100 mAh battery']],
  ['Mobiles', 'realme', 'Narzo 70x 5G (Forest Green, 128 GB)', 11499, 15999, 4.2, 19876, ['6 GB RAM | 128 GB ROM', '6.72 inch 120Hz display', '50MP AI camera', '5000 mAh battery']],
  ['Mobiles', 'POCO', 'X6 Neo 5G (Astral Black, 128 GB)', 14999, 19999, 4.3, 33012, ['8 GB RAM | 128 GB ROM', '6.67 inch 120Hz AMOLED', '108MP camera', '5000 mAh battery']],
  ['Electronics', 'boAt', 'Rockerz 450 Bluetooth Headphones', 1299, 3990, 4.1, 212004, ['15 hours playback', '40mm dynamic drivers', 'Bluetooth 5.0', 'Padded ear cushions']],
  ['Electronics', 'Noise', 'ColorFit Pro 5 Smartwatch (1.85" Display)', 2499, 7999, 4.0, 18730, ['1.85 inch AMOLED display', 'Bluetooth calling', '7-day battery', 'Heart rate and SpO2']],
  ['Electronics', 'HP', '15s Laptop (Ryzen 5, 16 GB, 512 GB SSD)', 42990, 58990, 4.2, 7421, ['AMD Ryzen 5 5500U', '16 GB DDR4 RAM | 512 GB SSD', '15.6 inch FHD display', 'Windows 11 | Office 2021']],
  ['Electronics', 'Sony', 'WH-CH520 Wireless On-Ear Headphones', 3990, 5990, 4.3, 15632, ['50 hours battery life', 'Multipoint connection', 'DSEE sound enhancement', 'Voice assistant support']],
  ['Fashion', 'Allen Solly', 'Men Regular Fit Solid Spread Collar Casual Shirt', 899, 1999, 4.1, 5120, ['100% cotton', 'Regular fit', 'Full sleeve', 'Machine wash']],
  ['Fashion', 'Puma', 'Men Running Shoes (Black, Size 9)', 1799, 5999, 4.2, 22330, ['Lightweight mesh upper', 'Cushioned insole', 'Rubber outsole', 'Lace-up closure']],
  ['Fashion', "Levi's", 'Men Slim Fit Mid Rise Blue Jeans', 1599, 3299, 4.3, 31200, ['Stretch denim', 'Slim fit', 'Mid rise', 'Five-pocket styling']],
  ['Fashion', 'Libas', 'Women Printed Anarkali Kurta', 749, 2199, 4.0, 8412, ['Rayon fabric', 'Round neck', 'Three-quarter sleeves', 'Calf-length']],
  ['Home', 'Wakefit', 'Orthopedic Memory Foam Mattress (Queen, 6 inch)', 8999, 19999, 4.4, 54310, ['Queen size', '6 inch thickness', '10-year warranty', 'Medium firm']],
  ['Home', 'Solimo', 'Microfiber Double Bedsheet with 2 Pillow Covers', 449, 1299, 4.0, 40871, ['Microfiber', '144 TC', 'Machine washable', 'Fits up to 8 inch mattress']],
  ['Home', 'Pigeon', 'Stainless Steel Pressure Cooker 5 L', 1149, 1895, 4.2, 66120, ['5 litre capacity', 'Induction base', 'Outer lid', '2-year warranty']],
  ['Appliances', 'LG', '7 kg 5 Star Fully Automatic Top Load Washing Machine', 25990, 33990, 4.4, 11200, ['7 kg capacity', 'Smart inverter motor', '5 star rating', '2 year warranty']],
  ['Appliances', 'Samsung', '236 L 3 Star Frost Free Double Door Refrigerator', 24490, 31990, 4.3, 9870, ['236 litre capacity', 'Digital inverter', '3 star rating', '1 year warranty']],
  ['Appliances', 'Havells', '1200 mm Ceiling Fan (Pack of 1)', 2199, 3150, 4.2, 14022, ['1200 mm sweep', '5 star rated', 'Aerodynamic blades', '2 year warranty']],
  ['Beauty', 'Maybelline', 'Colossal Kajal, Super Black', 189, 299, 4.3, 120344, ['Smudge proof', '12 hour wear', 'Intense black', 'Ophthalmologically tested']],
  ['Beauty', 'Philips', 'Beard Trimmer BT1232 (Cordless)', 1049, 1495, 4.2, 88120, ['10 length settings', '60 min run time', 'Self-sharpening blades', '2 year warranty']],
  ['Toys', 'LEGO', 'Classic Creative Bricks Building Set (484 pcs)', 2799, 3499, 4.7, 6320, ['484 pieces', 'Ages 4+', 'Encourages creativity', 'Storage box included']],
  ['Toys', 'Hot Wheels', 'Track Builder Stunt Set with Car', 1299, 1999, 4.3, 3412, ['Ages 6+', 'Connectable tracks', '1 car included', 'Battery free']],
  ['Grocery', 'Aashirvaad', 'Shudh Chakki Atta 10 kg', 459, 560, 4.4, 150221, ['10 kg pack', '100% whole wheat', 'No maida', 'Soft rotis']],
  ['Grocery', 'Tata Tea', 'Gold Leaf Tea 1 kg', 569, 700, 4.5, 98760, ['1 kg pack', 'Rich aroma', 'Blend of Assam teas', 'Resealable pouch']],
];

export const products = raw.map(([category, brand, title, price, mrp, rating, reviews, highlights], i) => ({
  id: i + 1,
  category,
  brand,
  title,
  price,
  mrp,
  rating,
  reviews,
  highlights,
  image: `https://picsum.photos/seed/fk${i + 1}/500/500`,
  assured: i % 3 !== 1,
  description: `${title} from ${brand}. Built for everyday use with dependable quality, backed by a seller warranty and easy 7-day replacement.`,
}));

export const banners = [
  { title: 'Big Savings on Mobiles', sub: 'Up to 40% off on top 5G phones', category: 'Mobiles', bg: 'from-[#2874f0] to-[#5b9bff]' },
  { title: 'Electronics Fest', sub: 'Headphones, watches and laptops from ₹1,299', category: 'Electronics', bg: 'from-[#7b2ff7] to-[#f107a3]' },
  { title: 'Fashion Refresh', sub: 'Min. 50% off on top brands', category: 'Fashion', bg: 'from-[#f7971e] to-[#ffd200]' },
  { title: 'Home Makeover', sub: 'Mattresses, cookware and more', category: 'Home', bg: 'from-[#11998e] to-[#38ef7d]' },
];
