import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Login } from "src/app/models/login.models";
import * as jwt_decode from "jwt-decode";
import { User } from 'src/app/models/user.models';
@Injectable({
  providedIn: "root"
})
export class UserService {
  data;
  postsUrl: string = "http://localhost:8080/authenticate";
  constructor(private http: HttpClient) {}
  auth(user: Login): Observable<JSON> {
    this.data = this.http.post<Login>(this.postsUrl, user);
    return this.data;
  }
  saveToken(token) {
    localStorage.setItem("token", token.token);
  }
  getPatients(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/patients/all");
  }

  getUser(data) {
   var decoded = jwt_decode(data.token).user;
    return decoded;
  }
}
