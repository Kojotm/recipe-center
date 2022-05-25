using Microsoft.EntityFrameworkCore;
using Models;
using Models.Dto;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services
{
    public class RecipeService
    {
        private const double lowerThreshold = 33.333;
        private const double upperThreshold = 83.333;

        private readonly RecipeContext context;

        public RecipeService(RecipeContext context)
        {
            this.context = context;
        }

        public string[] GetAllCategories()
        {
            var recipes = context.Recipes.ToArray();

            string[] result = Array.Empty<string>();

            foreach (var recipe in recipes)
            {
                result = result.Union(recipe.Categories).ToArray();
            }

            return result;
        }

        public async Task<DRecipe> GetRecipeById(int id)
        {
            Recipe recipe = await context.Recipes.Include(r => r.NutritionInfo).FirstOrDefaultAsync(r => r.Id == id);

            if(recipe == null)
            {
                throw new NullReferenceException("No such recipe");
            }

            return MapToDtoRecipe(recipe);
        }

        public DRecipe[] GetRecipeByUserId(int userId, int pageNumber, int pageSize)
        {
            List<Recipe> recipes = context.Recipes.Include(r => r.NutritionInfo).Where(r => r.UserId == userId).ToList();
            List<DRecipe> dRecipes = new();

            foreach (var recipe in recipes)
            {
                dRecipes.Add(MapToDtoRecipe(recipe));
            }

            return AddImages(dRecipes.OrderBy(recipe => recipe.Id).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToArray());
        }

        public DRecipe[] PantryFilter(PantryFilter filter, int pageNumber, int pageSize)
        {
            Recipe[] recipes = context.Recipes.ToArray();

            List<DRecipe> recipesToReturn = new();

            foreach (var recipe in recipes)
            {
                foreach (var ingredient in recipe.Ingredients)
                {
                    List<string> foundIngredients = new();
                    foreach (var filterIngr in filter.Ingredients)
                    {
                        if (ingredient.ToLower().Contains(filterIngr.ToLower()))
                        {
                            foundIngredients.Add(filterIngr);
                        }
                    }

                    if (recipe.Ingredients.Length != 0 && recipe.Ingredients.Length - filter.maxAllowedMissingIngredients <= foundIngredients.Count)
                    {
                        DRecipe dRecipe = MapToDtoRecipe(recipe, foundIngredients);
                        recipesToReturn.Add(dRecipe);
                    }
                }
            }

            return AddImages(recipesToReturn.OrderBy(recipe => recipe.Id).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToArray());
        }

        public bool AddRecipe(Recipe recipeToAdd)
        {
            context.Add(recipeToAdd);

            if(context.SaveChanges() != 0)
            {
                return true;
            }

            return false;
        }

        public DRecipe[] FilterRecipes(RecipeFilter filter, int pageNumber, int pageSize)
        {
            Recipe[] filteredRecipes = context.FilterRecipes(filter).ToArray();

            HashSet<DRecipe> DtoRecipes = new();

            if (!string.IsNullOrEmpty(filter.SearchPhrase))
            {
                foreach (var recipe in filteredRecipes)
                {
                    if (recipe.Name.ToLower().Contains(filter.SearchPhrase.ToLower()))
                    {
                        DtoRecipes.Add(MapToDtoRecipe(recipe));
                        continue;
                    }

                    bool foundIngredient = false;

                    foreach (var ingredient in recipe.Ingredients)
                    {
                        if (ingredient.ToLower().Contains(filter.SearchPhrase.ToLower()))
                        {
                            DtoRecipes.Add(MapToDtoRecipe(recipe));
                            foundIngredient = true;
                            break;
                        }
                    }

                    if (foundIngredient)
                    {
                        continue;
                    }

                    foreach (var description in recipe.Description)
                    {
                        if (description.ToLower().Contains(filter.SearchPhrase.ToLower()))
                        {
                            DtoRecipes.Add(MapToDtoRecipe(recipe));
                            break;
                        }
                    }
                }

                foreach (DRecipe recipe in DtoRecipes)
                {
                    if (filter.Difficulty != Difficulty.None && filter.Difficulty != recipe.Difficulty)
                    {
                        DtoRecipes.Remove(recipe);
                    }
                }
            }
            else
            {
                foreach (Recipe recipe in filteredRecipes)
                {
                    DRecipe dRecipe = MapToDtoRecipe(recipe);

                    if (filter.Difficulty == Difficulty.None || filter.Difficulty == dRecipe.Difficulty)
                    {
                        DtoRecipes.Add(dRecipe);
                    }
                }
            }

            return AddImages(DtoRecipes.OrderBy(recipe => recipe.Id).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToArray());
        }

        public Recipe AddRecipeToRecipe(AddRecipe addRecipe)
        {
            return new Recipe
            {
                Name = addRecipe.Name,
                Description = addRecipe.Description.Split("\n"),
                Ingredients = addRecipe.Ingredients.Split("\n"),
                Categories = addRecipe.Categories.Split("\n"),
                Calories = addRecipe.Calories,
                Servings = addRecipe.Servings,
                DurationInMinutes = addRecipe.DurationInMinutes,
                NutritionInfo = new NutritionInfo
                {
                    Sodium = addRecipe.Sodium,
                    Protein= addRecipe.Protein,
                    Fats = addRecipe.Fats,
                },
                UserId = addRecipe.UserId,
                ImageId = 1,
            };
        }

        public bool DeleteRecipe(int id)
        {
            return context.DeleteRecipe(id);
        }

        public DRecipe[] GetRecipesForMealPlanner(MealPlanCalculation mealPlanCalculation)
        {
            double calorieIntake = (CalculateCalories(mealPlanCalculation) / 3) * 1.2;

            double lowerBound = calorieIntake - 100;

            return GetRecipesByCalories(calorieIntake, lowerBound);
        }

        private DRecipe[] GetRecipesByCalories(double upperBound, double lowerBound)
        {
            Recipe[] recipes = context.MealPlanFilter(upperBound, lowerBound).ToArray();

            List<Recipe> selectedRecipes = new();

            Random rnd = new();

            for (int i = 0; i < 7; i++)
            {
                selectedRecipes.Add(recipes[rnd.Next(recipes.Length)]);
            }

            List<DRecipe> dtoRecipes = new();

            foreach (var recipe in selectedRecipes)
            {
                dtoRecipes.Add(MapToDtoRecipe(recipe));
            }

            return AddImages(dtoRecipes.ToArray());
        }

        private int CalculateCalories(MealPlanCalculation mealPlanCalculation)
        {

            double bmr = 0;

            switch (mealPlanCalculation.Gender)
            {
                case "Male":
                    bmr = 66.47 + (13.75 * mealPlanCalculation.Weight) + (5.003 * mealPlanCalculation.Height)
                                - (6.755 * mealPlanCalculation.Age);
                    break;

                case "Female":
                    bmr = 65.51 + (9.563 * mealPlanCalculation.Weight) + (1.85 * mealPlanCalculation.Height)
                                - (4.676 * mealPlanCalculation.Age);
                    break;

                default:
                    break;
            }

            double amr = bmr;

            switch (mealPlanCalculation.Activity)
            {
                case "Sedentary":
                    amr *= 1.2;
                    break;

                case "Lightly active":
                    amr *= 1.375;
                    break;

                case "Moderately active":
                    amr *= 1.55;
                    break;

                case "Active":
                    amr *= 1.725;
                    break;

                case "Very active":
                    amr *= 1.9;
                    break;

                default:
                    break;
            }

            return (int)amr;
        }

        private DRecipe[] AddImages(DRecipe[] dRecipes)
        {
            foreach (var dto in dRecipes)
            {
                dto.Image = context.GetImageById(dto.ImageId);
            }

            return dRecipes;
        }

        private PantryRecipe[] AddImages(PantryRecipe[] pantryRecipes)
        {
            foreach (var dto in pantryRecipes)
            {
                dto.Recipe.Image = context.GetImageById(dto.Recipe.ImageId);
            }

            return pantryRecipes;
        }

        private DRecipe MapToDtoRecipe(Recipe recipe, List<string> foundIngredients = null)
        {
            return new()
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Description = recipe.Description,
                Ingredients = recipe.Ingredients,
                Categories = recipe.Categories,
                Calories = recipe.Calories,
                Servings = recipe.Servings,
                DurationInMinutes = recipe.DurationInMinutes,
                NutritionInfo = recipe.NutritionInfo,
                Difficulty = CalculateDifficulty(recipe),
                UserId = recipe.UserId,
                ImageId = recipe.ImageId,
                Image = null,
                IngredientsFound = foundIngredients
            };
        }

        private Difficulty CalculateDifficulty(Recipe recipe)
        {
            double ratio = ((recipe.DurationInMinutes ?? 0) * 1.5 + recipe.Ingredients.Length) / 3;

            if(ratio < lowerThreshold)
            {
                return Difficulty.Easy;
            }
            else if (ratio > upperThreshold)
            {
                return Difficulty.Hard;
            }
            else
            {
                return Difficulty.Medium;
            }
        }
    }
}
