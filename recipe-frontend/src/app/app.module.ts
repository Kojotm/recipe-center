import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PantryFilterComponent } from './components/pantry-filter/pantry-filter.component';
import { PantryComponent } from './components/pantry/pantry.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { SearchRecipesComponent } from './components/search-recipes/search-recipes.component';
import { LoadingIndicatorComponent } from './components/shared/loading-indicator/loading-indicator.component';
import { RecipeListComponent } from './components/shared/recipe-list/recipe-list.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { RecipeService } from './services/recipe.service';
import { MealPlannerComponent } from './components/meal-planner/meal-planner.component';

const MaterialComponents = [
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatChipsModule,
  MatGridListModule,
  MatSnackBarModule,
  MatDialogModule
]

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeCardComponent,
    SearchFilterComponent,
    AboutComponent,
    SearchRecipesComponent,
    LoadingIndicatorComponent,
    PantryComponent,
    PantryFilterComponent,
    WelcomePageComponent,
    ProfileComponent,
    RecipeFormComponent,
    LoginComponent,
    RegisterComponent,
    DialogComponent,
    MealPlannerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    MaterialComponents,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://localhost:5001"], // TODO: update
        disallowedRoutes: []
      }
    })
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
