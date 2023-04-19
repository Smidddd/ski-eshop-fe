import {Product} from "./product.model";

export interface InventoryModel {
  id: number;
  produkt_id: Product;
  size: number;
  available: boolean;
}
