import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../common/model/user.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  @Output()
  formCreate = new EventEmitter<User>();
  formGroup: FormGroup;
  @Output()
  formUpdate = new EventEmitter<User>();
  @Output()
  formCancel = new EventEmitter<void>();
  constructor() {
    this.formGroup = new FormGroup({
      id: new FormControl(),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),

    })
  }
  @Input()
  set personData(person: User | undefined) {
    if (person) {
      this.formGroup.setValue(person);
    }
  }
  savePerson(): void {
    if (this.formGroup.valid) {
      if (this.formGroup.controls.id.value) {
        this.formUpdate.emit(
          this.prepareUser(this.formGroup.controls.id.value));
      } else {
        this.formCreate.emit(this.prepareUser());
      }
    }
  }
  private prepareUser(id?: number): User {
    return {
      id: id !== undefined ? id : Date.now(),
      firstName: this.formGroup.controls.firstName.value,
      lastName: this.formGroup.controls.lastName.value,
      email: this.formGroup.controls.email.value,
      password: this.formGroup.controls.password.value,
      phone: this.formGroup.controls.phone.value,
      address: this.formGroup.controls.address.value,
      city: this.formGroup.controls.city.value,
      state: this.formGroup.controls.state.value,
      zipCode: this.formGroup.controls.zipCode.value,
      role: this.formGroup.controls.role.value

    };
  }

}
