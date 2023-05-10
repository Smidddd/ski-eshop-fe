import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../common/service/user.service";
import {User} from "../../common/model/user.model";
import {AppComponent} from "../../app.component";



@Component({
  selector: 'app-user-changepass',
  templateUrl: './user-changepass.component.html',
  styleUrls: ['./user-changepass.component.css']
})
export class UserChangepassComponent {
  formPass: FormGroup;
  person?: User;
  session: AppComponent;
  constructor(private service: UserService, private router: Router) {
    this.formPass = new FormGroup({
      oldPassword: new FormControl<string | null>(null, Validators.required),
      newPassword1: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8), this.createPasswordStrengthValidator()]),
      newPassword2: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8), this.createPasswordStrengthValidator()])
    })
    this.session = new AppComponent();
  }

  setUserById(): void {
    this.service.getUser(Number(this.session.GetSessionId())).subscribe((person: User) => {
      this.person = person;
      this.authorizePassword();
    });
  }
  authorizePassword(): void{
    // @ts-ignore
    this.service.verifyPassword(this.formPass.controls.oldPassword.value, this.person.id).subscribe((response: boolean) => {
      if(response){
        if (this.formPass.controls.newPassword1.value == this.formPass.controls.newPassword2.value){
          // @ts-ignore
          this.person.password = this.formPass.controls.newPassword1.value;
          // @ts-ignore
          this.service.updateUser(this.person).subscribe(person => {
            console.log("uspesne")
            this.router.navigate(["main"]);
          });
        }else{
          alert("New passwords dont match");
        }
      }else{
        alert("Incorrect password");
      }
    });

  }
  createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

      return !passwordValid ? {passwordStrength:true}: null;
    }
  }
}
