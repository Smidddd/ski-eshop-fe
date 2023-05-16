import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../common/model/user.model";
import {UserService} from "../../common/service/user.service";
import {AppComponent} from "../../app.component";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Product} from "../../common/model/product.model";
import {ProductService} from "../../common/service/product.service";
import {OrderService} from "../../common/service/order.service";
import {Order} from "../../common/model/order.model";
import {InventoryService} from "../../common/service/inventory.service";


@UntilDestroy()
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  session: AppComponent;
  user?: User;
  orders: Order[] = [];
  allOrders: Order[] = [];
  searchText: string = '';
  userId: number;
  formUpdate: FormGroup;
  constructor(private userService: UserService, private orderService: OrderService, private inventoryService: InventoryService) {
    this.userId = Number(localStorage.getItem("id"));
    this.formUpdate = new FormGroup({
      id: new FormControl(),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      password: new FormControl(),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      role: new FormControl()
    })
    this.getUserById();
    this.getOrdersById();
    this.getUserInformationById()
    this.getOrders();
    this.session = new AppComponent(inventoryService);
  }
  getUserById(): void {
    console.log(this.userId);
    this.userService.getUser(this.userId).pipe(untilDestroyed(this)).subscribe((user: User) => {
      this.user = user;
    });
  }
  getUserByIdFromSite(id: number): void {
    this.userService.getUser(id).pipe(untilDestroyed(this)).subscribe((user: User) => {
      this.user = user;
    });
  }
  getOrdersById(): void{
    this.orderService.getOrdersByCustomerId(this.userId).subscribe((orders: Order[])=>{
      this.orders = orders;
      console.log(orders[0].date);
    });
  }
  getOrders(): void{
    this.orderService.searchOrders().subscribe((orders: Order[])=>{
      this.allOrders = orders;
    });
  }
  getUserInformationById(): void {
    if (this.userId) {
      this.userService.getUser(this.userId).pipe(untilDestroyed(this)).subscribe((user: User) => {
        this.formUpdate.setValue({
          id: this.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          email: user.email,
          phone: user.phone,
          address: user.address,
          city: user.city,
          state: user.state,
          zipCode: user.zipCode,
          role: user.role
        });
        console.log(user.phone);
      });

    }
  }
  saveUpdate(): void{
    console.log(this.formUpdate.controls.id.value);
    console.log("submit")
    if (this.formUpdate.valid) {
      console.log("valid")
      this.updateUser(this.prepareUpdate());
      this.session.SetSession(this.userId,this.formUpdate.controls.firstName.value,this.formUpdate.controls.lastName.value,this.formUpdate.controls.email.value,this.formUpdate.controls.phone.value,
        this.formUpdate.controls.address.value,this.formUpdate.controls.city.value,this.formUpdate.controls.state.value,this.formUpdate.controls.zipCode.value,this.formUpdate.controls.role.value);
    }
  }
  private prepareUpdate(id?: number): User {
    console.log("prepare update")
    return {
      id: Number(this.userId),
      firstName: this.formUpdate.controls.firstName.value,
      lastName: this.formUpdate.controls.lastName.value,
      email: this.formUpdate.controls.email.value,
      phone: this.formUpdate.controls.phone.value,
      address: this.formUpdate.controls.address.value,
      city: this.formUpdate.controls.city.value,
      state: this.formUpdate.controls.state.value,
      zipCode: this.formUpdate.controls.zipCode.value,
      role: this.formUpdate.controls.role.value,
      password: this.formUpdate.controls.password.value,
    };
  }
  updateUser(user: User): void{
    console.log("update user")
    this.userService.updateUser(user).subscribe(() => { console.log('User bol úspešne uloženy.');
     location.reload();
    })
  }
  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;
  }

}
