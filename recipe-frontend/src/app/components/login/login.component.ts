import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth-service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  show = false;

  constructor(private authService: AuthService, private router: Router,
              private snackBar: MatSnackBar, private localStorageService: LocalStorageService,
              private spinner: NgxSpinnerService) {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
   }

  ngOnInit(): void {
  }

  login() {
    let login = new Login();
    login.email = this.formGroup.get('email')?.value;
    login.password = this.formGroup.get('password')?.value;

    this.spinner.show();
    this.authService.login(login).subscribe(response => {
      this.localStorageService.set("token", response.token);
      this.localStorageService.set("id", response.userId.toString());

      this.router.navigate(["welcome-page"]);
      this.spinner.hide();

      let snackbarConfig = new MatSnackBarConfig();

      snackbarConfig.panelClass = ["success"];
      snackbarConfig.duration = 3500;

      this.snackBar.open("Logged in", "Close", snackbarConfig);
    }, error => {
      this.spinner.hide();
      let snackbarConfig = new MatSnackBarConfig();

      snackbarConfig.panelClass = ["fail"];
      this.snackBar.open(error.error, "Close", snackbarConfig);
    })
  }
}
