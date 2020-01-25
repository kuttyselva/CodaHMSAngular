import { Injectable } from "@angular/core";
import { Patient } from "src/app/models/patient.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class PatientService {
  postsUrl: string = "http://localhost:8080/patients/";

  constructor(private http: HttpClient) {}

  addPatient(patient: Patient):Observable<Patient> {
    
   return this.http.post<Patient>(this.postsUrl + "create", patient);
  }
}
