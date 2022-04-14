import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.scss']
})
export class PantryComponent {

  constructor(private spinner: NgxSpinnerService, private recipeService: RecipeService) { }

}
