import { Component, Input } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Difficulty } from 'src/app/models/difficulty';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {

  @Input() recipe = {} as Recipe;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "clock",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/clock.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "meal-kcal",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/meal-kcal.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "serving",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/serving.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "speedometer",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/speedometer.svg")
    );
  }

  getDifficulty() {
    return Difficulty[this.recipe.difficulty];
  }
}
