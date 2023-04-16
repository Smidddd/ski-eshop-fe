import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../common/model/product.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../common/service/product.service";
import {Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
@UntilDestroy()
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})

export class ProductFilterComponent {
  @Input()
  products: Array<Product> = [];
  @Input()
  filteredProducts: Array<Product> = [];
  formFilter: FormGroup
  velkost = 130;

  constructor(private service: ProductService, private router: Router ) {

    this.filteredProducts = this.products;
    this.formFilter = new FormGroup({
      price1: new FormControl(null, Validators.required),
      price2: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      sizes: new FormControl(null, Validators.required)
    });
    this.getProducts();
    this.saveFilter();

  }

  compareProducts(){
    console.log(this.filteredProducts);

    this.filteredProducts = []
    for(var i = 0; i < this.products.length; i++){
      if (this.formFilter.valid){
        if(this.products[i].price > this.formFilter.controls.price1.value){
          if(this.products[i].price < this.formFilter.controls.price2.value){
            if(this.products[i].type.toString() == this.formFilter.controls.type.value.toString()) {
              if (this.velkost == this.formFilter.controls.sizes.value) {
                this.filteredProducts.push(this.products[i]);
              }
            }
          }
        }
      }else{
        this.filteredProducts.push(this.products[i]);
      }
    }

  }

  saveFilter(){
    this.compareProducts()
  }
  getProducts(): void {
    this.service.getProducts().pipe(untilDestroyed(this)).subscribe((products: Product[]) => {
      this.products = products;
    });
  }


}


