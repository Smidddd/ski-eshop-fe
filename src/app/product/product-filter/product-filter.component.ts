import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../common/model/product.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../common/service/product.service";
import {Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {AppComponent} from "../../app.component";
import {InventoryService} from "../../common/service/inventory.service";
@UntilDestroy()
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})

export class ProductFilterComponent{
  filteredProducts: Array<Product> = [];
  formFilter: FormGroup

  @Output()
  filtered = new EventEmitter<Product[]>();
  session: AppComponent;

  constructor(private service: ProductService, private router: Router, private inventoryService: InventoryService ) {
    this.session = new AppComponent(inventoryService);
    this.formFilter = new FormGroup({
      price1: new FormControl(null),
      price2: new FormControl(null),
      type: new FormControl(null),
      sizes: new FormControl(null)
    });
    this.setfilterData();
    if (this.session.GetSessionFiltered() == "true"){
      console.log("filtered")
      this.saveFilter();
    }


  }
  setfilterData(){
    this.formFilter.setValue({
      price1: this.session.GetSessionFilterPrice1(),
      price2: this.session.GetSessionFilterPrice2(),
      type: this.session.GetSessionFilterType(),
      sizes: this.session.GetSessionFilterSizes(),
    })
  }
  compareProducts(){
    this.service.getProducts().subscribe((products: Product[]) =>{
      this.filteredProducts = []
      if (this.formFilter.controls.sizes.value != null){
        var minMaxSize = this.formFilter.controls.sizes.value.split('-');
      }
      for(let i = 0; i < products.length; i++){
          if(products[i].price >= this.formFilter.controls.price1.value || this.formFilter.controls.price1.value == 0 || this.formFilter.controls.price1.value == null){
            if(products[i].price <= this.formFilter.controls.price2.value || this.formFilter.controls.price2.value == 0 || this.formFilter.controls.price2.value == null){
              if (this.formFilter.controls.type.value == null || this.formFilter.controls.type.value == ""){
                if (this.formFilter.controls.sizes.value == "" || this.formFilter.controls.sizes.value == null){
                  console.log("pridavam");
                  this.filteredProducts.push(products[i]);
                } else {
                  console.log("sizes su")
                  console.log(this.formFilter.controls.sizes.value)
                  var sizeOk = 0;
                  for (let x=0; x<products[i].sizes.length; x++){
                    if (products[i].sizes[x] >= minMaxSize[0] && (products[i].sizes[x] <= minMaxSize[1])) {
                      sizeOk++;

                    }
                  }
                  if (sizeOk <= products[i].sizes.length && sizeOk > 0) {
                    this.filteredProducts.push(products[i]);
                  }
                }
              } else {
                if(products[i].type.toString() == this.formFilter.controls.type.value.toString()) {
                  if (this.formFilter.controls.sizes.value == "" || this.formFilter.controls.sizes.value == null){
                    console.log("pridavam");
                    this.filteredProducts.push(products[i]);
                  } else {
                    console.log("sizes su")
                    console.log(this.formFilter.controls.sizes.value)
                    var sizeOk = 0;
                    for (let x=0; x<products[i].sizes.length; x++){
                      if (products[i].sizes[x] >= minMaxSize[0] && (products[i].sizes[x] <= minMaxSize[1])) {
                        sizeOk++;

                      }
                    }
                    if (sizeOk <= products[i].sizes.length && sizeOk > 0) {
                      this.filteredProducts.push(products[i]);
                    }
                  }
                }
              }
            }
          }
      }
      console.log(this.filteredProducts);
      this.filtered.emit(this.filteredProducts);
    })
  }

  saveFilter(){
    let price1, price2, type, sizes;
    if (this.formFilter.controls.price1.value != null){
      price1 = this.formFilter.controls.price1.value;
    } else {
      price1 = 0;
    }
    if (this.formFilter.controls.price2.value != null){
      price2 = this.formFilter.controls.price2.value;
    } else {
      price2 = 0;
    }
    if (this.formFilter.controls.sizes.value != null){
      sizes = this.formFilter.controls.sizes.value;
    } else {
      sizes = "";
    }
    if (this.formFilter.controls.type.value != null){
      type = this.formFilter.controls.type.value;
    } else {
      type = "";
    }
    this.compareProducts();
    this.session.SetSessionFilter(price1, price2, type, sizes);
  }

  resetForm():void{
    this.formFilter.controls.price1.reset();
    this.formFilter.controls.price2.reset();
    this.formFilter.controls.type.reset();
    this.formFilter.controls.sizes.reset();
  }

}
