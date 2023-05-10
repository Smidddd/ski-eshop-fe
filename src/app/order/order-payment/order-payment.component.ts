import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../common/service/user.service";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {User} from "../../common/model/user.model";
import {InventoryService} from "../../common/service/inventory.service";

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.css']
})
export class OrderPaymentComponent {
  formGroup: FormGroup;
  session: AppComponent;
  constructor(private service: UserService,
              private router: Router, private inventoryService: InventoryService) {
    this.formGroup = new FormGroup({
      id: new FormControl(),
      firstName: new FormControl<null | string>(null, Validators.required),
      lastName: new FormControl<null | string>(null, Validators.required),
      email: new FormControl<null | string>(null, [Validators.required, Validators.email]),
      phone: new FormControl<null | string>(null, Validators.required),
      address: new FormControl<null | string>(null, Validators.required),
      city: new FormControl<null | string>(null, Validators.required),
      state: new FormControl<null | string>(null, Validators.required),
      zipCode: new FormControl<number | null>(null, Validators.required)

    })
    this.session = new AppComponent(inventoryService);
  }
  savePerson(): void {
    console.log("submit")
    if (this.formGroup.valid) {
      console.log("valid")
      this.createPerson(this.prepareUser());
    }
  }
  private prepareUser(id?: number): User {
    console.log("prepare user")
    return {
      id: id !== undefined ? id : Date.now(),
      firstName: this.formGroup.controls.firstName.value,
      lastName: this.formGroup.controls.lastName.value,
      email: this.formGroup.controls.email.value,
      password: "",
      phone: this.formGroup.controls.phone.value,
      address: this.formGroup.controls.address.value,
      city: this.formGroup.controls.city.value,
      state: this.formGroup.controls.state.value,
      zipCode: this.formGroup.controls.zipCode.value,
      role: "NotSignedIn"
    };
  }
  createPerson(person: User): void {
    console.log("createperson")
    if (this.formGroup.controls.zipCode.value){
      this.service.createPerson(person).subscribe(() => {
        console.log('Osoba bola úspešne uložená.');
      });
      this.session.SetSession(0,person.firstName,person.lastName,person.email,person.phone,person.address,person.city,person.state,person.zipCode,person.role);
      this.router.navigate(['order']);
    } else {
      alert("Fill in all fields!")
    }

  }
}
