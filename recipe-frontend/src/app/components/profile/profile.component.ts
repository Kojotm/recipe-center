import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private router: Router,
              public socialAuthService: SocialAuthService,
              private authGuardService: AuthGuardService) {
  }

  logout() {
    this.socialAuthService.signOut()
      .then(() => {
        this.authGuardService.loggedOutSuccessfully();
        this.router.navigate(['welcome-page'])});
  }
}
