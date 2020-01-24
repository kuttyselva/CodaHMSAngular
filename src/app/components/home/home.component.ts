import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/app/models/user.models";
import { Store, select } from '@ngrx/store';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: Observable<User>;
  userData:User;
  constructor(private router: Router,private store: Store<{ user: User }>) {
    this.user = this.store.pipe(select('user'));
    console.log(this.userData);
  }
  ngOnInit() {
    this.store.select("user").subscribe(data=>{
      this.userData=data;
    });
    if (!localStorage.getItem("token")) {
      this.router.navigate(["/login"]);
      console.log(this.user);
    }
  }
}
