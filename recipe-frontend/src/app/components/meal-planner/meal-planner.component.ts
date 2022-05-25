import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Activity } from 'src/app/models/activity';
import { MealPlanCalculation } from 'src/app/models/meal-plan-calculation';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.scss']
})
export class MealPlannerComponent implements OnInit {
  recipes: Recipe[] = [];
  mealPlanCalculation = new MealPlanCalculation();
  formGroup: FormGroup;
  gender = "";
  activity = "";
  activities = Object.values(Activity);
  selectedRecipe?: Recipe;
  count = 1;
  notScrolling = true;

  constructor(private recipeService: RecipeService, private spinner: NgxSpinnerService) {
    this.formGroup = new FormGroup({
      age: new FormControl('', [Validators.required, Validators.min(2)]),
      height: new FormControl('', [Validators.required, Validators.min(40)]),
      weight: new FormControl('', [Validators.required, Validators.min(10)]),
    });
   }

  ngOnInit(): void {
    this.recipes = this.recipeService.mealPlanRecipes;
    this.mealPlanCalculation = this.recipeService.mealPlanClaculation;
  }

   setGender(value: any) {
    this.gender = value;
  }

  setActivity(value: any) {
    this.activity = value;
  }

  onSubmit() {
    let mealPlanCalculation = new MealPlanCalculation();

    mealPlanCalculation.gender = this.gender;
    mealPlanCalculation.activity = this.activity;
    mealPlanCalculation.age = this.formGroup.get("age")?.value;
    mealPlanCalculation.height = this.formGroup.get("height")?.value;
    mealPlanCalculation.weight = this.formGroup.get("weight")?.value;

    this.recipeService.mealPlanClaculation = this.mealPlanCalculation;

    this.spinner.show();
    this.recipeService.mealPlanCalculation(mealPlanCalculation).subscribe(response => {
      this.recipes = response;
      this.recipeService.mealPlanRecipes = this.recipes;
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
    }
    );
  }

  onSelect(recipe: Recipe){
    this.selectedRecipe = recipe;
  }
}
