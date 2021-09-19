import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Recipe } from "../models/recipe";
import { PagedResult } from "../models/pagedResult";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    public recipes = new BehaviorSubject<PagedResult<Recipe>>(new PagedResult<Recipe>());
    public pageNumber: number = 1;
    public count: number = 0;
    private readonly endpoint = 'api/recipes/';

    constructor(private http: HttpClient) { }

    async getRecipes(pageNumber: number = 1, pageSize: number = 20) {
        const params = new HttpParams().set('pageNumber', pageNumber.toString())
                                       .set('pageSize', pageSize.toString());
        const pagedResponse =  await this.http.get<PagedResult<Recipe>>(`${environment.apiEndpoint}${this.endpoint}`, {params: params}).toPromise();
        this.recipes.next(pagedResponse);
    }

    getRecipeById(id: number) : Observable<Recipe | undefined> {
        return this.http.get<Recipe>(`${environment.apiEndpoint}${this.endpoint}${id}`);
    }
}