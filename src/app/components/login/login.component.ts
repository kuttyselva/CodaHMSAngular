import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { Login } from "src/app/models/login.models";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { User } from "src/app/models/user.models";
import { Observable } from "rxjs";
import { UserAdd } from "src/app/actions/user.action";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: Observable<User>;
  userData: User;
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<{ user: User }>
  ) {
    this.user = store.pipe(select("user"));
  }
  invalid: boolean = false;
  ngOnInit() {}
  login(username, password) {
    this.userService.auth({ username, password } as Login).subscribe(
      data => {
        this.userService.saveToken(data);
        this.userData = this.userService.getUser(data);
        this.store.dispatch(new UserAdd(this.userData));
        this.router.navigate(["/home"]);
      },
      err => {
        if (err) {
          this.invalid = true;
        }
      }
    );
  }
}
