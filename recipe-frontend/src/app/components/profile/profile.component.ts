import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Recipe } from 'src/app/models/recipe';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  recipes: Recipe[] = [];
  count = 1;
  notScrolling = true;

  constructor(private router: Router, private localStorageService: LocalStorageService,
              private recipeService: RecipeService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getOwnRecipes();
  }

  addRecipe() {
    this.router.navigate(['profile/add-recipe']);
  }

  logout() {
    this.localStorageService.remove("token");
    this.router.navigate(['welcome-page']);
  }

  getOwnRecipes() {
    this.spinner.show();
    this.recipeService.getOwnRecipes().subscribe(response => {
      this.recipes = this.recipes.concat(response);
      this.notScrolling = true;
      this.spinner.hide();
    });
  }

  onScroll() {
    if(this.notScrolling){
      this.spinner.show();
      this.notScrolling = false;
      this.count++;
      this.recipeService.getOwnRecipes(this.count).subscribe(response => {
        this.recipes = this.recipes.concat(response);
        this.notScrolling = true;
        this.spinner.hide();
    });
    }
  }
}
