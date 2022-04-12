import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Recipe } from "../models/recipe";
import { Observable } from 'rxjs';
import { RecipeFilter } from "../models/recipeFilter";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    public recipes: Recipe[] = [];
    public recipeFilter = new RecipeFilter();
    public pageNumber: number = 1;
    public count: number = 0;
    private readonly endpoint = 'api/recipes/';

    constructor(private http: HttpClient) { }

    getRecipes(pageNumber: number = 1, pageSize: number = 20) {
        const params = new HttpParams().set('pageNumber', pageNumber.toString())
                                       .set('pageSize', pageSize.toString());
        this.http.get<Recipe[]>(`${environment.apiEndpoint}${this.endpoint}`, {params: params}).subscribe(data => {
            return data;
        });
    }

    getRecipeById(id: number) : Observable<Recipe | undefined> {
        return this.http.get<Recipe>(`${environment.apiEndpoint}${this.endpoint}${id}`);
    }

    applyFilter(pageNumber: number = 1, pageSize: number = 20) {
        const params = new HttpParams().set('pageNumber', pageNumber.toString())
                                       .set('pageSize', pageSize.toString());
        return this.http.put<Recipe[]>(`${environment.apiEndpoint}${this.endpoint + "filter"}`, this.recipeFilter, {params: params});
    }
}
