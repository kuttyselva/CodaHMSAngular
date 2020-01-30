import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient/patient.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { User } from 'src/app/models/user.models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  patientEntryForm: FormGroup;
  invalid: boolean;
  user: User;
  valid: boolean;
  constructor(private formBuilder: FormBuilder, private patientService: PatientService,
    private doctorService: DoctorService, private store: Store<{ user: User }>) {

  }
  ngOnInit() {
    this.patientEntryForm = this.formBuilder.group({
      name: [''],
      disease: [''],
      id: [''],
      phone: ['']
    });
    this.store.select('user').subscribe(data => {
      this.user = data;
    });

  }
  patientEntry(patientEntryForm: FormGroup) {
    this.doctorService.addEntry(this.user.id, patientEntryForm.value.id).subscribe((data) => {
      this.valid = true;
    }, err => {
      this.invalid = true;
    });
  }
  getPatient(patientEntryForm: FormGroup) {
    this.patientService.getPatient(patientEntryForm.value.id).subscribe((data) => {
      if (data.object) {
        this.invalid = false;
        patientEntryForm.setValue({
          name: data.object.name,
          disease: data.object.disease,
          phone: data.object.phone,
          id: patientEntryForm.value.id
        });
      }
      else {
        this.invalid = true;
      }
    });
  }

}
