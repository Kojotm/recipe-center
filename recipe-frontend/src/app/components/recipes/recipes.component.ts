import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PagedResult } from 'src/app/models/pagedResult';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: PagedResult<Recipe> = new PagedResult<Recipe>();
  selectedRecipe?: Recipe;

  private recipesSub: Subscription = new Subscription();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipesSub = this.recipeService.recipes.subscribe(result => this.recipes = result);
    this.recipeService.getRecipes();
  }

  onSelect(recipe: Recipe){
    this.selectedRecipe = recipe;
  }
}
