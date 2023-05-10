import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../common/service/user.service";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {User} from "../../common/model/user.model";
import {InventoryService} from "../../common/service/inventory.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  session: AppComponent;
  formGroup: FormGroup;
  @Output()
  formUpdate = new EventEmitter<User>();
  constructor(private service: UserService,
              private router: Router, private inventoryService: InventoryService) {
    this.formGroup = new FormGroup({
      id: new FormControl(),
      password: new FormControl<null | string>(null, Validators.required),
      password2: new FormControl<null | string>(null, Validators.required),
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
      if (this.formGroup.controls.password.value == this.formGroup.controls.password2.value){
        console.log("valid")
        this.createPerson(this.prepareUser());
      } else {
        alert("Passwords dont match!");
      }
    } else {
      alert("Fill in all fields!");
    }
  }
  private prepareUser(id?: number): User {
    console.log("prepare user")
    return {
      id: id !== undefined ? id : Date.now(),
      firstName: this.formGroup.controls.firstName.value,
      lastName: this.formGroup.controls.lastName.value,
      email: this.formGroup.controls.email.value,
      password: btoa(this.formGroup.controls.password.value),
      phone: this.formGroup.controls.phone.value,
      address: this.formGroup.controls.address.value,
      city: this.formGroup.controls.city.value,
      state: this.formGroup.controls.state.value,
      zipCode: this.formGroup.controls.zipCode.value,
      role: "User"
    };
  }
  createPerson(person: User): void {
    console.log("createperson")
    this.service.createPerson(person).subscribe(() => { console.log('Osoba bola úspešne uložená.');
    })
    this.session.SetSession(person.id,person.firstName,person.lastName,person.email,person.phone,person.address,person.city,person.state,person.zipCode,person.role);
    this.router.navigate(['main']);
  }

}
