import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  selectedRecipe?: Recipe;

  @Input() recipes!: Recipe[];

  count = 1;
  notScrolling = true;

  constructor(private spinner: NgxSpinnerService, public recipeService: RecipeService) { }

  onScroll() {
    if(this.notScrolling){
      this.spinner.show();
      this.notScrolling = false;
      this.count++;
      this.recipeService.applyFilter(this.count).subscribe(response => {
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
