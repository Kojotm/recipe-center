import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { SearchRecipesComponent } from './components/search-recipes/search-recipes.component';

const routes: Routes = [
  { path: 'search-recipes/id/:id', component: RecipeDetailComponent},
  { path: 'search-recipes', component: SearchRecipesComponent },
  { path: '', redirectTo: 'search-recipes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
