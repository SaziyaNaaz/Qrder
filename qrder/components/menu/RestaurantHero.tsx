import Image from "next/image";
import {
  ASSETS,
  RESTAURANT_NAME,
  RESTAURANT_RATING,
  TABLE_NUMBER,
} from "@/lib/constants";

export function RestaurantHero() {
  return (
    <div className="relative h-52 overflow-hidden">
      <Image
        src={ASSETS.restaurantHero}
        alt={RESTAURANT_NAME}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 512px) 100vw, 512px"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="font-serif text-3xl font-bold tracking-wide">
          {RESTAURANT_NAME}
        </h1>
        <div className="mt-2 flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            {RESTAURANT_RATING}
          </span>
          <span className="rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">
            Table {TABLE_NUMBER}
          </span>
        </div>
      </div>
    </div>
  );
}
