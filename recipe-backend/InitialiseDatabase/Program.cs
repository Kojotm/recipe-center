using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Models;
using Newtonsoft.Json.Linq;
using Persistence;
using System;
using System.Collections.Generic;
using System.IO;
using System.Drawing;

namespace InitialiseDatabase
{
    public class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Reading config.");
            var config = new ConfigurationBuilder().AddJsonFile("jsonPathSetting.json").Build();

            Console.WriteLine("Reading recipőe JSON.");
            Console.WriteLine("All credit goes to Hugo Darwood.");
            Console.WriteLine(@"Go to https://www.kaggle.com/hugodarwood/epirecipes for the main source.");

            List<Recipe> recipes = ReadJson(config["basic_recipes"]);

            Console.WriteLine("JSON was read.");
            Console.WriteLine("-------------------------------------");
            Console.WriteLine("Adding to database.");

            DbContextOptionsBuilder<RecipeContext> builder = new DbContextOptionsBuilder<RecipeContext>();
            builder.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=LocalRecipeDB");

            using var ctx = new RecipeContext(builder.Options);
            ctx.Database.EnsureDeleted();
            ctx.Database.EnsureCreated();

            ctx.Recipes.AddRange(recipes);

            string imagePath = "Data/placeholder.png";
            var image = ImageToBytes(imagePath);

            ctx.Images.AddRange(new Image() { ImageBytes = image });

            ctx.SaveChanges();
        }

        private static byte[] ImageToBytes(string path)
        {
            FileStream stream = new(path, FileMode.Open, FileAccess.Read);
            BinaryReader reader = new(stream);

            byte[] imageByteArray = reader.ReadBytes((int)stream.Length);
            return imageByteArray;
        }

        private static List<Recipe> ReadJson(string path)
        {
            Console.WriteLine("Reading Recipes JSON.");
            JArray recipeArray = JArray.Parse(File.ReadAllText(path));
            var recipes = new List<Recipe>();
            Random rnd = new();

            foreach (JObject item in recipeArray)
            {
                if (item.GetValue("title") != null && item.GetValue("directions") != null && item.GetValue("ingredients") != null)
                {
                    recipes.Add(new Recipe()
                    {
                        Name = item.GetValue("title").ToString(),
                        Description = item.GetValue("directions").ToObject<string[]>(),
                        Ingredients = item.GetValue("ingredients").ToObject<string[]>(),
                        Categories = item.GetValue("categories").ToObject<string[]>(),
                        Calories = item.GetValue("calories").ToObject<double?>(),
                        DurationInMinutes = rnd.Next(10, 301),
                        Servings = rnd.Next(2, 7),
                        NutritionInfo = new NutritionInfo()
                        {
                            Sodium = item.GetValue("sodium").ToObject<double?>(),
                            Fats = item.GetValue("fat").ToObject<double?>(),
                            Protein = item.GetValue("protein").ToObject<double?>()
                        },
                        ImageId = 1
                    });
                }
            }

            return recipes;
        }
    }
}
