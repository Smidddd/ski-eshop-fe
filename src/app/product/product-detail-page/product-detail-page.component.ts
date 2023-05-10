import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Product} from "../../common/model/product.model";
import {InventoryModel} from "../../common/model/inventory.model";
import {ProductService} from "../../common/service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {InventoryService} from "../../common/service/inventory.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastService} from "angular-toastify";


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
  formSize: FormGroup;

  constructor(private service: ProductService, private router: Router,private route: ActivatedRoute, private inventoryService: InventoryService, private toastService: ToastService) {
    this.productId = Number(route.snapshot.paramMap.get('productId'));
    this.getProductById();
    this.formSize = new FormGroup({
      size: new FormControl()
    });
  }

  getProductById(): void {
    if (this.productId) {
      this.service.getProduct(this.productId).pipe(untilDestroyed(this)).subscribe((product: Product) => {
        this.product = product;
      });
    }
  }
  saveOrderProduct(productId: number): void{
    if (this.formSize.controls.size.value != null){
      this.inventoryService.getItemSize(productId, this.formSize.controls.size.value).subscribe((item: InventoryModel)=>{
        if (sessionStorage.getItem("array") == null){
          var aa = new Array();
          var jsonAA = JSON.stringify(aa);
          sessionStorage.setItem("array", jsonAA);
        }
        var array = sessionStorage.getItem("array");
        var array1 = JSON.parse(String(array));
        array1.push(item.id);
        array = JSON.stringify(array1);
        sessionStorage.setItem("array", array);
        this.toastService.success("Product has been added to cart!")
      });
    } else {
      this.toastService.error("Please select size before buying!");
    }
  }
}
