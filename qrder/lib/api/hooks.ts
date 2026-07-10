"use client";

import useSWR, { mutate, SWRConfiguration } from "swr";
import { api, type OrderResponse, type OrderListResponse, type CustomerMenuResponse, type OrderItemResponse } from "@/lib/api/client";

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

// Transform API order items to component format
function transformOrderItem(item: OrderItemResponse) {
  return {
    dish: {
      name: item.name,
    },
    price: parseFloat(item.price),
    quantity: item.quantity,
    itemNote: item.item_note,
  };
}

// Transform API order to component format
function transformOrder(order: OrderResponse) {
  return {
    id: order.id,
    orderNumber: order.order_number,
    status: order.status,
    items: order.items.map(transformOrderItem),
    subtotal: parseFloat(order.subtotal),
    tax: parseFloat(order.tax_total),
    total: parseFloat(order.total_amount),
    specialInstructions: order.customer_note,
    tableNumber: order.table_id ?? "Unknown",
    createdAt: order.created_at,
  };
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

// Type exports for components
export type TransformedOrder = ReturnType<typeof transformOrder>;
export type TransformedOrderItem = ReturnType<typeof transformOrderItem>;
export { transformOrder, transformOrderItem };