using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Persistence
{
    public class RecipeContext : DbContext
    {
        private static readonly char delimiter = ';';
        public RecipeContext(DbContextOptions<RecipeContext> options) : base(options) { }
        public DbSet<Recipe> Recipes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Recipe>()
                        .Property(e => e.Description)
                        .HasConversion(
                            v => string.Join(delimiter, v),
                            v => v.Split(delimiter, StringSplitOptions.RemoveEmptyEntries));

            modelBuilder.Entity<Recipe>()
                        .Property(e => e.Ingredients)
                        .HasConversion(
                            v => string.Join(delimiter, v),
                            v => v.Split(delimiter, StringSplitOptions.RemoveEmptyEntries));

            modelBuilder.Entity<Recipe>()
                        .Property(e => e.Categories)
                        .HasConversion(
                            v => string.Join(delimiter, v),
                            v => v.Split(delimiter, StringSplitOptions.RemoveEmptyEntries));
        }

        public IQueryable<Recipe> FilterRecipes(RecipeFilter filter)
        {
            IQueryable<Recipe> query = Recipes.Include(recipe => recipe.NutritionInfo);

            if (!string.IsNullOrEmpty(filter.SearchPhrase))
            {
                query = query.Where(recipe =>
                                    recipe.Name.ToLower().Contains(filter.SearchPhrase.ToLower())
                );
            }

            if (filter.MaxCalories >= 0)
            {
                query = query.Where(recipe => recipe.Calories <= filter.MaxCalories);
            }

            if (filter.MaxDurationInMinutes >= 0)
            {
                query = query.Where(recipe => recipe.DurationInMinutes <= filter.MaxDurationInMinutes);
            }

            if (filter.MinServings >= 0)
            {
                query = query.Where(recipe => recipe.Servings >= filter.MinServings);
            }

            return query;
        }
    }
}