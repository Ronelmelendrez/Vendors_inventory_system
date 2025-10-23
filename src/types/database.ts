import { Database } from "./supabase";

export type ItemRecordingLog =
  Database["public"]["Tables"]["item_recording_log"]["Row"];
export type ItemRecordingLogInsert =
  Database["public"]["Tables"]["item_recording_log"]["Insert"];
export type ItemRecordingLogUpdate =
  Database["public"]["Tables"]["item_recording_log"]["Update"];

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export type CurrentInventory =
  Database["public"]["Tables"]["current_inventory"]["Row"];
export type CurrentInventoryInsert =
  Database["public"]["Tables"]["current_inventory"]["Insert"];
export type CurrentInventoryUpdate =
  Database["public"]["Tables"]["current_inventory"]["Update"];
