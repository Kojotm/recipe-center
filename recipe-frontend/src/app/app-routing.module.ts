import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantryComponent } from './components/pantry/pantry.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { SearchRecipesComponent } from './components/search-recipes/search-recipes.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: 'search-recipes/id/:id', component: RecipeDetailComponent},
  { path: 'search-recipes', component: SearchRecipesComponent },
  { path: 'pantry', component: PantryComponent },
  { path: 'welcome-page', component: WelcomePageComponent},
  { path: 'profile', component: ProfileComponent},
  { path: '**', redirectTo: 'welcome-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
