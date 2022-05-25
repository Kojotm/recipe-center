import { Component, EventEmitter, Output } from '@angular/core';
import { PantryFilter } from 'src/app/models/pantryFilter';
import { PantryService } from 'src/app/services/pantry.service';

@Component({
  selector: 'app-pantry-filter',
  templateUrl: './pantry-filter.component.html',
  styleUrls: ['./pantry-filter.component.scss']
})
export class PantryFilterComponent {
  filter = new PantryFilter();
  ingredientToAdd = "";
  maxNumberOfMissingIngredients = 0;

  @Output() filterChanged = new EventEmitter<any>();

  constructor(private pantryService: PantryService) { }

  addIngredient() {
    if(this.ingredientToAdd) {
      this.filter.ingredients.push(this.ingredientToAdd);
      this.ingredientToAdd = "";
    }
  }

  removeIngredient(index: number) {
    this.filter.ingredients.splice(index, 1);
  }

  applyFilter() {
    this.filter.maxAllowedMissingIngredients = this.maxNumberOfMissingIngredients;

    this.pantryService.pantryFilter = this.filter;
    this.filterChanged.emit();
  }
}
