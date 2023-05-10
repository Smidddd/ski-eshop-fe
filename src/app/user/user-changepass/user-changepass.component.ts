import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../common/service/user.service";
import {User} from "../../common/model/user.model";
import {AppComponent} from "../../app.component";
import {InventoryService} from "../../common/service/inventory.service";



@Component({
  selector: 'app-user-changepass',
  templateUrl: './user-changepass.component.html',
  styleUrls: ['./user-changepass.component.css']
})
export class UserChangepassComponent {
  formPass: FormGroup;
  person?: User;
  session: AppComponent;
  constructor(private service: UserService, private router: Router, private inventoryService: InventoryService) {
    this.formPass = new FormGroup({
      oldPassword: new FormControl<string | null>(null, Validators.required),
      newPassword1: new FormControl<string | null>(null, Validators.required),
      newPassword2: new FormControl<string | null>(null, Validators.required)
    })
    this.session = new AppComponent(inventoryService);
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
        alert("New passwords dont match");
      }
    }else{
      alert("Incorrect password");
    }
  }
}
