import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MealPlannerComponent } from './components/meal-planner/meal-planner.component';
import { PantryComponent } from './components/pantry/pantry.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchRecipesComponent } from './components/search-recipes/search-recipes.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'search-recipes/id/:id', component: RecipeDetailComponent},
  { path: 'search-recipes', component: SearchRecipesComponent },
  { path: 'pantry', component: PantryComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome-page', component: WelcomePageComponent },
  { path: 'profile/add-recipe', component: RecipeFormComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'meal-planner', component: MealPlannerComponent },
  { path: '**', redirectTo: 'welcome-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
