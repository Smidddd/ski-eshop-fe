import {Component, Input, Output} from '@angular/core';
import {Product} from "../../common/model/product.model";
import {untilDestroyed} from "@ngneat/until-destroy";
import {ProductService} from "../../common/service/product.service";



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input()
  products: Array<Product> = [];


}
