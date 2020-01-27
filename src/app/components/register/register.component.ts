import { Component, OnInit } from "@angular/core";
import { PatientService } from "src/app/services/patient/patient.service";
import { Patient } from "src/app/models/patient.models";
import { Router } from "@angular/router";
import { Doctor } from "src/app/models/doctor.models";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { passwordMatchValidator } from 'src/app/validators/nameValidator.validator';
@Component({
  selector: "app-reg-patient",
  templateUrl: "./reg-patient.component.html",
  styleUrls: ["./reg-patient.component.css"]
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  role: boolean;
  constructor(
    private router: Router,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private formBuilder: FormBuilder
  ) { }
  patient: Patient;
  regForm: FormGroup;

  ngOnInit() {
    if (this.router.url.search("/patient") !== -1) {
      this.role = true;
    } else this.role = false;
    this.regForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      age: ["", Validators.required],
      location: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(4)]],
      spec: ["", Validators.required],
      phone: ["", [Validators.required, Validators.min(10)]]
    },{validator:passwordMatchValidator});
   
  }

  get f() { return this.regForm.controls; }

  regUser(form: FormGroup) {
    console.log(form);
    this.submitted = true;
    if (this.regForm.invalid) {
      return;
    }
    if (this.role) {
      this.createPatient(form.value.name, form.value.password, form.value.age, form.value.phone, form.value.location, form.value.spec);
    } else {
      this.createDoctor(form.value.name, form.value.password, form.value.age, form.value.phone, form.value.location, form.value.spec);
    }
  }

  createPatient(name, password, age, phone, location, disease) {

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
          this.submitted = true;
          console.log(err);
        }
      );

  }

  createDoctor(name, password, age, phone, location, speciality) {

    this.doctorService
      .addDoctor({
        name,
        password,
        age,
        phone,
        location,
        speciality
      } as Doctor)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(["/"]);
        },
        err => {
          this.submitted = true;
          console.log(err);
        }
      );

  }
}
