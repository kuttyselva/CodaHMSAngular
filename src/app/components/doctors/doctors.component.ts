import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.models';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Store, select } from '@ngrx/store';
import { DoctorAdd } from 'src/app/actions/doctor.actions';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[];

  constructor(private doctorService:DoctorService,private store:Store<{ doctors: Doctor[] }>){
  }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.doctorService.getDoctors().subscribe(data => {
      this.doctors = data.object;
      this.store.dispatch(new DoctorAdd(this.doctors));
    });
  }

}
