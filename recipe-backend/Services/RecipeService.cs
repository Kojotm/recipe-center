using Microsoft.EntityFrameworkCore;
using Models;
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
                throw new NullReferenceException();
            }

            return MapToDtoRecipe(recipe);
        }

        public DRecipe[] PantryFilter(PantryFilter filter, int pageNumber, int pageSize)
        {
            Recipe[] recipes = context.Recipes.ToArray();

            List<DRecipe> recipesToReturn = new();

            foreach(var recipe in recipes)
            {
                int ingredientCounter = 0;

                foreach (var ingredient in recipe.Ingredients)
                {
                    bool ingredientFound = false;

                    foreach(var filterIngr in filter.Ingredients)
                    {
                        if (ingredient.ToLower().Contains(filterIngr.ToLower()))
                        {
                            ingredientCounter++;
                            ingredientFound = true;
                            break;
                        }
                    }

                    if(ingredientFound)
                    {
                        continue;
                    }
                }

                if(recipe.Ingredients.Length != 0 &&  recipe.Ingredients.Length - filter.maxAllowedMissingIngredients <= ingredientCounter)
                {
                    recipesToReturn.Add(MapToDtoRecipe(recipe));
                }
            }

            return recipesToReturn.OrderBy(recipe => recipe.Id).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToArray();
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

            return DtoRecipes.OrderBy(recipe => recipe.Id).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToArray();
        }

        private DRecipe MapToDtoRecipe(Recipe recipe)
        {
            return new DRecipe
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
                Difficulty = CalculateDifficulty(recipe)
            };
        }

        private Difficulty CalculateDifficulty(Recipe recipe)
        {
            double ratio = ((recipe.DurationInMinutes ?? 0) * 2 + recipe.Ingredients.Length) / 3;

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
