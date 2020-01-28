import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { UserService } from "./services/user/user.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { InterceptorService } from "./services/interceptor.service";
import { HeaderComponent } from "./components/header/header.component";
import { StoreModule } from "@ngrx/store";
import { PatientReducer } from "./reducers/patient.reducers";
import { UserReducer } from "./reducers/user.reducer";
import { DoctorReducer } from "./reducers/doctor.reducers";

import { environment } from 'src/environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { PatientService } from './services/patient/patient.service';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { PatientsComponent } from './components/patients/patients.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { EntryComponent } from './components/entry/entry.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    PatientsComponent,
    DoctorsComponent,
    EntryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ patients: PatientReducer ,user:UserReducer,doctors:DoctorReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production 
    })
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    PatientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
