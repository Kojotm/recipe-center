using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}