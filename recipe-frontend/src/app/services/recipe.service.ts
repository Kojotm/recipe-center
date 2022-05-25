import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { AddRecipe } from "../models/add-recipe";
import { MealPlanCalculation } from "../models/meal-plan-calculation";
import { Recipe } from "../models/recipe";
import { RecipeFilter } from "../models/recipeFilter";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    mealPlanRecipes: Recipe[] = [];
    mealPlanClaculation = new MealPlanCalculation();
    recipeFilter = new RecipeFilter();
    private readonly endpoint = 'api/recipes/';

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

    setRecipeFilterToBasic() {
      this.recipeFilter = new RecipeFilter();
    }

    getRecipeById(id: number) : Observable<Recipe | undefined> {
        return this.http.get<Recipe>(`${environment.apiEndpoint}${this.endpoint}${id}`);
    }

    applyFilter(pageNumber: number = 1, pageSize: number = 10) {
        const params = new HttpParams().set('pageNumber', pageNumber.toString())
                                       .set('pageSize', pageSize.toString())
                                       .set('token', (this.localStorageService.get("token") || ""));
        return this.http.put<Recipe[]>(`${environment.apiEndpoint}${this.endpoint + "filter"}`, this.recipeFilter, {params: params});
    }

    addRecipe(recipe: AddRecipe) {
      const params = new HttpParams().set('token', (this.localStorageService.get("token") || ""))

      return this.http.post<boolean>(`${environment.apiEndpoint}${this.endpoint + "add-recipe"}`, recipe, {params: params});
    }

    getOwnRecipes(pageNumber: number = 1, pageSize: number = 10) {
     let userId = (this.localStorageService.get("id") || "");


      const params = new HttpParams().set('pageNumber', pageNumber.toString())
                                     .set('pageSize', pageSize.toString())
                                     .set('userId', (this.localStorageService.get("id") || 0));

      return this.http.post<Recipe[]>(`${environment.apiEndpoint}${this.endpoint + "get-by-user-id"}`, userId, {params: params});
    }

    deleteRecipe(recipeId: number | undefined) {
      let id = (recipeId || -1).toString()

      return this.http.delete<boolean>(`${environment.apiEndpoint}${this.endpoint + "delete-recipe/"}${id}`);
    }

    mealPlanCalculation(mealPlanCalculation: MealPlanCalculation) {
      return this.http.put<Recipe[]>(`${environment.apiEndpoint}${this.endpoint + "meal-plan-calculation"}`, mealPlanCalculation);
  }
}
