import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeFilter } from 'src/app/models/recipeFilter';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  pageNum = 1;
  filter = new RecipeFilter();

  @Output() filterChanged = new EventEmitter<any>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {

  }

  onEnterPress() {
    this.recipeService.recipeFilter = this.filter;
    this.filterChanged.emit();
  }
}
