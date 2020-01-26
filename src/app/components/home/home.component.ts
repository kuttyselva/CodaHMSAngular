import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/app/models/user.models";
import { Store, select } from "@ngrx/store";
import { UserService } from "src/app/services/user/user.service";
import { Patient } from "src/app/models/patient.models";
import { UserAdd } from "src/app/actions/user.action";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: Observable<User>;
  patients: Observable<Patient[]>;
  docPatients: Patient[];
  userData: User;
  docPatientslength;
  constructor(
    private router: Router,
    private store: Store<{ user: User }>,
    private userService: UserService
  ) {
    this.user = this.store.pipe(select("user"));
    console.log(this.userData);
  }
  ngOnInit() {
    this.store.select("user").subscribe(data => {
      this.userData = data;
    });
    if (localStorage.getItem("token")) {
      this.userService.setUserData(localStorage.getItem("token"));
      this.userService.getDoctorPatients(this.userData.id).subscribe(data => {
        this.store.dispatch(new UserAdd(data.object[0]));
        this.docPatients=this.userData.patientList;
        this.docPatientslength=this.docPatients.length;
      });
    }
    if (!localStorage.getItem("token")) {
      this.router.navigate(["/login"]);
      console.log(this.user);
    }
  }
  updateData(name,age,phone,location,spec){
    console.log(name,age,phone,location,spec);
  }
}
