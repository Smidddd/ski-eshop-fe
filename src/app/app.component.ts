import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'untitled1';
  SetSession(id: number, firstName: string,lastName: string, email: string, phone: string, address: string, city: string, state: string, zipCode: number, role: string){
    localStorage.setItem('id',id.toString());
    localStorage.setItem('firstName',firstName);
    localStorage.setItem('lastName',lastName);
    localStorage.setItem('email',email);
    localStorage.setItem('phone',phone);
    localStorage.setItem('address',address);
    localStorage.setItem('city',city);
    localStorage.setItem('state', state);
    localStorage.setItem('zipCode',zipCode.toString());
    localStorage.setItem('role',role);
  }
  GetSessionId(){
    return localStorage.getItem('id');
  }
  GetSessionFirstName(){
    return localStorage.getItem('firstName');
  }
  GetSessionLastName(){
    return localStorage.getItem('lastName');
  }
  GetSessionEmail(){
    return localStorage.getItem('email');
  }
  GetSessionPhone(){
    return localStorage.getItem('phone');
  }
  GetSessionaddress(){
    return localStorage.getItem('address');
  }
  GetSessionCity(){
    return localStorage.getItem('city');
  }
  GetSessionState(){
    return localStorage.getItem('state');
  }
  GetSessionzipCode(){
    return localStorage.getItem('zipCode');
  }

  GetSessionRole(){
    return localStorage.getItem('role');
  }
  RemoveSession(){
    localStorage.clear();
  }

}
