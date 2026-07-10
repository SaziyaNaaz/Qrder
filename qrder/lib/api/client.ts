"use client";

import type {
  LoginRequest,
  VerifyRequest,
  VerifyResponse,
  UserResponse,
  CompleteProfileRequest,
  CustomerMenuResponse,
  MenuItemSummary,
  CreateOrderRequest,
  OrderResponse,
  OrderListResponse,
  OrderStatus,
  OrderItemResponse,
} from "@/lib/api/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://getqrder.atharvat.in";

class ApiClient {
  private baseUrl: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    if (typeof window !== "undefined") {
      this.accessToken = localStorage.getItem("access_token");
      this.refreshToken = localStorage.getItem("refresh_token");
    }
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
    }
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(this.accessToken ? { Authorization: `Bearer ${this.accessToken}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}/api/v1${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Request failed" }));
      throw new ApiError(response.status, error.message ?? "Request failed", error.errors);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  // Auth endpoints
  async sendOtp(phoneNumber: string) {
    const body: LoginRequest = { phone_number: phoneNumber };
    return this.request<{ success: boolean; message: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async verifyOtp(phoneNumber: string, otp: string): Promise<VerifyResponse> {
    const body: VerifyRequest = { phone_number: phoneNumber, otp };
    const response = await this.request<VerifyResponse>("/auth/verify", {
      method: "POST",
      body: JSON.stringify(body),
    });
    this.setTokens(response.access_token, response.refresh_token);
    return response;
  }

  async logout() {
    this.clearTokens();
  }

  // User endpoints
  async getMe(): Promise<UserResponse> {
    return this.request<UserResponse>("/users/me");
  }

  async completeProfile(fullName: string) {
    const body: CompleteProfileRequest = { full_name: fullName };
    return this.request<UserResponse>("/users/complete-profile", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  // Customer Menu endpoints
  async getMenu(restaurantCode: string): Promise<CustomerMenuResponse> {
    return this.request<CustomerMenuResponse>(`/restaurants/code/${restaurantCode}/menu`);
  }

  async getMenuWithTable(restaurantCode: string, tableCode: string): Promise<CustomerMenuResponse> {
    return this.request<CustomerMenuResponse>(`/restaurants/code/${restaurantCode}/t/${tableCode}/menu`);
  }

  async getMenuItem(restaurantCode: string, menuItemId: string): Promise<MenuItemSummary> {
    return this.request<MenuItemSummary>(`/restaurants/code/${restaurantCode}/menu/${menuItemId}`);
  }

  // Customer Orders endpoints
  async createOrder(data: CreateOrderRequest): Promise<OrderResponse> {
    return this.request<OrderResponse>("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getOrders(params?: {
    status?: OrderStatus | null;
    restaurant_id?: string | null;
    limit?: number;
    offset?: number;
  }): Promise<OrderListResponse> {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set("status", params.status);
    if (params?.restaurant_id) searchParams.set("restaurant_id", params.restaurant_id);
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.offset) searchParams.set("offset", String(params.offset));

    const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
    return this.request<OrderListResponse>(`/orders${query}`);
  }

  async getOrder(orderId: string): Promise<OrderResponse> {
    return this.request<OrderResponse>(`/orders/${orderId}`);
  }

  async cancelOrder(orderId: string): Promise<OrderResponse> {
    return this.request<OrderResponse>(`/orders/${orderId}/cancel`, {
      method: "PATCH",
    });
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: Array<{ field?: string | null; message: string }> | null
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const api = new ApiClient(API_BASE_URL);

export function getApi() {
  return api;
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("access_token");
}

// Type aliases for convenience
export type Order = OrderResponse;
export type OrderItem = OrderItemResponse;