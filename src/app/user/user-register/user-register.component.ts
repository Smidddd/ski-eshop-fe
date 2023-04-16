import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../common/service/user.service";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {User} from "../../common/model/user.model";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  session: AppComponent;
  @Output()
  formCreate = new EventEmitter<User>();
  formGroup: FormGroup;
  @Output()
  formUpdate = new EventEmitter<User>();
  @Output()
  formCancel = new EventEmitter<void>();
  constructor(private service: UserService,
              private router: Router) {
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
      zipCode: new FormControl(null, Validators.required)

    })
    this.session = new AppComponent();
  }
  @Input()
  set personData(person: User | undefined) {
    if (person) {
      this.formGroup.setValue(person);
    }
  }
  savePerson(): void {
    console.log("submit")
    if (this.formGroup.valid) {
      console.log("valid")
      if (this.formGroup.controls.id.value) {
        console.log("if")
        this.formUpdate.emit(
          this.prepareUser(this.formGroup.controls.id.value));
      } else {
        console.log("else")
        this.createPerson(this.prepareUser());
      }
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
