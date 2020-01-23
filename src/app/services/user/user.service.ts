import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "src/app/models/login.models";

@Injectable({
  providedIn: "root"
})
export class UserService {
  data;
  postsUrl: string = "http://localhost:8080/authenticate";
  constructor(private http: HttpClient) {}
  auth(user: User): Observable<JSON> {
    this.data = this.http.post<User>(this.postsUrl, user);
    return this.data;
  }
  saveToken(token) {
    localStorage.setItem("token", token.token);
  }
}
