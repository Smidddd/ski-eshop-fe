import {Product} from "./product.model";

export interface InventoryModel {
  id: number;
  productId: Product;
  size: number;
  available: boolean;
}
