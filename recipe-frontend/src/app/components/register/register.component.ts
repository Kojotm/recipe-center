import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private spinner: NgxSpinnerService) {
    this.formGroup = new FormGroup({
      firstName: new FormControl('', []),
      lastName: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
   }

  ngOnInit(): void {
  }

  register() {
    let user = new User();
    user.firstName = this.formGroup.get('firstName')?.value
    user.lastName = this.formGroup.get('lastName')?.value
    user.email = this.formGroup.get('email')?.value
    user.password = this.formGroup.get('password')?.value

    this.spinner.show();
    this.authService.register(user).subscribe(response => {
      this.router.navigate(["welcome-page"]);
      this.spinner.hide();
      let snackbarConfig = new MatSnackBarConfig();

      snackbarConfig.panelClass = ["success"];
      snackbarConfig.duration = 3500;

      this.snackBar.open("Registered successfully", "Close", snackbarConfig);
    }, error => {
      this.spinner.hide();
      let snackbarConfig = new MatSnackBarConfig();

      snackbarConfig.panelClass = ["fail"];
      this.snackBar.open(error.error, "Close", snackbarConfig);
    });
  }

  clear() {
    this.formGroup.reset();
  }

}
