import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private router: Router,
              private socialAuthService: SocialAuthService,
              private recipeService: RecipeService) { }

  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['']));
  }

  setFilterToBasic() {
    this.recipeService.setRecipeFilterToBasic();
  }
}
