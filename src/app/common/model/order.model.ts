import {User} from "./user.model";
import {InventoryModel} from "./inventory.model";
import {Timestamp} from "rxjs";

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
  date: Number;
}
