import {Product} from "../../common/model/product.model";
import { Component, } from '@angular/core';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],

})
export class ProductPageComponent {
  products: Array<Product> = [];


}
