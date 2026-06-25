export type MenuCategory = "all" | "starters" | "mains" | "desserts" | "drinks";

export type Dish = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Exclude<MenuCategory, "all">;
  isSpecial?: boolean;
  isRecommended?: boolean;
};

export type CartLine = {
  dish: Dish;
  quantity: number;
};
