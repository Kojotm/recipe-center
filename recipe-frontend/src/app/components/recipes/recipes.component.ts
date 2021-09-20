import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  selectedRecipe?: Recipe;
  count = 2;
  notScrolling = true;
  private readonly endpoint = 'api/recipes/';


  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.initLoad(1, 20);
  }

  initLoad(pageNumber: number, pageSize: number){
    const params = new HttpParams().set('pageNumber', pageNumber.toString())
                                   .set('pageSize', pageSize.toString());
    this.http.get<Recipe[]>(`${environment.apiEndpoint}${this.endpoint}`, {params: params}).subscribe(data => this.recipes = data);
  }

  onScroll() {
    if(this.notScrolling){
      this.spinner.show();
      this.notScrolling = false;
      const params = new HttpParams().set('pageNumber', this.count.toString())
                                     .set('pageSize', "20");
      this.http.get<Recipe[]>(`${environment.apiEndpoint}${this.endpoint}`, {params: params}).subscribe(data => {
        this.recipes = this.recipes.concat(data);
        this.count++;
        this.notScrolling = true;
        this.spinner.hide();
      });
    }
  }

  onSelect(recipe: Recipe){
    this.selectedRecipe = recipe;
  }
}
