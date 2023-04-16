import {Component, Input} from '@angular/core';
import {Product} from "../../common/model/product.model";
import {ProductPageComponent} from "../product-page/product-page.component";
import {ProductService} from "../../common/service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
@UntilDestroy()
@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent {
  @Input()
  product?: Product;
  private productId: number | null;
  constructor(private service: ProductService, private router: Router,private route: ActivatedRoute ) {
    this.productId = Number(route.snapshot.paramMap.get('productId'));
    this.getProductById();

  }

  getProductById(): void {
    if (this.productId) {
      this.service.getProduct(this.productId).pipe(untilDestroyed(this)).subscribe((product: Product) => {
        this.product = product;
      });
    }
  }
  saveOrderProduct(productId: number): void{
    if (sessionStorage.getItem("array") == null){
      var aa = new Array();
      var jsonAA = JSON.stringify(aa);
      sessionStorage.setItem("array", jsonAA);
    }
    var array = sessionStorage.getItem("array");
    var array1 = JSON.parse(String(array));
    array1.push(productId);
    array = JSON.stringify(array1);
    sessionStorage.setItem("array", array);
  }
}
