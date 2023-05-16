
import {Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../common/model/product.model";
import {AppComponent} from "../../app.component";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {InventoryModel} from "../../common/model/inventory.model";
import {InventoryService} from "../../common/service/inventory.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Order} from "../../common/model/order.model";
import {UserService} from "../../common/service/user.service";
import {AstObject} from "@angular/compiler-cli/linker/src/ast/ast_value";
import {User} from "../../common/model/user.model";
import {OrderService} from "../../common/service/order.service";
import {Router} from "@angular/router";
import {invIds} from "../../common/model/invIds.model";
@UntilDestroy()
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent{
  inventory: Array<InventoryModel> = [];
  session: AppComponent;
  user?: User;
  formOrder: FormGroup;

  totalPrice= 0;
  counted = false;
  invIds: invIds = {
    ids: []
  };
  constructor(private service: OrderService, private userService: UserService, private inventoryService: InventoryService, private router: Router) {
    this.session = new AppComponent(inventoryService);
    if (sessionStorage.length > 0){
      var session = sessionStorage.getItem("array");
     this.invIds.ids = JSON.parse(String(session));

      console.log(this.invIds);
      this.inventoryService.getItemsByIds(this.invIds).subscribe((items: InventoryModel[])=>{
        this.inventory = items
      })

      if (sessionStorage.getItem("email") != ""){
        console.log("hladam podla email");
        this.userService.getUserByEmail(String(this.session.GetSessionEmail())).subscribe(person => {
          console.log(person);
          this.user = person;
          this.session.SetSession(person.id,person.firstName,person.lastName,person.email,person.phone,person.address,person.city,person.state,person.zipCode,person.role);
        });
      } else {
        this.userService.getUser(Number(this.session.GetSessionId())).subscribe((user: User) =>{
          this.user = user;
        });
      }

    }

    this.formOrder = new FormGroup({
      type: new FormControl(),
    });


  }
  redirect(): void{
    this.router.navigate(['checkout']);
  }
  deleteItem(item: InventoryModel): void{
    const index = this.inventory.indexOf(item);
    if (index !== -1){
      this.inventory.splice(index, 1);
    }
    const array = [];
    for (let i=0;i<this.inventory.length; i++){
      array.push(this.inventory[i].id);
    }
    const sessionIds = JSON.stringify(array)
    sessionStorage.setItem("array", sessionIds);
    location.reload();
  }

  saveOrder(): void {
    if(this.formOrder.controls.type.value != null){
      console.log("valid");
      this.createOrder(this.prepareOrder());
    } else {
      alert("Please select payment method!");
    }
  }

  createOrder(order: Order): void {
    console.log("create order");
    this.service.createOrder(order).subscribe(() => {
      this.router.navigate(['orderInformation']);
    });
    sessionStorage.clear();
  }

  prepareOrder(id?: number): Order {
    var userObj;

    return {
      orderId: id !== undefined ? id : Date.now(),
      customer_ID: this.user !== undefined ? this.user : {
        id: 0,
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: 0,
        role: "",
      },
      ordered: false,
      orderedProducts: this.inventory,
      type: this.formOrder.controls.type.value,
      date: ""
    }
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
    return this.totalPrice;
  }
}
