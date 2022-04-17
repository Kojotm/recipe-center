import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Recipe } from 'src/app/models/recipe';
import { PantryService } from 'src/app/services/pantry.service';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.scss']
})
export class PantryComponent {
  recipes: Recipe[] = [];

  constructor(private spinner: NgxSpinnerService, private pantryService: PantryService) { }

  load(){
    this.spinner.show();
    this.pantryService.applyFilter().subscribe(response => {
      this.recipes = response;
      this.spinner.hide();
    });
  }

}
