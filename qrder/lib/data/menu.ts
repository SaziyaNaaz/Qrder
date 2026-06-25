import type { Dish, MenuCategory } from "@/lib/types/menu";

export const CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "starters", label: "Starters" },
  { id: "mains", label: "Mains" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
];

export const DISHES: Dish[] = [
  {
    id: "truffle-risotto",
    name: "Truffle Risotto",
    price: 420,
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf6db371?w=400&q=80",
    category: "mains",
    isSpecial: true,
    isRecommended: true,
  },
  {
    id: "herb-salmon",
    name: "Herb Crusted Salmon",
    price: 380,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80",
    category: "mains",
    isSpecial: true,
  },
  {
    id: "chocolate-lava",
    name: "Chocolate Lava",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
    category: "desserts",
    isSpecial: true,
  },
  {
    id: "truffle-mushroom-risotto",
    name: "Truffle Mushroom Risotto",
    price: 245,
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf6db371?w=400&q=80",
    category: "mains",
    isRecommended: true,
  },
  {
    id: "butter-garlic-prawns",
    name: "Butter Garlic Prawns",
    price: 240,
    image:
      "https://images.unsplash.com/photo-1565680018434-bcbdef8a0aaa?w=400&q=80",
    category: "starters",
    isRecommended: true,
  },
  {
    id: "pan-seared-sea-bass",
    name: "Pan Seared Sea Bass",
    price: 162,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b2a2?w=400&q=80",
    category: "mains",
    isRecommended: true,
  },
  {
    id: "caesar-salad",
    name: "Caesar Salad",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80",
    category: "starters",
  },
  {
    id: "mango-mocktail",
    name: "Mango Mocktail",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80",
    category: "drinks",
  },
];

export function formatPrice(amount: number): string {
  return `₹${amount}`;
}
