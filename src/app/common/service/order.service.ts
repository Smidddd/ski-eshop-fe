import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {InventoryModel} from "../model/inventory.model";
import {Order} from "../model/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'http://localhost:8080/api/order';

  constructor(private http: HttpClient) { }
  searchOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url);
  }
  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.url}/${orderId}`);
  }
  getOrderByCustomerId(customerId: number): Observable<Order> {
    return this.http.get<Order>(`${this.url}/customer/${customerId}`);
  }
  createOrder(order: Order): Observable<number> {
    return this.http.post<number>(this.url, order);
  }
  updateOrder(orderId: number): Observable<void> {
    return this.http.put<void>(`${this.url}/${orderId}`, {});
  }
  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>
    (`${this.url}/${orderId}`);
  }
}
