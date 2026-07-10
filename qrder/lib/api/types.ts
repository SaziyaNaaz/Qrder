/**
 * Re-exports commonly used types from the auto-generated OpenAPI types.
 * This provides clean imports like: import type { CreateOrderRequest } from "@/lib/api/types"
 */

import type { components } from "./types.gen";

export type CreateOrderRequest = components["schemas"]["CreateOrderRequest"];
export type OrderItemCreate = components["schemas"]["OrderItemCreate"];
export type OrderResponse = components["schemas"]["OrderResponse"];
export type OrderListResponse = components["schemas"]["OrderListResponse"];
export type OrderStatus = components["schemas"]["OrderStatus"];
export type PaymentStatus = components["schemas"]["PaymentStatus"];
export type OrderItemResponse = components["schemas"]["OrderItemResponse"];

export type LoginRequest = components["schemas"]["LoginRequest"];
export type VerifyRequest = components["schemas"]["VerifyRequest"];
export type VerifyResponse = components["schemas"]["VerifyResponse"];
export type UserResponse = components["schemas"]["UserResponse"];
export type CompleteProfileRequest = components["schemas"]["CompleteProfileRequest"];
export type UpdateProfileRequest = components["schemas"]["UpdateProfileRequest"];

export type CustomerMenuResponse = components["schemas"]["CustomerMenuResponse"];
export type MenuItemSummary = components["schemas"]["MenuItemSummary"];
export type MenuItemResponse = components["schemas"]["MenuItemResponse"];
export type CategoryWithItems = components["schemas"]["CategoryWithItems"];
export type CategoryResponse = components["schemas"]["CategoryResponse"];
export type CategoryCreateRequest = components["schemas"]["CategoryCreateRequest"];
export type CategoryUpdateRequest = components["schemas"]["CategoryUpdateRequest"];

export type RestaurantResponse = components["schemas"]["RestaurantResponse"];
export type RestaurantSummary = components["schemas"]["RestaurantSummary"];
export type RestaurantCreate = components["schemas"]["RestaurantCreate"];
export type RestaurantUpdate = components["schemas"]["RestaurantUpdate"];

export type TableResponse = components["schemas"]["TableResponse"];
export type TableSummary = components["schemas"]["TableSummary"];
export type TableCreateRequest = components["schemas"]["TableCreateRequest"];
export type TableUpdateRequest = components["schemas"]["TableUpdateRequest"];
export type PublicTableResponse = components["schemas"]["PublicTableResponse"];

export type PartnerMeResponse = components["schemas"]["PartnerMeResponse"];
export type StatusHistoryResponse = components["schemas"]["StatusHistoryResponse"];
export type UpdateOrderStatusRequest = components["schemas"]["UpdateOrderStatusRequest"];

export type ErrorResponse = components["schemas"]["ErrorResponse"];
export type ErrorDetail = components["schemas"]["ErrorDetail"];
export type SuccessResponse<T = unknown> = components["schemas"]["SuccessResponse"] & { data?: T | null };

export type PydanticObjectId = components["schemas"]["PydanticObjectId"];
export type UserType = components["schemas"]["UserType"];