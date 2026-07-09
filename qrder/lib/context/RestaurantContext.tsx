"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

type RestaurantContextValue = {
  restaurantCode: string | null;
  tableCode: string | null;
  setRestaurantInfo: (restaurantCode: string, tableCode?: string) => void;
  clearRestaurantInfo: () => void;
};

const RestaurantContext = createContext<RestaurantContextValue | null>(null);

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const [restaurantCode, setRestaurantCode] = useState<string | null>(null);
  const [tableCode, setTableCode] = useState<string | null>(null);

  const setRestaurantInfo = useCallback(
    (code: string, table?: string) => {
      setRestaurantCode(code);
      if (table) setTableCode(table);
    },
    []
  );

  const clearRestaurantInfo = useCallback(() => {
    setRestaurantCode(null);
    setTableCode(null);
  }, []);

  const value = useMemo(
    () => ({
      restaurantCode,
      tableCode,
      setRestaurantInfo,
      clearRestaurantInfo,
    }),
    [restaurantCode, tableCode, setRestaurantInfo, clearRestaurantInfo]
  );

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within RestaurantProvider");
  }
  return context;
}