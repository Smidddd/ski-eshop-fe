import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../common/model/product.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ProductService} from "../../common/service/product.service";
import {AppComponent} from "../../app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InventoryService} from "../../common/service/inventory.service";
import {InventoryModel} from "../../common/model/inventory.model";
import {invIds} from "../../common/model/invIds.model";

@UntilDestroy()
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  session: AppComponent;
  @Input()
  products: Array<Product> = [];
  @Input()
  filtered: Array<Product> = [];

  formProduct: FormGroup;
  formUpdate: FormGroup;

  invIds: invIds = {
    ids: []
  };
  inventory: Array<InventoryModel> = [];

  constructor(private service: ProductService, private router: Router, private inventoryService: InventoryService) {
    this.formProduct = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      sizes: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)

    })
    this.formUpdate = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      sizes: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)
    })
    this.session = new AppComponent(inventoryService);
    if (sessionStorage.length > 0) {
      var session = sessionStorage.getItem("array");
      this.invIds.ids = JSON.parse(String(session));
      console.log(this.invIds);
      this.inventoryService.getItemsByIds(this.invIds).subscribe((items: InventoryModel[]) => {
        this.inventory = items
      })
    }
  }

  getProductInformationById(productId: number): void{
    console.log("som tu")
    console.log(productId)
    if (productId) {
      this.service.getProduct(productId).pipe(untilDestroyed(this)).subscribe((product: Product) => {
        this.formUpdate.setValue({
          id: product,
          name: product.name,
          description: product.description,
          price: product.price,
          sizes: product.sizes.toString(),
          type: product.type,
          image: product.image,
        });
        console.log(product.name);
      });

    }
  }
  setFiltered(filtered: Product[]){
    console.log(filtered);
    this.filtered = filtered;
  }

  saveProduct(): void{
    console.log("submit")
    if (this.formProduct.valid) {
      console.log("valid")
      this.createProduct(this.prepareProduct());
    }
  }
  private prepareProduct(id?: number): Product {
    console.log("prepare product")
    return {
      id: id !== undefined ? id : Date.now(),
      name: this.formProduct.controls.name.value,
      description: this.formProduct.controls.description.value,
      price: this.formProduct.controls.price.value,
      sizes: this.formProduct.controls.sizes.value.split(','),
      type: this.formProduct.controls.type.value,
      image: this.formProduct.controls.image.value,
    };
  }
  createProduct(product: Product): void {
    console.log("create product")
    this.service.createProduct(product).subscribe(() => { console.log('Produkt bol úspešne uloženy.');
      location.reload();
    })
  }
  deleteProduct(productId: number): void {
    if (window.confirm("Naozaj chcete vymazat produkt ?")){
      this.service.deleteProduct(productId).pipe(untilDestroyed(this)).subscribe(() => {
        location.reload();
        alert("Produkt bol uspesne vymazany")
      });

    } else {
      alert("Produkt nebol vymazany")
    }
    }
  saveUpdate(): void{
    var productId = this.session.getSessionProductId();
    console.log(this.formUpdate.controls.id.value);
    console.log("submit")
    if (this.formUpdate.valid) {
      console.log("valid")
      this.updateProduct(this.prepareUpdate(productId));
    }
  }
  private prepareUpdate(productId?: number): Product {
    console.log("prepare update")
    return {
      id: Number(productId),
      name: this.formUpdate.controls.name.value,
      description: this.formUpdate.controls.description.value,
      price: this.formUpdate.controls.price.value,
      sizes: this.formUpdate.controls.sizes.value.split(','),
      type: this.formUpdate.controls.type.value,
      image: this.formUpdate.controls.image.value
    };
  }
  updateProduct(product: Product): void{
    console.log("update product")
    this.service.updateProduct(product).subscribe(() => { console.log('Produkt bol úspešne uloženy.');
      location.reload();
    })
    sessionStorage.removeItem('currentProduct');
  }

  setProductIdSession(productId: number): void{
    this.session.SetSessionProductId(productId);
    this.getProductInformationById(productId);
  }

  isAdmin(): boolean{
    return this.session.GetSessionRole() == "Admin";
  }

  searchText: string = '';

  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;
  }

}
