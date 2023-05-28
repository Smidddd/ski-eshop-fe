import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../model/user.model";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${userId}`);
  }

  getUserByEmail(userEmail: string): Observable<User> {
    return this.http.get<User>(`${this.url}/email/${userEmail}`);
  }
  createPerson(user: User): Observable<number> {
    return this.http.post<number>(this.url, user);
  }
  verifyPassword(password: string, userId: number): Observable<boolean>{
    return this.http.get<boolean>(`${this.url}/verify/${userId}/${password}`);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${userId}`);
  }
  checkEmail(userEmail: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/check/${userEmail}`);
  }
}
