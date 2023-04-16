import {Component, Input} from '@angular/core';
import {Product} from "../../common/model/product.model";
import {ProductService} from "../../common/service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {FormControl, FormGroup, Validators} from "@angular/forms";
@UntilDestroy()
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {
  @Input()
  product?: Product;
  private productId: number | null;
  formUpdate: FormGroup;
  constructor(private service: ProductService, private router: Router,private route: ActivatedRoute ) {
    this.formUpdate = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      sizes: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)
    })
    this.productId = Number(route.snapshot.paramMap.get('productId'));
    this.getProductById();

  }

  fillForm(): boolean {
    this.formUpdate.patchValue({
      id: this.productId,
      name: this.product?.name,
      description: this.product?.description,
      price: this.product?.price,
      sizes: this.product?.sizes,
      type: this.product?.type,
      image: this.product?.image
    });
    return true;
  }

  getProductById(): void {
    if (this.productId) {
      this.service.getProduct(this.productId).pipe(untilDestroyed(this)).subscribe((product: Product) => {
        this.product = product;
      });
    }
  }
  saveUpdate(): void{
    console.log(this.formUpdate.controls.id.value);
    console.log("submit")
    if (this.formUpdate.valid) {
      console.log("valid")
      if (this.formUpdate.controls.id.value) {
        console.log("if")
          this.prepareUpdate(this.formUpdate.controls.id.value);
      } else {
        console.log("else")
        this.updateProduct(this.prepareUpdate());
      }
    }
  }
  private prepareUpdate(id?: number): Product {
    console.log("prepare update")
    return {
      id: Number(this.productId),
      name: this.formUpdate.controls.name.value,
      description: this.formUpdate.controls.description.value,
      price: this.formUpdate.controls.price.value,
      sizes: this.formUpdate.controls.sizes.value.split(','),
      type: this.formUpdate.controls.type.value,
      image: this.formUpdate.controls.image.value,
    };
  }
  updateProduct(product: Product): void{
    console.log("update product")
    this.service.updateProduct(product).subscribe(() => { console.log('Produkt bol úspešne uloženy.');
      this.router.navigate(["main"]);
    })
  }
}