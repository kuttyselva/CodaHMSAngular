import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Login } from "src/app/models/login.models";
import * as jwt_decode from "jwt-decode";
import { User } from "src/app/models/user.models";
import { Store } from "@ngrx/store";
import { UserAdd } from "src/app/actions/user.action";
import { Patient } from "src/app/models/patient.models";
@Injectable({
  providedIn: "root"
})
export class UserService {
  data;
  userData;
  patients: Patient[];
  postsUrl: string = "http://localhost:8080/authenticate";
  constructor(private http: HttpClient, private store: Store<{ user: User }>) {}
  auth(user: Login): Observable<JSON> {
    this.data = this.http.post<Login>(this.postsUrl, user);
    return this.data;
  }
  saveToken(token) {
    localStorage.setItem("token", token.token);
  }

  setUserData(tokentData) {
    this.userData = jwt_decode(tokentData);
    this.store.dispatch(new UserAdd(this.userData.user));
  }
  getDoctorPatients(id): Observable<any> {
    let params = new HttpParams();
    params = params.set("doctorID", id);
    this.data = this.http.get<any>("http://localhost:8080/doctors/patients/",{params});
    return this.data;
  }

  getPatientDoctors(id): Observable<any> {    
    this.data = this.http.get<any>("http://localhost:8080/patients/patient/"+id+"/getDoctors");
    return this.data;
  }
  getUser(data) {
    var decoded = jwt_decode(data.token).user;
    return decoded;
  }
  
}
