import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Recipe } from 'src/app/models/recipe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  private readonly endpoint = 'api/recipes/';
  selectedRecipe?: Recipe;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getRecipe();

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }

  getRecipe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<Recipe>(`${environment.apiEndpoint}${this.endpoint}${id}`).subscribe(data => {
      this.selectedRecipe = data;
      this.spinner.hide();
    });
  }

}
