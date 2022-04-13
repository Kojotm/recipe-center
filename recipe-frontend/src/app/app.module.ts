import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { FilterComponent } from './components/filter/filter.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { SearchRecipesComponent } from './components/search-recipes/search-recipes.component';
import { LoadingIndicatorComponent } from './components/shared/loading-indicator/loading-indicator.component';
import { RecipeListComponent } from './components/shared/recipe-list/recipe-list.component';
import { RecipeService } from './services/recipe.service';
import { PantryComponent } from './components/pantry/pantry.component';

const MaterialComponents = [
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeCardComponent,
    FilterComponent,
    AboutComponent,
    SearchRecipesComponent,
    LoadingIndicatorComponent,
    PantryComponent
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
  providers: [RecipeService,
              SocialAuthService,
              {
                provide: 'SocialAuthServiceConfig',
                useValue: {
                  autoLogin: true, //keeps the user signed in
                  providers: [
                    {
                      id: GoogleLoginProvider.PROVIDER_ID,
                      provider: new GoogleLoginProvider('944835087300-qvrk3m31re7oc96ujm4qdguuk05mcqvh.apps.googleusercontent.com')
                    }
                  ]
                }
              }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
