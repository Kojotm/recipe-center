import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.scss']
})
export class SearchRecipesComponent implements OnInit {
  selectedRecipe?: Recipe;
  recipes!: Recipe[];
  notScrolling = true;

  constructor(private spinner: NgxSpinnerService, public recipeService: RecipeService) { }

  ngOnInit(): void {
    this.initLoad();
  }

  initLoad(){
    this.spinner.show();
    this.recipeService.applyFilter().subscribe(response => {
      this.recipes = response;
      this.spinner.hide();
    });
  }
}
