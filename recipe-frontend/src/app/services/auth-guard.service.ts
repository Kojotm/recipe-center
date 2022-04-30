import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,
              private socialAuthService: SocialAuthService) {
  }

  getLoggedIn() {
    return this.loggedIn.asObservable();
  }

  loggedInSuccessfully() {
    this.loggedIn.next(true);
  }

  loggedOutSuccessfully() {
    this.loggedIn.next(false);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.socialAuthService.authState.pipe(
      map((socialUser: SocialUser) => !!socialUser),
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.loginWithGoogle();
        }
      })
    );
  }

  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        this.loggedIn.next(true);
        this.router.navigate(['']);
      });
  }
}
