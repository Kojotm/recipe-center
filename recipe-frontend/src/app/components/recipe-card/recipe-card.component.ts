import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

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
  }

  ngOnInit(): void {

  }

}
