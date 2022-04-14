import { Component } from '@angular/core';

@Component({
  selector: 'app-pantry-filter',
  templateUrl: './pantry-filter.component.html',
  styleUrls: ['./pantry-filter.component.scss']
})
export class PantryFilterComponent {
  ingredientToAdd = "";
  ingredientList: string[] = [];

  constructor() { }

  addIngredient() {
    if(this.ingredientToAdd) {
      this.ingredientList.push(this.ingredientToAdd);
      this.ingredientToAdd = "";
    }
  }
}
