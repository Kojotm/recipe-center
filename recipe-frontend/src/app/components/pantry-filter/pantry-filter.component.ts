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
  ingredientList: string[] = [];

  @Output() filterChanged = new EventEmitter<any>();

  constructor(private pantryService: PantryService) { }

  addIngredient() {
    if(this.ingredientToAdd) {
      this.ingredientList.push(this.ingredientToAdd);
      this.ingredientToAdd = "";
    }
  }

  removeIngredient(index: number) {
    this.ingredientList.splice(index, 1);
  }

  applyFilter() {
    this.pantryService.pantryFilter = this.filter;
    this.filterChanged.emit();
  }
}
