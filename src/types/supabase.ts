export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          sku: string;
          item_name: string;
          category: string;
          default_unit_price: number;
          initial_stock_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          sku: string;
          item_name: string;
          category: string;
          default_unit_price: number;
          initial_stock_count: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          sku?: string;
          item_name?: string;
          category?: string;
          default_unit_price?: number;
          initial_stock_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      item_recording_log: {
        Row: {
          id: string;
          sku: string;
          date_time: string;
          transaction_type: "Sale" | "Return" | "Inventory Count";
          quantity: number;
          actual_unit_price: number;
          payment_method: string | null;
          vendor_location: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          sku: string;
          date_time: string;
          transaction_type: "Sale" | "Return" | "Inventory Count";
          quantity: number;
          actual_unit_price: number;
          payment_method?: string | null;
          vendor_location?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          sku?: string;
          date_time?: string;
          transaction_type?: "Sale" | "Return" | "Inventory Count";
          quantity?: number;
          actual_unit_price?: number;
          payment_method?: string | null;
          vendor_location?: string | null;
          created_at?: string;
        };
      };
      current_inventory: {
        Row: {
          sku: string;
          item_name: string;
          category: string;
          current_stock: number;
          current_inventory_value: number;
          last_updated: string;
        };
        Insert: {
          sku: string;
          item_name: string;
          category: string;
          current_stock: number;
          current_inventory_value: number;
          last_updated?: string;
        };
        Update: {
          sku?: string;
          item_name?: string;
          category?: string;
          current_stock?: number;
          current_inventory_value?: number;
          last_updated?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
