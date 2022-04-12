import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeService } from './services/recipe.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { FormsModule } from '@angular/forms';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { FilterComponent } from './components/filter/filter.component';
import { MatCardModule } from '@angular/material/card';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from "ngx-spinner";
import { AboutComponent } from './components/about/about.component';
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';

const MaterialComponents = [
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatFormFieldModule
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeCardComponent,
    FilterComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    MaterialComponents,
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
