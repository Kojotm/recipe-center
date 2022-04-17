import { Component, EventEmitter, Output } from '@angular/core';
import { Difficulty } from 'src/app/models/difficulty';
import { RecipeFilter } from 'src/app/models/recipeFilter';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {
  filter =  new RecipeFilter();
  selectedDifficulty = 3;

  difficulties = Object.keys(Difficulty).splice(Object.values(Difficulty).length / 2, Object.values(Difficulty).length / 2);

  @Output() filterChanged = new EventEmitter<any>();

  constructor(private recipeService: RecipeService) { }

  changeDifficulty(value: any) {
    this.selectedDifficulty = Number(Difficulty[value]);
    this.filter.difficulty = this.selectedDifficulty;
  }

  applyFilter() {
    this.recipeService.recipeFilter = this.filter;
    this.filterChanged.emit();
  }
}
