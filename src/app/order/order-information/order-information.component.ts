import { Component } from '@angular/core';
import {OrderService} from "../../common/service/order.service";
import {AppComponent} from "../../app.component";
import {Order} from "../../common/model/order.model";
import {InventoryService} from "../../common/service/inventory.service";

@Component({
  selector: 'app-order-information',
  templateUrl: './order-information.component.html',
  styleUrls: ['./order-information.component.css']
})
export class OrderInformationComponent {
  order?: Order;
  session: AppComponent;
  constructor(private service: OrderService, private inventoryService: InventoryService) {
    this.session = new AppComponent(inventoryService);
    this.service.getOrderByCustomerId(Number(this.session.GetSessionId())).subscribe(order=>{
      this.order = order;
    });
    console.log(this.order);
    if (localStorage.getItem("role") == "NotSignedIn"){
      localStorage.clear();
    }

  }
  confirmOrder(order: Order){
    this.service.updateOrder(Number(this.order?.orderId)).subscribe( ()=>{
      console.log("editnute");
    });
  }
}
