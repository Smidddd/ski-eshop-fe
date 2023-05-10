import {Product} from "../../common/model/product.model";
import {Component, EventEmitter, Input, Output,} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ProductService} from "../../common/service/product.service";
import {Router} from "@angular/router";
import {waitForAsync} from "@angular/core/testing";
import {delay} from "rxjs";
import {UserService} from "../../common/service/user.service";
import {User} from "../../common/model/user.model";
import {AppComponent} from "../../app.component";
import {InventoryService} from "../../common/service/inventory.service";

@UntilDestroy()
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],

})
export class ProductPageComponent {
  products: Array<Product> = [];
  product?: Product;
  session: AppComponent;
  constructor(private service: ProductService, private router: Router, private userService: UserService, private inventoryService: InventoryService) {
    this.getProducts();
    this.session = new AppComponent(inventoryService);
    if (localStorage.getItem("email")!=""){
      this.loginUser();
    }
  }
  loginUser(): void{
    // @ts-ignore
    this.userService.getUserByEmail(localStorage.getItem("email")).subscribe((account: User) => {
      this.session.SetSession(account.id,account.firstName,account.lastName,account.email,account.phone,account.address,account.city,account.state,account.zipCode,account.role);
    })
  }
  getProducts(): void {
    this.service.getProducts().pipe(untilDestroyed(this)).subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}
