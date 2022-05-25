import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { Difficulty } from 'src/app/models/difficulty';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {

  @Input() recipe = {} as Recipe;
  @Input() isProfile = true;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,
              public router: Router, private recipeService: RecipeService, public dialog: MatDialog) {
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

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {name: this.recipe.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "yes") {
        this.recipeService.deleteRecipe(this.recipe.id).subscribe();
      }
    });
  }
}
