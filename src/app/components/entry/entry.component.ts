import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient/patient.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  patientEntryForm: FormGroup;
  invalid: boolean;
  constructor(private formBuilder: FormBuilder, private patientService: PatientService ,private doctorService: DoctorService) { }

  ngOnInit() {
    this.patientEntryForm = this.formBuilder.group({
      name: ['', Validators.required],
      disease: ['', Validators.required],
      id: ['', Validators.required],
      phone: ['', Validators.required]

    });
  }
  patientEntry(patientEntryForm: FormGroup) {
    
 }
  getPatient(patientEntryForm: FormGroup) {
    this.patientService.getPatient(patientEntryForm.value.id).subscribe((data) => {
      if (data.object) {
        this.invalid=false;
        patientEntryForm.setValue({
          name: data.object.name,
          disease: data.object.disease,
          phone: data.object.phone,
          id: patientEntryForm.value.id
        });
      }
      else{
        this.invalid=true;
      }
    });
  }

}
