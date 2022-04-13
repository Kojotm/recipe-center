import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Recipe } from 'src/app/models/recipe';
import { RecipeFilter } from 'src/app/models/recipeFilter';
import { RecipeService } from 'src/app/services/recipe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  selectedRecipe?: Recipe;
  recipes!: Recipe[];
  count!: number;
  notScrolling = true;
  private readonly endpoint = 'api/recipes/';


  constructor(private spinner: NgxSpinnerService, public recipeService: RecipeService) { }

  ngOnInit(): void {
    this.initLoad();
  }

  initLoad(){
    this.spinner.show();
    this.count = 1;
    this.recipeService.applyFilter().subscribe(response => {
        this.recipes = response;
      this.spinner.hide();
    });
  }

  onScroll() {
    if(this.notScrolling){
      this.spinner.show();
      this.notScrolling = false;
      this.count++;
      this.recipeService.applyFilter().subscribe(response => {
        this.recipes = this.recipes.concat(response);
        this.notScrolling = true;
        this.spinner.hide();
    });
    }
  }

  onSelect(recipe: Recipe){
    this.selectedRecipe = recipe;
  }
}
