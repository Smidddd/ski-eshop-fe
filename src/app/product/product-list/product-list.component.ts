import {Component, Input, Output} from '@angular/core';
import {Product} from "../../common/model/product.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ProductService} from "../../common/service/product.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {findWorkspaceFile} from "@angular/cli/src/utilities/project";
import {Router} from "@angular/router";


@UntilDestroy()
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input()
  products: Array<Product> = [];
  @Input()
  filteredProducts: Array<Product> = [];


  constructor(private service: ProductService, private router: Router ) {

    this.getProducts();

  }

  getProducts(): void {
    this.service.getProducts().pipe(untilDestroyed(this)).subscribe((products: Product[]) => {
      this.products = products;
    });
  }
  checkFilter(){
    console.log(this.filteredProducts);
    if(this.filteredProducts.length > 0){
      return true;
    }else{
      return false;
    }
  }

}
