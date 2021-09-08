using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Recipe
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string[] Description { get; set; }
        [Required]
        public string[] Ingredients { get; set; }
        public string[] Categories { get; set; }
        public double? Calories { get; set; }
        public int? Servings { get; set; }
        public NutritionInfo NutritionInfo { get; set; }
        public int? DurationInMinutes { get; set; }
    }
}
