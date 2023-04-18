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
  SetSessionFilter(price1: number, price2: number, type: string, sizes: string){
    sessionStorage.setItem('price1', price1.toString());
    sessionStorage.setItem('price2', price2.toString());
    sessionStorage.setItem('type',type);
    sessionStorage.setItem('sizes',sizes);
    sessionStorage.setItem('filtered', 'true')
  }
  GetSessionFilterPrice1(){
    return Number(sessionStorage.getItem('price1'));
  }
  GetSessionFilterPrice2(){
    return Number(sessionStorage.getItem('price2'));
  }
  GetSessionFilterType(){
    return sessionStorage.getItem('type');
  }
  GetSessionFilterSizes(){
    return sessionStorage.getItem('sizes');
  }
  GetSessionFiltered(){
    return sessionStorage.getItem('filtered');
  }
  RemoveSessionFiltered(){
    sessionStorage.removeItem('price1');
    sessionStorage.removeItem('price2');
    sessionStorage.removeItem('type');
    sessionStorage.removeItem('sizes');
    sessionStorage.removeItem('filtered');
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
