import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Patient } from "src/app/models/patient.models";
import { Store, select } from "@ngrx/store";
import { PatientAdd } from "src/app/actions/patient.actions";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store<{ patients: Patient[] }>,
    private userService: UserService
  ) {}
  ngOnInit() {}
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
  AddPatient() {
    const patient = new Patient();
    patient.name = "sele";
    patient.age = 10;
    patient.disease = "pepe";
    patient.location = "keke";
    patient.id = Math.floor(Math.random() * 20);
    patient.password = "";
    patient.phone = "1234567";
    console.log(patient);
    this.store.dispatch(new PatientAdd(patient));
  }
  
}
