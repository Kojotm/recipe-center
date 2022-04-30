import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  private loggedIn = false;
  loginSub = new Subscription();

  constructor(private recipeService: RecipeService,
              public authGuardService: AuthGuardService) { }

  ngOnInit(): void {
    this.loginSub = this.authGuardService.getLoggedIn().subscribe(bool => {
      this.loggedIn = bool;
    });
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  setFilterToBasic() {
    this.recipeService.setRecipeFilterToBasic();
  }

  ngOnDestroy(): void {
   if (this.loginSub) {
      this.loginSub.unsubscribe();
   }
  }
}
