using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Linq;

namespace Persistence
{
    public class RecipeContext : DbContext
    {
        private static readonly char delimiter = ';';

        public RecipeContext(DbContextOptions<RecipeContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Image> Images { get; set; }

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

        public void AddUser(User user)
        {
            Users.Add(user);
            SaveChanges();
        }

        public User GetRegisteredUserByEmail(string email)
        {
            return Users.Where(u => u.Email == email).FirstOrDefault();
        }

        public byte[] GetImageById(int id)
        {
            return Images.Where(u => u.Id == id).FirstOrDefault().ImageBytes;
        }

        public bool DeleteRecipe(int id)
        {
            var recipe = Recipes.Where(recipe => recipe.Id == id).FirstOrDefault();
            recipe.UserId = -1;
            return SaveChanges() > 0;
        }

        public IQueryable<Recipe> FilterRecipes(RecipeFilter filter)
        {
            IQueryable<Recipe> query = Recipes.Include(recipe => recipe.NutritionInfo);

            query = query.Where(recipe => !recipe.UserId.HasValue);

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

        public IQueryable<Recipe> MealPlanFilter(double upperBound, double lowerBound)
        {
            IQueryable<Recipe> query = Recipes.Include(recipe => recipe.NutritionInfo);

            query = query.Where(recipe => (recipe.Calories / recipe.Servings) <= upperBound  && (recipe.Calories / recipe.Servings) >= lowerBound);

            return query;
        }
    }
}