import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/app/models/user.models";
import { Store, select } from "@ngrx/store";
import { UserService } from "src/app/services/user/user.service";
import { Patient } from "src/app/models/patient.models";
import { UserAdd } from "src/app/actions/user.action";
import { stringify } from "querystring";
import { Doctor } from "src/app/models/doctor.models";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { PatientService } from "src/app/services/patient/patient.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: Observable<User>;
  patients: Observable<Patient[]>;
  docPatients: Patient[];
  patDoctors: Doctor[];
  valid: boolean=false;
  userData: User;
  docPatientslength;
  invalid: boolean;
  constructor(
    private router: Router,
    private store: Store<{ user: User }>,
    private userService: UserService,
    private doctorService: DoctorService,
    private patientService: PatientService
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
      if (this.userData.role == 2) {
        this.userService.getDoctorPatients(this.userData.id).subscribe(data => {
          this.store.dispatch(new UserAdd(data.object[0]));
          this.docPatients = this.userData.patientList;
          this.docPatientslength = this.docPatients.length;
        });
      } else {
        this.userService.getPatientDoctors(this.userData.id).subscribe(data => {
          this.store.dispatch(new UserAdd(data.object));
          this.docPatients = this.userData.doctorRecordList;
          this.docPatientslength = this.docPatients.length;
          console.log(data);
        });
      }
    }
    if (!localStorage.getItem("token")) {
      this.router.navigate(["/login"]);
      console.log(this.user);
    }
  }
  updateData(name, age, phone, location, spec) {
    if (this.userData.role == 2) {
      var speciality = spec;
      var id = this.userData.id;
      this.doctorService
        .updateDoctor({ name, age, phone, location, speciality, id } as Doctor)
        .subscribe(
          data => {
            this.userService
              .getDoctorPatients(this.userData.id)
              .subscribe(data => {
                this.store.dispatch(new UserAdd(data.object[0]));
                this.docPatients = this.userData.patientList;
                this.docPatientslength = this.docPatients.length;
                this.valid = true;
              });
            
          },
          err => {
            this.invalid = true;
          }
        );
    } else {
      var speciality = spec;
      var id = this.userData.id;
      this.patientService
        .updatePatient({
          name,
          age,
          phone,
          location,
          speciality,
          id
        } as Patient)
        .subscribe(
          //
          data => {
            this.userService
              .getPatientDoctors(this.userData.id)
              .subscribe(data => {
                this.store.dispatch(new UserAdd(data.object[0]));
                this.patDoctors = this.userData.doctorRecordList;
                this.docPatientslength = this.patDoctors.length;
                this.valid = true;
              });
          
          },
          err => {
            this.invalid = true;
          }
        );
    }
  }
}
