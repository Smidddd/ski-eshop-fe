import {Product} from "../../common/model/product.model";
import { Component, } from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ProductService} from "../../common/service/product.service";
import {Router} from "@angular/router";

@UntilDestroy()
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],

})
export class ProductPageComponent {
  products: Array<Product> = [];
  product?: Product;

  constructor(private service: ProductService, private router: Router ) {
    this.getProducts();
  }

  getProducts(): void {
    this.service.getProducts().pipe(untilDestroyed(this)).subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}
