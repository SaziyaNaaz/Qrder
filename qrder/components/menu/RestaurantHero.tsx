import Image from "next/image";
import {
  ASSETS,
  RESTAURANT_NAME,
  RESTAURANT_RATING,
  TABLE_NUMBER,
} from "@/lib/constants";
import type { RestaurantSummary } from "@/lib/api/types";

type RestaurantHeroProps = {
  restaurant?: RestaurantSummary | null;
};

export function RestaurantHero({ restaurant }: RestaurantHeroProps) {
  const name = restaurant?.name ?? RESTAURANT_NAME;
  const tableNumber = restaurant?.address ? "—" : TABLE_NUMBER;

  return (
    <div className="relative h-52 overflow-hidden">
      <Image
        src={ASSETS.restaurantHero}
        alt={name}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 512px) 100vw, 512px"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="font-serif text-3xl font-bold tracking-wide">
          {name}
        </h1>
        <div className="mt-2 flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            {RESTAURANT_RATING}
          </span>
          <span className="rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">
            Table {tableNumber}
          </span>
        </div>
      </div>
    </div>
  );
}