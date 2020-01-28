import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.models';
import { Observable } from 'rxjs';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Store, select } from '@ngrx/store';
import { PatientAdd } from 'src/app/actions/patient.actions';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
patients:Patient[];

  constructor(private patientService:PatientService,private store:Store<{ patients: Patient[] }>){
  }

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.patientService.getPatients().subscribe(data => {
      this.patients = data.object;
      this.store.dispatch(new PatientAdd(this.patients));
    });
  }

}
