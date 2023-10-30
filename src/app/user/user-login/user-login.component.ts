import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../common/service/user.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppComponent} from "../../app.component";
import {User} from "../../common/model/user.model";
import {InventoryService} from "../../common/service/inventory.service";

@UntilDestroy()
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  private getListSubscription?: Subscription;
  persons: Array<User> = [];
  person?: User;
  formLogin: FormGroup;
  session: AppComponent
  constructor(private service: UserService,
              private router: Router, private inventoryService: InventoryService) {
    this.formLogin = new FormGroup({
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      password: new FormControl<string | null>(null, Validators.required)
    })
    this.getPersons();
    this.session = new AppComponent(inventoryService);
  }
  ngOnDestroy(): void {
    this.getListUnsubscribe();
  }
  getListUnsubscribe(): void {
    if (this.getListSubscription) {
      this.getListSubscription.unsubscribe();
      this.getListSubscription = undefined;
    }
  }
  getPersons(): void {
    this.service.getUsers().pipe(untilDestroyed(this)).subscribe((persons: User[]) => {
      this.persons = persons;
    });
  }

  setUserByEmail(): void {
    this.service.getUserByEmail(this.formLogin.controls.email.value).subscribe((person: User) => {
      this.service.verifyPassword(this.formLogin.controls.password.value, person.id).subscribe((response: boolean) => {
        if (response){
          this.person = person;
          this.authorizeUser()
        } else {
          alert("Incorrect e-mail or password!");
        }
      });
    });
  }
  authorizeUser(): void {
    // @ts-ignore
    this.session.SetSession(this.person.id,this.person.firstName, this.person.lastName,this.person.email,this.person.phone,this.person.address,this.person.city,this.person.state,this.person.zipCode, this.person.role);
    this.router.navigate(["main"]);
  }
  updatePerson(person: User): void {
    this.service.updateUser(person).subscribe(person => {
      console.log('Osoba bola úspešne zmenená.');
      this.getPersons();
    })
  }
  selectPersonToUpdate(personId: number): void {
    this.router.navigate(['user', personId]);
  }
  deletePerson(personId: number): void {
    if (window.confirm('Naozaj chcete vymazať osobu?')) {
      this.service.deleteUser(personId).pipe(untilDestroyed(this)).subscribe(() => {
        console.log("Osoba bola uspesne zmazana")
        this.getPersons();
      }, () => {
        console.log('Chyba. Osoba nebola zmazaná.')
      })
    }
  }
  navigateRegister(): void{
    this.router.navigate(['register']);
  }

}
