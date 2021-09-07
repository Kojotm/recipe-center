using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Recipe
    {
        public int Id { get; set; }
        [Required, MaxLength(60)]
        public string Name { get; set; }
        [Required, MaxLength(500)]
        public string Description { get; set; }
        public double Calories { get; set; }
        public int Servings { get; set; }
        public NutritionInfo NutritionInfo { get; set; }
        public long Duration { get; set; }
    }
}
