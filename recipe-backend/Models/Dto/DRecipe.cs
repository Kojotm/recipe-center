using System.Collections.Generic;

namespace Models
{
    public class DRecipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string[] Description { get; set; }
        public string[] Ingredients { get; set; }
        public string[] Categories { get; set; }
        public double? Calories { get; set; }
        public int? Servings { get; set; }
        public NutritionInfo NutritionInfo { get; set; }
        public int? DurationInMinutes { get; set; }
        public Difficulty Difficulty { get; set; }
        public int? UserId { get; set; }
        public byte[] Image { get; set; }
        public int ImageId { get; set; }
        public List<string> IngredientsFound { get; set; }

        public override bool Equals(object obj)
        {
            DRecipe r = obj as DRecipe;
            return r != null && r.Id == Id;
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }
}
