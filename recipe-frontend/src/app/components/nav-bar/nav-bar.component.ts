import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(private recipeService: RecipeService,
     private localStorageService: LocalStorageService,
     private jwtHelperService: JwtHelperService) { }

  isLoggedIn() {
    let token = this.localStorageService.get("token");

    return token !== null && !this.jwtHelperService.isTokenExpired(token);
  }

  setFilterToBasic() {
    this.recipeService.setRecipeFilterToBasic();
  }
}
