import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
import {InventoryModel} from "../model/inventory.model";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private url = 'http://localhost:8080/api/inventory';

  constructor(private http: HttpClient) { }
  searchInventory(): Observable<InventoryModel[]> {
    return this.http.get<InventoryModel[]>(this.url);
  }
  getItemsByIds(inventoryIds: Array<number>): Observable<InventoryModel[]> {
    let params = new HttpParams();
    params.appendAll({'ids': inventoryIds})
    return this.http.get<InventoryModel[]>(`${this.url}/byId`,{params: params});
  }
  getItem(inventoryId: number): Observable<InventoryModel> {
    return this.http.get<InventoryModel>(`${this.url}/${inventoryId}`);
  }
  getItemSize(productId: number, size: number): Observable<InventoryModel> {
    return this.http.get<InventoryModel>(`${this.url}/${productId}/${size}`);
  }
  createItem(inventory: InventoryModel): Observable<number> {
    return this.http.post<number>(this.url, inventory);
  }
  updateItem(inventory: InventoryModel): Observable<InventoryModel> {
    return this.http.put<InventoryModel>
    (`${this.url}/${inventory.id}`, inventory);
  }
  deleteItem(inventoryId: number): Observable<void> {
    return this.http.delete<void>
    (`${this.url}/${inventoryId}`);
  }

}
