import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PantryFilter } from '../models/pantryFilter';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class PantryService {
  public recipes: Recipe[] = [];
  public pantryFilter = new PantryFilter();
  private readonly endpoint = 'api/pantry/';

  constructor(private http: HttpClient) { }

  applyFilter(pageNumber: number = 1, pageSize: number = 20) {
    const params = new HttpParams().set('pageNumber', pageNumber.toString())
                                   .set('pageSize', pageSize.toString());
    return this.http.put<Recipe[]>(`${environment.apiEndpoint}${this.endpoint + "filter"}`, this.pantryFilter, {params: params});
  }
}
