import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Difficulty } from 'src/app/models/difficulty';
import { RecipeFilter } from 'src/app/models/recipeFilter';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  pageNum = 1;
  filter =  new RecipeFilter();
  selectedDifficulty = 3;

  difficulties = Object.keys(Difficulty).splice(Object.values(Difficulty).length / 2, Object.values(Difficulty).length / 2);

  @Output() filterChanged = new EventEmitter<any>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    console.log(this.difficulties);
  }

  changeDifficulty(value: any) {
    console.log(value);
    console.log(Difficulty[value]);

    this.selectedDifficulty = Number(Difficulty[value]);
  }

  onEnterPress() {
    console.log(this.selectedDifficulty);
    this.filter.difficulty = this.selectedDifficulty;
    this.recipeService.recipeFilter = this.filter;
    this.filterChanged.emit();
  }
}
