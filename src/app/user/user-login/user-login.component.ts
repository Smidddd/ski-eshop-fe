import { Component } from '@angular/core';
import {User} from "../../common/model/user.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../common/service/user.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppComponent} from "../../app.component";

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
              private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
    this.getPersons();
    this.session = new AppComponent();
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
  /*
  getPersons(): void{
    this.service.getUsers().subscribe((persons: User[])=>{
      this.persons = persons;
    })
  }
  /*createPerson(person: User): void {
    this.persons.push(person);
    console.log('PERSONS:', this.persons);
  }*/

  setUserByEmail(): void {
    this.service.getUserByEmail(this.formLogin.controls.email.value).subscribe((person: User) => {
      this.person = person;
      this.authorizeUser()
    });
  }
  authorizeUser(): void {
   if (this.person?.password == btoa(this.formLogin.controls.password.value)){
     this.session.SetSession(this.person.id,this.person.firstName, this.person.lastName,this.person.email,this.person.phone,this.person.address,this.person.city,this.person.state,this.person.zipCode, this.person.role);
     this.router.navigate(["main"]);
   } else {
     console.log("error");
   }

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

}
