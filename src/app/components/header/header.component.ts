import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient.models';
import { Store, select } from '@ngrx/store';
import { PatientAdd } from 'src/app/actions/patient.actions';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor(
    private router: Router,
    private store: Store<{ user: User }>,
  ) {
  }
  ngOnInit() {
    this.store.select('user').subscribe(data => {
      this.user = data;
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
