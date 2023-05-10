import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../common/model/product.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../common/service/product.service";
import {Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {min} from "rxjs";
import {AppComponent} from "../../app.component";
import {InventoryService} from "../../common/service/inventory.service";
@UntilDestroy()
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})

export class ProductFilterComponent implements OnInit{
  @Input()
  products: Array<Product> = [];
  filteredProducts: Array<Product> = [];
  formFilter: FormGroup

  @Output()
  filtered = new EventEmitter<Product[]>();
  session: AppComponent;

  constructor(private service: ProductService, private router: Router, private inventoryService: InventoryService ) {

    this.filteredProducts = this.products;
    this.formFilter = new FormGroup({
      price1: new FormControl(null, Validators.required),
      price2: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      sizes: new FormControl(null, Validators.required)
    });
    this.getProducts();
    this.session = new AppComponent(inventoryService)
  }

  ngOnInit(): void{
    if(this.session.GetSessionFilterType() != null){
      this.setfilterData();
      console.log(this.formFilter.getRawValue())
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
    this.getProducts();
  }
  compareProducts(){
    console.log(this.products);
    this.filteredProducts = []
    var minMaxSize = this.formFilter.controls.sizes.value.split('-');

    for(let i = 0; i < this.products.length; i++){
      if (this.formFilter.valid){
        if(this.products[i].price >= this.formFilter.controls.price1.value){
          if(this.products[i].price <= this.formFilter.controls.price2.value){
            if(this.products[i].type.toString() == this.formFilter.controls.type.value.toString()) {
              var sizeOk = 0;
              for (let x=0; x<this.products[i].sizes.length; x++){
                if (this.products[i].sizes[x] >= minMaxSize[0] && (this.products[i].sizes[x] <= minMaxSize[1])) {
                  sizeOk++;

                }
              }
              if (sizeOk <= this.products[i].sizes.length && sizeOk > 0) {
                this.filteredProducts.push(this.products[i]);
              }
            }
          }
        }
      }else{
        this.filteredProducts.push(this.products[i]);
      }
    }
    console.log(this.filteredProducts);
    this.filtered.emit(this.filteredProducts);

  }

  saveFilter(){
    this.getProducts();
    this.compareProducts()
    this.session.SetSessionFilter(this.formFilter.controls.price1.value, this.formFilter.controls.price2.value, this.formFilter.controls.type.value, this.formFilter.controls.sizes.value)
  }



  getProducts(): void {
    this.service.getProducts().pipe(untilDestroyed(this)).subscribe((products: Product[]) => {
      this.products = products;
    });
  }
  resetForm():void{
    this.formFilter.controls.price1.reset();
    this.formFilter.controls.price2.reset();
    this.formFilter.controls.type.reset();
    this.formFilter.controls.sizes.reset();
  }

}
