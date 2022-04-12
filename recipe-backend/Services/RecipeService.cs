using Models;
using Persistence;
using System;
using System.Linq;

namespace Services
{
    public class RecipeService
    {
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

        public Recipe[] FilterRecipes(RecipeFilter filter)
        {
            return context.FilterRecipes(filter).ToArray();
        }
    }
}
