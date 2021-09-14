import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Recipe } from "../models/recipe";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private readonly endpoint = 'api/recipes/';

    constructor(private http: HttpClient) { }

    getRecipes() : Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${environment.apiEndpoint}${this.endpoint}`);
    }

    getRecipeById(id: number) : Observable<Recipe | undefined> {
        return this.http.get<Recipe>(`${environment.apiEndpoint}${this.endpoint}${id}`);
    }
}