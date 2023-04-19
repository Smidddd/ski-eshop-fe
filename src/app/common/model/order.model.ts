import {User} from "./user.model";
import {InventoryModel} from "./inventory.model";

enum type {
  "DOBIERKA",
  "ONLINE"
}
export interface Order {
  orderId: number;
  customer_ID: User;
  type: type;
  ordered: boolean;
  orderedProducts: InventoryModel[];
}
