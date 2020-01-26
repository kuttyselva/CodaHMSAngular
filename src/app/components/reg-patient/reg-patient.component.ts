import { Component, OnInit } from "@angular/core";
import { PatientService } from "src/app/services/patient/patient.service";
import { Patient } from "src/app/models/patient.models";
import { Router } from "@angular/router";

@Component({
  selector: "app-reg-patient",
  templateUrl: "./reg-patient.component.html",
  styleUrls: ["./reg-patient.component.css"]
})
export class RegPatientComponent implements OnInit {
  invalid: boolean = false;
  constructor(private router: Router, private patientService: PatientService) {}
  patient: Patient;
  ngOnInit() {}
  createPatient(name, password, age, phone, location, disease) {
    if (name.length > 3 && password.length > 3 && age && phone.length >4 && disease.length > 1 && location.length > 1) {
      this.patientService
        .addPatient({
          name,
          password,
          age,
          phone,
          location,
          disease
        } as Patient)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(["/"]);
          },
          err => {
            this.invalid = true;
            console.log(err);
          }
        );
    }
    else{
      this.invalid=true;
    }
  }
}
