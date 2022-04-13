import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router,
              private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['']));
  }
}
