import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { User } from "src/app/models/login.models";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService,private router:Router) {}
  invalid: boolean=false;
  ngOnInit() {}
  login(username, password) {
    this.userService.auth({ username, password } as User).subscribe(
      data => {
        this.userService.saveToken(data);
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
