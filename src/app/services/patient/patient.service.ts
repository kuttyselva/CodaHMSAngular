import { Injectable } from "@angular/core";
import { Patient } from "src/app/models/patient.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Response } from 'src/app/models/response.models';

@Injectable({
  providedIn: "root"
})
export class PatientService {
  postsUrl: string = "http://localhost:8080/patients";

  constructor(private http: HttpClient) {}

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.postsUrl + "/create", patient);
  }
  updatePatient(patient: Patient): Observable<any> {
    return this.http.post<Patient>(this.postsUrl + "/patient/update", patient);
  }
  getPatients(): Observable<Response> {
    return this.http.get<any>("http://localhost:8080/patients/all");
  }
}
