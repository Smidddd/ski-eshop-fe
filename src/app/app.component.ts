import {Component, EventEmitter, Output} from '@angular/core';
import {InventoryModel} from "./common/model/inventory.model";
import {InventoryService} from "./common/service/inventory.service";
import {invIds} from "./common/model/invIds.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'untitled1';

  totalPrice = 0;
  counted = false;

  inventory: Array<InventoryModel> = [];
  invIds: invIds = {
    ids: []
  };
  constructor(private inventoryService: InventoryService) {
    if (sessionStorage.length > 0) {
      var session = sessionStorage.getItem("array");
      this.invIds.ids = JSON.parse(String(session));
      console.log(this.invIds);
      this.inventoryService.getItemsByIds(this.invIds).subscribe((items: InventoryModel[]) => {
        this.inventory = items
      })
    }
  }

  SetSession(id: number, firstName: string,lastName: string, email: string, phone: string, address: string, city: string, state: string, zipCode: number, role: string){
    localStorage.setItem('id',id.toString());
    localStorage.setItem('firstName',firstName);
    localStorage.setItem('lastName',lastName);
    localStorage.setItem('email',email);
    localStorage.setItem('phone',phone);
    localStorage.setItem('address',address);
    localStorage.setItem('city',city);
    localStorage.setItem('state', state);
    localStorage.setItem('zipCode',zipCode.toString());
    localStorage.setItem('role',role);
  }
  SetSessionFilter(price1: number, price2: number, type: string, sizes: string){
    sessionStorage.setItem('price1', price1.toString());
    sessionStorage.setItem('price2', price2.toString());
    sessionStorage.setItem('type',type);
    sessionStorage.setItem('sizes',sizes);
    sessionStorage.setItem('filtered', 'true')
  }
  SetSessionProductId(id: number){
    sessionStorage.setItem('currentProduct', id.toString());
  }
  getSessionProductId(){
    return Number(sessionStorage.getItem('currentProduct'));
  }
  GetSessionFilterPrice1(){
    return Number(sessionStorage.getItem('price1'));
  }
  GetSessionFilterPrice2(){
    return Number(sessionStorage.getItem('price2'));
  }
  GetSessionFilterType(){
    return sessionStorage.getItem('type');
  }
  GetSessionFilterSizes(){
    return sessionStorage.getItem('sizes');
  }
  GetSessionFiltered(){
    return sessionStorage.getItem('filtered');
  }
  RemoveSessionFiltered(){
    sessionStorage.removeItem('price1');
    sessionStorage.removeItem('price2');
    sessionStorage.removeItem('type');
    sessionStorage.removeItem('sizes');
    sessionStorage.removeItem('filtered');
  }
  GetSessionId(){
    return localStorage.getItem('id');
  }
  GetSessionFirstName(){
    return localStorage.getItem('firstName');
  }
  GetSessionLastName(){
    return localStorage.getItem('lastName');
  }
  GetSessionEmail(){
    return localStorage.getItem('email');
  }
  GetSessionPhone(){
    return localStorage.getItem('phone');
  }
  GetSessionaddress(){
    return localStorage.getItem('address');
  }
  GetSessionCity(){
    return localStorage.getItem('city');
  }
  GetSessionState(){
    return localStorage.getItem('state');
  }
  GetSessionzipCode(){
    return localStorage.getItem('zipCode');
  }

  GetSessionRole(){
    return localStorage.getItem('role');
  }
  RemoveLocal(){
    localStorage.clear();
  }
  RemoveSession(){
    sessionStorage.clear();
  }
  getTotalPrice(): number{
    if(!this.counted && this.inventory.length>0){
      console.log(this.inventory.length)
      for (let i=0;i<this.inventory.length; i++){
        this.totalPrice = this.totalPrice + this.inventory[i].productId.price;
        console.log(this.totalPrice);
      }
      this.counted = true;
    }
    console.log(this.totalPrice);
    return this.totalPrice;

  }

}
