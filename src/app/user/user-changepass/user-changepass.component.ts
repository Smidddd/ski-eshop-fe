import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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
      oldPassword: new FormControl(),
      newPassword1: new FormControl(),
      newPassword2: new FormControl(),
    })
    this.session = new AppComponent();
    this.authorizePassword();
  }

  setUserById(): void {
    this.service.getUser(Number(this.session.GetSessionId())).subscribe((person: User) => {
      this.person = person;
      this.authorizePassword();
    });
  }
  authorizePassword(): void{

    console.log(this.person?.password)
    console.log(this.formPass.controls.oldPassword.value)
    if(this.person?.password == btoa(this.formPass.controls.oldPassword.value)){
      if (this.formPass.controls.newPassword1.value == this.formPass.controls.newPassword2.value){
        this.person.password = btoa(this.formPass.controls.newPassword1.value);
        this.service.updateUser(this.person).subscribe(person => {
          console.log("uspesne")
          this.router.navigate(["main"]);
        });

      }else{
        console.log("Nove hesla sa nezhoduju")
      }
    }else{
      console.log("Nespravne heslo")
    }
  }
}