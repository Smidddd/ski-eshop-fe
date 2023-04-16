import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../common/model/product.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ProductService} from "../../common/service/product.service";
import {AppComponent} from "../../app.component";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";



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
  filteredProducts: Array<Product> = [];


  @Output()
  formCreate = new EventEmitter<Product>();
  @Output()
  formUpdate = new EventEmitter<Product>();

  formProduct: FormGroup;

  constructor(private service: ProductService, private router: Router) {
    this.formProduct = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      sizes: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)

    })
    this.session = new AppComponent();
  }
  @Input()
  set productData(product: Product | undefined) {
    if (product) {
      this.formProduct.setValue(product);
    }
  }

  saveProduct(): void{
    console.log("submit")
    if (this.formProduct.valid) {
      console.log("valid")
      if (this.formProduct.controls.id.value) {
        console.log("if")
        this.formUpdate.emit(
          this.prepareProduct(this.formProduct.controls.id.value));
      } else {
        console.log("else")
        this.createProduct(this.prepareProduct());
      }
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
      this.service.deleteProduct(productId).pipe(untilDestroyed(this)).subscribe(() => {
        console.log("Produkt bol vymazany")
        location.reload();
      })
    }
  updateProduct(productId: number): void{
    this.router.navigate(['updateproduct',productId]);
  }

  isAdmin(): boolean{
    return this.session.GetSessionRole() == "Admin";
  }
  searchText: string = '';

  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;

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
