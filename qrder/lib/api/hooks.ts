"use client";

import useSWR, { mutate, SWRConfiguration } from "swr";
import { api, type OrderResponse, type OrderListResponse, type CustomerMenuResponse } from "@/lib/api/client";

const fetcher = <T>(key: string): Promise<T> => {
  const [method, endpoint] = key.split("::");

  switch (method) {
    case "GET_MENU":
      return api.getMenu(endpoint);
    case "GET_MENU_WITH_TABLE":
      const [restaurantCode, tableCode] = endpoint.split("::");
      return api.getMenuWithTable(restaurantCode, tableCode);
    case "GET_ORDERS":
      return api.getOrders();
    case "GET_ORDER":
      return api.getOrder(endpoint);
    default:
      return Promise.reject(new Error(`Unknown SWR key: ${key}`));
  }
};

export function useMenu(
  restaurantCode: string,
  config?: SWRConfiguration<CustomerMenuResponse>
) {
  return useSWR<CustomerMenuResponse>(
    `GET_MENU::${restaurantCode}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30_000,
      ...config,
    }
  );
}

export function useMenuWithTable(
  restaurantCode: string,
  tableCode: string,
  config?: SWRConfiguration<CustomerMenuResponse>
) {
  return useSWR<CustomerMenuResponse>(
    `GET_MENU_WITH_TABLE::${restaurantCode}::${tableCode}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30_000,
      ...config,
    }
  );
}

export function useOrders(config?: SWRConfiguration<OrderListResponse>) {
  return useSWR<OrderListResponse>("GET_ORDERS::/api/v1/orders", fetcher, {
    revalidateOnFocus: false,
    ...config,
  });
}

export function useOrder(id: string, config?: SWRConfiguration<OrderResponse>) {
  return useSWR<OrderResponse>(`GET_ORDER::/api/v1/orders/${id}`, fetcher, {
    revalidateOnFocus: false,
    ...config,
  });
}

// Helper to manually revalidate
export async function revalidateMenu(restaurantCode: string) {
  await mutate(`GET_MENU::${restaurantCode}`);
}

export async function revalidateOrders() {
  await mutate("GET_ORDERS::/api/v1/orders");
}