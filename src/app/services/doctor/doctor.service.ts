import { Injectable } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }
  addDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>("http://localhost:8080/doctors/create", doctor);
  }

  updateDoctor(doctor:Doctor):Observable<any>{
    return this.http.post<Doctor>("http://localhost:8080/doctors/doctor/update",doctor);
  }
}
