import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddRecipe } from 'src/app/models/add-recipe';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent {

  formGroup: FormGroup;

  constructor(private recipeService: RecipeService, private localStorageService: LocalStorageService) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required]),
      ingredients: new FormControl('', []),
      categories: new FormControl('', []),
      calories: new FormControl('0', [Validators.required, Validators.min(0)]),
      servings: new FormControl('0', [Validators.required, Validators.min(0)]),
      durationInMinutes: new FormControl('0', [Validators.required, Validators.min(0)]),
      fats: new FormControl('0', [Validators.required, Validators.min(0)]),
      protein: new FormControl('0', [Validators.required, Validators.min(0)]),
      sodium: new FormControl('0', [Validators.required, Validators.min(0)]),
    });
  }

  clear() {
    // this.registerForm.patchValue({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   confirmEmail: "",
    //   password: "",
    //   confirmPassword: ""
    // });
  }

  onSubmit() {
    let recipe: AddRecipe = new AddRecipe();
    recipe.name = this.formGroup.get('name')?.value;
    recipe.description = this.formGroup.get('description')?.value;
    recipe.ingredients = "apple\nbanana";
    recipe.categories = "christmas\nhalloween\npride";
    recipe.calories = 2000;
    recipe.servings = 6;
    recipe.durationInMinutes = 180;
    recipe.fats = 2;
    recipe.protein = 5;
    recipe.sodium = 794;
    recipe.userId = this.localStorageService.get("id");

    this.recipeService.addRecipe(recipe).subscribe();
  }

}
