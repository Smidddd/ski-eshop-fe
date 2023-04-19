import {Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../common/model/product.model";
import {AppComponent} from "../../app.component";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {InventoryModel} from "../../common/model/inventory.model";
import {InventoryService} from "../../common/service/inventory.service";
@UntilDestroy()
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})

export class OrderPageComponent{
  inventory: Array<InventoryModel> = [];

  constructor(private service: InventoryService) {
    var session = sessionStorage.getItem("array");
    var invIds = JSON.parse(String(session));
    for (let i=0; i<invIds.length; i++){
      this.service.getItem(invIds[i]).subscribe((item: InventoryModel)=>{
        this.inventory.push(item);

        //console.log(item?.produkt_id?.name)
      })

    }
    console.log(this.inventory);

  }
}
